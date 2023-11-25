import React from 'react';

const ArrowIcon = ({ width = 45, height = 45, fill = '#B1B5C5' }) => {
	return (
		<svg width={width} height={height} viewBox='0 0 49 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d="M38.2762 13.0607C38.862 12.4749 38.862 11.5251 38.2762 10.9393L28.7303 1.3934C28.1445 0.807611 27.1948 0.807611 26.609 1.3934C26.0232 1.97919 26.0232 2.92893 26.609 3.51472L35.0943 12L26.609 20.4853C26.0232 21.0711 26.0232 22.0208 26.609 22.6066C27.1948 23.1924 28.1445 23.1924 28.7303 22.6066L38.2762 13.0607ZM0 13.5H37.2156V10.5H0V13.5Z"
				fill={fill}
			/>
		</svg>
	);
};

export default ArrowIcon;
