/** @jsx h */
/* eslint-disable react/no-unknown-property */
import { Fragment, h } from 'preact';

const green500 = '#00CF92';
const grey300 = '#DBD8D0';
const grey600 = '#888';

const generateDonutData = (currentNum = 0, numOfPayments = 4) => {
    return [{ color: green500, percentage: (currentNum / numOfPayments) * 100 }];
};

const Donuts = ({
    width = '82px',
    height = '82px',
    strokeWidth = 3,
    strokeLinecap = 'round',
    cx = 21,
    cy = 21,
    radius = 15.91549430918954,
    viewBox = `0 0 ${2 * cx} ${2 * cy}`,
    style = { fontSize: '0.375rem' },
    children,
    segmentStrokeWidth = 4,
    baseColor = grey300,
    currentNum = 0,
    timeStamp,
    periodicPayment
    // ...rest
}) => {
    const data = generateDonutData(currentNum, 4);
    let segStrokeWidth = segmentStrokeWidth;
    if (!segStrokeWidth) {
        segStrokeWidth = strokeWidth;
    }
    // const radiusOffset = (segStrokeWidth - strokeWidth) / 2;
    return (
        <div className="donut">
            <svg
                aria-hidden
                width={width}
                height={height}
                viewBox={viewBox}
                className="donut"
                style={style}
                xmlns="http://www.w3.org/2000/svg"
                // {...rest}
            >
                <circle cx={cx} cy={cy} r={radius} fill="transparent" stroke={baseColor} stroke-width={strokeWidth} />
                <g stroke-width={segStrokeWidth} fill="transparent" stroke-linecap={strokeLinecap}>
                    <DonutSegments cx={cx} cy={cy} radius={radius} data={data} />
                </g>
                {children && (
                    <text x={cx} y={cy + 2} text-anchor="middle" fill={grey600}>
                        {children}
                    </text>
                )}
            </svg>
            <span>{periodicPayment}</span>
            <span>{timeStamp}</span>
        </div>
    );
};

const DonutSegments = ({ cx, cy, radius, data }) => {
    let offset = 25; // To start from 12'O clock
    const segments = data.map(({ color, percentage }) => {
        const strokeDasharray = `${percentage} ${100 - percentage}`;
        const strokeDashoffset = offset;
        offset = 100 - percentage + offset;

        return (
            <circle
                key={`${new Date().toDateString()}-${offset}`}
                cx={cx}
                cy={cy}
                r={radius}
                stroke={color}
                stroke-dasharray={strokeDasharray}
                stroke-dashoffset={strokeDashoffset}
            />
        );
    });

    return <Fragment>{segments.reverse()}</Fragment>;
};
/* eslint-enable react/no-unknown-property */
export default Donuts;
