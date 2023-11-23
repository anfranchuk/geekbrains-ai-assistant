import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LeftMenu.module.scss';
// import InfoIcon from '../../assets/icons/InfoIcon';
import Dashboard from '../../assets/icons/DashboardIcon';
// import SettingsIcon from '../../assets/icons/SettingsIcon';
import TgIcon from '../../assets/icons/TgIcon';
import {IconButton} from '@mui/material';

const LeftMenu = () => {
	const navigate = useNavigate();

	const [selected, setSelected] = useState(1);
	const [hovered, setHovered] = useState(null);
	const [isTG, setTG] = useState(false);

	console.log(isTG);


	useEffect(() => {
		if (!isTG) return;

		const timeout = setTimeout(() => {
			// 👇️ redirects to an external URL
			window.location.replace('https://t.me/RECVNBOT/start');
		}, 1000);

		setTG(false);

		return () => clearTimeout(timeout);
	}, [isTG]);

	const icons = [
		// {
		// 	id: 0,
		// 	icon: (fill = '#B1B5C5') => <TgIcon fill={fill} />,
		// 	// path: 'https://t.me/RECVNBOT/start',
		// 	path: '/',
		// },
		{
			id: 1,
			icon: (fill = '#B1B5C5') => <Dashboard fill={fill} />,
			path: '/',
		},
		// {
		// 	id: 2,
		// 	icon: (fill = '#B1B5C5') => <InfoIcon fill={fill} />,
		// 	path: '/info',
		// },
	];

	const handleSelectedItem = (index) => {
		const tSelected = selected === index ? null : index;
		const pathName = icons[index].path;

		navigate(pathName);
		setSelected(tSelected);

		if (index === 0) setTG(true);
	};

	const handleHoveredItem = (index) => {
		const hoveredIndex = selected === index ? null : index;
		setHovered(hoveredIndex);
	};

	return (
		<div className={styles.parent}>
			<div className={`${styles.bricks}`}>
				{/*<a href="https://t.me/RECVNBOT" target="_blank" rel="noopener noreferrer">*/}
				{/*	<IconButton*/}
				{/*		className={styles.brick}*/}
				{/*		onMouseEnter={() => handleHoveredItem(0)}*/}
				{/*		onMouseLeave={() => setHovered(null)}*/}
				{/*		onClick={() => handleSelectedItem(0)}*/}
				{/*	>*/}
				{/*		<TgIcon />*/}
				{/*	</IconButton>*/}
				{/*</a>*/}

				{icons.map(({ icon }, index) => {
					const isSelected = selected === index;
					const isHovered = hovered === index;
					const isActiveItem = isSelected || isHovered;

					const color = isActiveItem ? '#1970A9' : '#B1B5C5';

					return (
						<IconButton
							key={`ControlIcon-Icon-${index}`}
							className={styles.brick}
							onMouseEnter={() => handleHoveredItem(index)}
							onMouseLeave={() => setHovered(null)}
							onClick={() => handleSelectedItem(index)}
						>
							{icon(color)}
						</IconButton>
					);
				})}

			</div>
		</div>
	);
};

export default LeftMenu;
