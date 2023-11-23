import React from 'react';

const SettingsIcon = ({ width = 45, height = 45, fill = '#B1B5C5' }) => {
	return (
		<svg width={width} height={height} viewBox='0 0 49 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d="M25 15.6396H45"
				stroke={fill}
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5 15.6396H9"
				stroke={fill}
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M41 33.6406H45"
				stroke={fill}
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5 33.6406H25"
				stroke={fill}
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M17 23.6406C21.4182 23.6406 25 20.0588 25 15.6406C25 11.2223 21.4182 7.64062 17 7.64062C12.5817 7.64062 9 11.2223 9 15.6406C9 20.0588 12.5817 23.6406 17 23.6406Z"
				stroke={fill}
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M33 41.6396C37.4182 41.6396 41 38.0578 41 33.6396C41 29.2214 37.4182 25.6396 33 25.6396C28.5818 25.6396 25 29.2214 25 33.6396C25 38.0578 28.5818 41.6396 33 41.6396Z"
				stroke={fill}
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default SettingsIcon;
