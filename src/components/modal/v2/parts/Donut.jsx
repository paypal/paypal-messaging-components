/** @jsx h */
/* eslint-disable react/no-unknown-property */
import { h } from 'preact';

const generateDonutData = (currentNum = 0, numOfPayments) => {
    return {
        percentage: (currentNum / numOfPayments) * 100
    };
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
    numOfPayments = 4,
    timeStamp,
    periodicPayment,
    qualifying
}) => {
    const data = generateDonutData(currentNum, numOfPayments);
    let segStrokeWidth = segmentStrokeWidth;
    if (!segmentStrokeWidth) {
        segStrokeWidth = strokeWidth;
    }

    const { percentage } = data;
    const strokeDasharray = `${percentage} ${100 - percentage}`;
    const segments = (
        <circle
            cx={cx}
            cy={cy}
            r={radius}
            className="donut__percent"
            stroke-dasharray={strokeDasharray}
            stroke-dashoffset={25}
        />
    );

    return (
        <div
            className={`donut__single_payment ${
                qualifying === 'true' ? 'donut__qualifying_payment' : 'donut__non_qualifying_payment'
            }`}
        >
            <svg aria-hidden viewBox={viewBox} className="donut" style={style} xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="transparent"
                    className="donut__background"
                    stroke-width={strokeWidth}
                />
                <g stroke-width={segStrokeWidth} fill="transparent" stroke-linecap={strokeLinecap}>
                    {segments}
                </g>
                {children && (
                    <text x={cx} y={cy} text-anchor="middle">
                        {qualifying === 'true' && children}
                    </text>
                )}
            </svg>
            {qualifying === 'true' && periodicPayment !== '-' && (
                <span className="donut__payment">{periodicPayment}</span>
            )}
            <span className="donut__timestamp">{timeStamp}</span>
        </div>
    );
};

/* eslint-enable react/no-unknown-property */
export default Donut;
