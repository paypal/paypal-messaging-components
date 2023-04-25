/** @jsx h */
import { h } from 'preact';

const Donut = ({
    strokeWidth = 5.8,
    strokeLinecap = 'round',
    cx = 21,
    cy = 21,
    radius = 15.91549430918954,
    viewBox = `0 0 ${2 * cx} ${2 * cy}`,
    style = { fontSize: '0.375rem' },
    segmentStrokeWidth = 5.8,
    currentNum = 0,
    numOfPayments = 4,
    timeStamp,
    periodicPayment,
    qualifying
}) => {
    const percentage = (currentNum / numOfPayments) * 100;
    const segStrokeWidth = segmentStrokeWidth ?? strokeWidth;

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

    const isQualifying = qualifying === 'true';

    return (
        <div
            className={`donut__single_payment ${
                isQualifying ? 'donut__qualifying_payment' : 'donut__non_qualifying_payment'
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
                <text x={cx} y={cy} text-anchor="middle">
                    {isQualifying}
                </text>
            </svg>
            <span className="donut__payment">
                {isQualifying && periodicPayment !== '-' ? `${periodicPayment}\n ${timeStamp}` : timeStamp}
            </span>
        </div>
    );
};

export default Donut;
