/** @jsx h */
import { Fragment, h } from 'preact';
// import Donut from '@paypalcorp/ppc-ui-donut';
// import { green500 } from 'pp-react';

const green500 = '#00CF92';
const grey300 = '#DBD8D0';
const grey600 = '#888';

const generateDonutData = (currentNum = 0, numOfPayments = 4) => {
    return [{ color: green500, percentage: (currentNum / numOfPayments) * 100 }];
};

// const Donuts = ({ timeStamps, qualifying, periodicPayment }) => {
//     return (
//         <div className="content__row donuts">
//             <div className="donuts__container">
//                 {timeStamps.map(time => [
//                     <Fragment>
//                         <Donut
//                             height="60"
//                             strokeWidth={5}
//                             data={generateDonutData(periodicPayment, 4)}
//                             segmentStrokeWidth={7}/>
//                         {qualifying === 'false' && <Fragment>25%</Fragment>}
//                         <div>
//                             <span>{qualifying === 'true' && <Fragment>{periodicPayment}</Fragment>}</span>
//                             <span>{time}</span>
//                         </div>
//                     </Fragment>
//                 ])}
//             </div>
//         </div>
//     );
// };

// export default Donuts;

// type DonutData = {
// 	color: string
// 	percentage: number
// }

// interface DonutProps {
// 	width: string
// 	height: string
// 	strokeWidth?: number
// 	data?: Array<DonutData>
// 	strokeLinecap?: 'round' | 'inherit' | 'butt' | 'square'
// 	cx?: number
// 	cy?: number
// 	radius?: number
// 	viewBox?: string
// 	style?: object
// 	segmentStrokeWidth?: number
// 	baseColor?: string
// }

const Donuts = ({
    width = '100%',
    height = '100%',
    strokeWidth = 5,
    data = generateDonutData(),
    strokeLinecap = 'round',
    cx = 21,
    cy = 21,
    radius = 15.91549430918954,
    viewBox = `0 0 ${2 * cx} ${2 * cy}`,
    style = { fontSize: '0.375rem' },
    children,
    segmentStrokeWidth = 7,
    baseColor = grey300
    // ...rest
}) => {
    let segStrokeWidth = segmentStrokeWidth;
    if (!segStrokeWidth) {
        segStrokeWidth = strokeWidth;
    }
    const radiusOffset = (segStrokeWidth - strokeWidth) / 2;
    return (
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
            <circle
                cx={cx}
                cy={cy}
                r={radius - radiusOffset}
                fill="transparent"
                stroke={baseColor}
                strokeWidth={strokeWidth}
            />
            <g strokeWidth={segStrokeWidth} fill="transparent" strokeLinecap={strokeLinecap}>
                <DonutSegments cx={cx} cy={cy} radius={radius} data={data} />
            </g>
            {children && (
                <text x={cx} y={cy} textAnchor="middle" fill={grey600}>
                    {children}
                </text>
            )}
        </svg>
    );
};

// type DonutSegmentProps = {
// 	cx: number
// 	cy: number
// 	radius: number
// 	data: Array<DonutData>
// }

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
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
            />
        );
    });

    return <Fragment>{segments.reverse()}</Fragment>;
};

export default Donuts;
