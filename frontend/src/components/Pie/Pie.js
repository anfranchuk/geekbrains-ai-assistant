const cleanPercentage = (percentage) => {
	const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
	const isTooHigh = percentage > 100;
	return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({ colour, percentage }) => {
	const r = 12;
	const circ = 2 * Math.PI * r;
	const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
	return (
		<circle
			r={r}
			cx={185}
			cy={15}
			fill="transparent"
			stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
			strokeWidth={'5px'}
			strokeDasharray={circ}
			strokeDashoffset={percentage ? strokePct : 0}
		></circle>
	);
};


const Pie = ({ percentage, colour }) => {
	const pct = cleanPercentage(percentage);
	return (
		<svg width={30} height={30}>
			<g transform={`rotate(-90 ${'100 100'})`}>
				<Circle colour="black" />
				<Circle colour={colour} percentage={pct} />
			</g>
		</svg>
	);
};

export default Pie;