/** @jsx h */
import { h } from 'preact';

const WIDTH = 30;
const radius = WIDTH / 2;

function polarToCartesian(angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

    return {
        x: radius + radius * Math.cos(angleInRadians),
        y: radius + radius * Math.sin(angleInRadians)
    };
}

function slicePath(startAngle, endAngle) {
    const start = polarToCartesian(endAngle);
    const end = polarToCartesian(startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const arc = ['A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');

    return ['M', start.x, start.y, arc, 'L', radius, radius, 'Z'].join(' ');
}

const PieChart = ({ filledPercent }) => {
    const endAngle = (filledPercent / 100) * 360;
    return (
        <svg width={WIDTH} height={WIDTH}>
            <circle r={radius} cx={radius} cy={radius} fill={filledPercent < 100 ? '#F5F7FA' : '#1BD884'} />
            {filledPercent < 100 ? <path d={slicePath(0, endAngle)} fill="#1BD884" stroke="none" /> : null}
        </svg>
    );
};

export default PieChart;
