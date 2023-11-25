import React from 'react';

const InfoIcon = ({ width = 50, height = 50, fill = '#B1B5C5' }) => {
	return (
		<svg width={width} height={height} viewBox='0 0 49 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d="M23.1309 29.4668V28.5439C23.1309 27.8213 23.2139 27.1914 23.3799 26.6543C23.5459 26.1172 23.8242 25.6143 24.2148 25.1455C24.6055 24.667 25.1328 24.1689 25.7969 23.6514C26.4805 23.1143 27.0225 22.6504 27.4229 22.2598C27.833 21.8691 28.126 21.4785 28.3018 21.0879C28.4873 20.6875 28.5801 20.2236 28.5801 19.6963C28.5801 18.8662 28.2969 18.2363 27.7305 17.8066C27.1738 17.3672 26.3877 17.1475 25.3721 17.1475C24.4736 17.1475 23.6289 17.2744 22.8379 17.5283C22.0469 17.7822 21.2656 18.0996 20.4941 18.4805L19.2783 15.9023C20.167 15.4141 21.1289 15.0234 22.1641 14.7305C23.209 14.4277 24.3564 14.2764 25.6064 14.2764C27.5986 14.2764 29.1367 14.7598 30.2207 15.7266C31.3145 16.6934 31.8613 17.9678 31.8613 19.5498C31.8613 20.4189 31.7246 21.166 31.4512 21.791C31.1777 22.4062 30.7725 22.9775 30.2354 23.5049C29.708 24.0225 29.0684 24.5693 28.3164 25.1455C27.7012 25.6338 27.2275 26.0586 26.8955 26.4199C26.5732 26.7715 26.3486 27.1279 26.2217 27.4893C26.1045 27.8506 26.0459 28.2852 26.0459 28.793V29.4668H23.1309ZM22.5742 34.1836C22.5742 33.3828 22.7793 32.8213 23.1895 32.499C23.6094 32.167 24.1221 32.001 24.7275 32.001C25.3135 32.001 25.8164 32.167 26.2363 32.499C26.6562 32.8213 26.8662 33.3828 26.8662 34.1836C26.8662 34.9648 26.6562 35.5312 26.2363 35.8828C25.8164 36.2246 25.3135 36.3955 24.7275 36.3955C24.1221 36.3955 23.6094 36.2246 23.1895 35.8828C22.7793 35.5312 22.5742 34.9648 22.5742 34.1836Z"
				fill={fill}
			/>

			<circle
				cx="26"
				cy="25"
				r="18.5"
				stroke={fill}
				strokeWidth="3"
			/>
		</svg>

	);
};

export default InfoIcon;
