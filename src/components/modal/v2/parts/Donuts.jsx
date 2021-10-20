/** @jsx h */
/* eslint-disable react/no-unknown-property */
import { Fragment, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { debounce } from 'belter/src';

const green500 = '#00CF92';
const grey300 = '#DBD8D0';
const grey600 = '#888';

const generateDonutData = (currentNum = 0, numOfPayments = 4) => {
    return [{ color: green500, percentage: (currentNum / numOfPayments) * 100 }];
};

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        screenWidth: width,
        screenheight: height
    };
};

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener(
            'resize',
            debounce(() => handleResize())
        );

        return () =>
            window.removeEventListener(
                'resize',
                debounce(() => handleResize())
            );
    }, []);
    return windowDimensions;
};

const Donuts = ({
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
    periodicPayment,
    qualifying
    // ...rest
}) => {
    const data = generateDonutData(currentNum, 4);
    let segStrokeWidth = segmentStrokeWidth;
    if (!segStrokeWidth) {
        segStrokeWidth = strokeWidth;
    }
    let width = '82px';
    let height = '82px';

    const { screenWidth } = useWindowDimensions();

    if (screenWidth < 400) {
        width = '60px';
        height = '60px';
    }

    return (
        <div className="donut__single_payment">
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
                        {qualifying && children}
                    </text>
                )}
            </svg>
            {periodicPayment && periodicPayment !== '-' && <span>{periodicPayment}</span>}
            <span className="donut__timestamp">{timeStamp}</span>
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
