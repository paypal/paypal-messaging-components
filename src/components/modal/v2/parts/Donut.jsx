/** @jsx h */
/* eslint-disable react/no-unknown-property */
import { Fragment, h } from 'preact';

const generateDonutData = (currentNum = 0, numOfPayments = 4) => {
    return [
        {
            percentage: (currentNum / numOfPayments) * 100
        }
    ];
};

const Donut = ({
    strokeWidth = 3,
    strokeLinecap = 'round',
    cx = 21,
    cy = 21,
    radius = 15.91549430918954,
    viewBox = `0 0 ${2 * cx} ${2 * cy}`,
    style = { fontSize: '0.375rem' },
    children,
    segmentStrokeWidth = 4,
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

    return (
        <div className={`donut__single_payment ${qualifying === 'true' && 'donut__qualifying_payment'}`}>
            <svg
                aria-hidden
                viewBox={viewBox}
                className="donut"
                style={style}
                xmlns="http://www.w3.org/2000/svg"
                // {...rest}
            >
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="transparent"
                    className="donut__background"
                    stroke-width={strokeWidth}
                />
                <g stroke-width={segStrokeWidth} fill="transparent" stroke-linecap={strokeLinecap}>
                    <DonutSegments cx={cx} cy={cy} radius={radius} data={data} />
                </g>
                {children && (
                    <text x={cx} y={cy} text-anchor="middle">
                        {qualifying === 'true' && children}
                    </text>
                )}
            </svg>
            {qualifying === 'true' && periodicPayment !== '-' && <span>{periodicPayment}</span>}
            <span className="donut__timestamp">{timeStamp}</span>
        </div>
    );
};

const DonutSegments = ({ cx, cy, radius, data }) => {
    let offset = 25; // To start from 12'O clock
    const segments = data.map(({ percentage }) => {
        const strokeDasharray = `${percentage} ${100 - percentage}`;
        const strokeDashoffset = offset;
        offset = 100 - percentage + offset;

        return (
            <circle
                key={`${new Date().toDateString()}-${offset}`}
                cx={cx}
                cy={cy}
                r={radius}
                className="donut__percent"
                stroke-dasharray={strokeDasharray}
                stroke-dashoffset={strokeDashoffset}
            />
        );
    });

    return <Fragment>{segments.reverse()}</Fragment>;
};
/* eslint-enable react/no-unknown-property */
export default Donut;
