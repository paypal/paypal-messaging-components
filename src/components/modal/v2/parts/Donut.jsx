/** @jsx h */
import { h } from 'preact';

const Donut = ({
    strokeWidth = 5.8,
    strokeLinecap = 'round',
    cx = 21,
    cy = 21,
    radius = 15.91549430918954,
    radiusV4andV5 = 5.5,
    viewBox = `0 0 ${2 * cx} ${2 * cy}`,
    style = { fontSize: '0.375rem' },
    currentNum = 0,
    numOfPayments = 4,
    timeStamp,
    periodicPayment,
    qualifying,
    useNewCheckoutDesign
}) => {
    const percentage = (currentNum / numOfPayments) * 100;
    const strokeDasharray = `${percentage} ${100 - percentage}`;

    const segments = (
        <circle
            cx={cx}
            cy={cy}
            r={radiusV4andV5}
            className="donut__percent"
            stroke-dasharray={strokeDasharray}
            stroke-dashoffset={25}
        />
    );

    const isQualifying = qualifying === 'true';
    const isPi3 = numOfPayments === 3 ? 'donut__single_payment_line__3' : 'donut__single_payment_line';
    const isBelowNumOfPayments = currentNum < numOfPayments;

    return (
        <div
            className={`donut__single_payment ${
                isQualifying ? 'donut__qualifying_payment' : 'donut__non_qualifying_payment'
            } ${isBelowNumOfPayments ? isPi3 : ''}${
                currentNum === numOfPayments ? 'donut__single_payment_line__end' : ''
            }`}
        >
            <span className={`${useNewCheckoutDesign === 'true' ? 'checkout' : ''} svg`}>
                <svg aria-hidden viewBox={viewBox} className="donut" style={style} xmlns="http://www.w3.org/2000/svg">
                    <circle
                        cx={cx}
                        cy={cy}
                        r={radius}
                        fill="transparent"
                        className="donut__background__line"
                        stroke-width={strokeWidth}
                    />
                    <g stroke-width={0} fill="#686A6D" stroke-linecap={strokeLinecap}>
                        {segments}
                    </g>
                    <text x={cx} y={cy} text-anchor="middle">
                        {isQualifying}
                    </text>
                </svg>
            </span>
            {/* eslint-disable-next-line jsx-a11y/aria-role */}
            <span aria-labelledby={`donut__payment__${currentNum} donut__timestamp__${currentNum}`} role="text">
                {isQualifying && periodicPayment !== '-' && (
                    <span className="donut__payment" id={`donut__payment__${currentNum}`} aria-hidden="true">
                        {periodicPayment}
                    </span>
                )}
                <span
                    className={`donut__timestamp ${useNewCheckoutDesign === 'true' ? 'checkout' : ''}`}
                    id={`donut__timestamp__${currentNum}`}
                    aria-hidden="true"
                >
                    {timeStamp}
                </span>
            </span>
        </div>
    );
};

export default Donut;
