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
            {/* Required to read the payment and date details together. Spans and linebreaks cause a pause when stepping */}
            {/* through the content. Using a p tag instead of span to cause pause in Windows */}
            <p className="sr-only">
                {/* Space required between periodicPayment and the comma to read the monetary value correctly */}
                {isQualifying && periodicPayment !== '-' ? `${periodicPayment} , ${timeStamp}` : timeStamp}
            </p>
            <span aria-hidden="true">
                {isQualifying && periodicPayment !== '-' && <span className="donut__payment">{periodicPayment}</span>}
                <span className="donut__timestamp">{timeStamp}</span>
            </span>
        </div>
    );
};

export default Donut;
