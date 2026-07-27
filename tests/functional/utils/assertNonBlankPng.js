import { inflateSync } from 'zlib';

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const COLOR_TYPE_CHANNELS = {
    0: 1,
    2: 3,
    4: 2,
    6: 4
};

const normalizeByte = value => (value >= 256 ? value - 256 : value);

const getPaethPredictor = (left, up, upLeft) => {
    const prediction = left + up - upLeft;
    const leftDiff = Math.abs(prediction - left);
    const upDiff = Math.abs(prediction - up);
    const upLeftDiff = Math.abs(prediction - upLeft);

    if (leftDiff <= upDiff && leftDiff <= upLeftDiff) {
        return left;
    }

    if (upDiff <= upLeftDiff) {
        return up;
    }

    return upLeft;
};

const parsePngPixels = pngBuffer => {
    if (!Buffer.isBuffer(pngBuffer)) {
        throw new Error('Expected a PNG buffer');
    }

    if (!pngBuffer.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
        throw new Error('Expected a PNG image buffer');
    }

    let offset = PNG_SIGNATURE.length;
    let width = 0;
    let height = 0;
    let bitDepth = 0;
    let colorType = 0;
    const idatChunks = [];

    while (offset < pngBuffer.length) {
        const chunkLength = pngBuffer.readUInt32BE(offset);
        offset += 4;

        const chunkType = pngBuffer.toString('ascii', offset, offset + 4);
        offset += 4;

        const chunkData = pngBuffer.subarray(offset, offset + chunkLength);
        offset += chunkLength;

        // Skip CRC
        offset += 4;

        if (chunkType === 'IHDR') {
            width = chunkData.readUInt32BE(0);
            height = chunkData.readUInt32BE(4);
            const [, , , , , , , , chunkBitDepth, chunkColorType] = chunkData;
            bitDepth = chunkBitDepth;
            colorType = chunkColorType;
        } else if (chunkType === 'IDAT') {
            idatChunks.push(chunkData);
        } else if (chunkType === 'IEND') {
            break;
        }
    }

    if (!width || !height || !idatChunks.length) {
        throw new Error('Invalid PNG data');
    }

    if (bitDepth !== 8) {
        throw new Error(`Unsupported PNG bit depth: ${bitDepth}`);
    }

    const channels = COLOR_TYPE_CHANNELS[colorType];
    if (!channels) {
        throw new Error(`Unsupported PNG color type: ${colorType}`);
    }

    const bytesPerPixel = channels;
    const stride = width * bytesPerPixel;
    const decompressed = inflateSync(Buffer.concat(idatChunks));

    const expectedLength = height * (stride + 1);
    if (decompressed.length < expectedLength) {
        throw new Error('Corrupt PNG data');
    }

    const raw = Buffer.alloc(width * height * 4);
    let sourceOffset = 0;
    let targetOffset = 0;
    let previousRow = Buffer.alloc(stride, 0);

    for (let row = 0; row < height; row += 1) {
        const filterType = decompressed[sourceOffset];
        sourceOffset += 1;

        const rowData = Buffer.from(decompressed.subarray(sourceOffset, sourceOffset + stride));
        sourceOffset += stride;

        for (let column = 0; column < stride; column += 1) {
            const left = column >= bytesPerPixel ? rowData[column - bytesPerPixel] : 0;
            const up = previousRow[column] || 0;
            const upLeft = column >= bytesPerPixel ? previousRow[column - bytesPerPixel] || 0 : 0;

            if (filterType === 1) {
                rowData[column] = normalizeByte(rowData[column] + left);
            } else if (filterType === 2) {
                rowData[column] = normalizeByte(rowData[column] + up);
            } else if (filterType === 3) {
                rowData[column] = normalizeByte(rowData[column] + Math.floor((left + up) / 2));
            } else if (filterType === 4) {
                rowData[column] = normalizeByte(rowData[column] + getPaethPredictor(left, up, upLeft));
            } else if (filterType !== 0) {
                throw new Error(`Unsupported PNG filter type: ${filterType}`);
            }
        }

        previousRow = rowData;

        for (let column = 0; column < width; column += 1) {
            const pixelOffset = column * bytesPerPixel;
            const r = rowData[pixelOffset];
            const g = colorType === 0 ? r : rowData[pixelOffset + 1];
            const b = colorType === 0 ? r : rowData[pixelOffset + 2];
            const a = colorType === 4 || colorType === 6 ? rowData[pixelOffset + bytesPerPixel - 1] : 255;

            raw[targetOffset] = r;
            raw[targetOffset + 1] = g;
            raw[targetOffset + 2] = b;
            raw[targetOffset + 3] = a;
            targetOffset += 4;
        }
    }

    return { width, height, raw };
};

export const assertNonBlankPng = ({ image, context }) => {
    const { width, height, raw } = parsePngPixels(image);
    const totalPixels = width * height;

    if (totalPixels === 0) {
        throw new Error(`Blank snapshot detected for ${context}: image has no pixels`);
    }

    let visiblePixelCount = 0;

    for (let index = 0; index < raw.length; index += 4) {
        if (raw[index + 3] > 0) {
            visiblePixelCount += 1;
        }
    }

    if (visiblePixelCount === 0) {
        throw new Error(`Blank snapshot detected for ${context}: all pixels are fully transparent`);
    }
};
