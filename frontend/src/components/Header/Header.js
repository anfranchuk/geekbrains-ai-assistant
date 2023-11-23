import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
	// const navigate = useNavigate();
	//
	// const [selected, setSelected] = useState(1);
	// const [hovered, setHovered] = useState(null);
	//
	// const icons = [
	// 	{
	// 		id: 0,
	// 		icon: (fill = '#B1B5C5') => <SettingsIcon fill={fill} />,
	// 		path: '/settings',
	// 	},
	// 	{
	// 		id: 1,
	// 		icon: (fill = '#B1B5C5') => <Dashboard fill={fill} />,
	// 		path: '/',
	// 	},
	// 	{
	// 		id: 2,
	// 		icon: (fill = '#B1B5C5') => <InfoIcon fill={fill} />,
	// 		path: '/info',
	// 	},
	// ];
	//
	// const handleSelectedItem = (index) => {
	// 	const tSelected = selected === index ? null : index;
	// 	const pathName = icons[index].path;
	//
	// 	navigate(pathName);
	// 	setSelected(tSelected);
	// };
	//
	// const handleHoveredItem = (index) => {
	// 	const hoveredIndex = selected === index ? null : index;
	// 	setHovered(hoveredIndex);
	// };

	return (
		<div className={styles.parent}>

			{/*<div className={styles.text}>*/}
			{/*	{'Дашборд > Все камеры'}*/}
			{/*</div>*/}
			
			{/*<div className={styles.content}>*/}
			
			{/*	<div className={`${styles.bricks}`}>*/}
			{/*		/!*{icons.map(({ icon }, index) => {*!/*/}
			{/*		/!*	const isSelected = selected === index;*!/*/}
			{/*		/!*	const isHovered = hovered === index;*!/*/}
			{/*		/!*	const isActiveItem = isSelected || isHovered;*!/*/}

			{/*		/!*	const color = isActiveItem ? '#1970A9' : '#B1B5C5';*!/*/}

			{/*		/!*	return (*!/*/}
			{/*		/!*		<IconButton*!/*/}
			{/*		/!*			key={`ControlIcon-Icon-${index}`}*!/*/}
			{/*		/!*			className={styles.brick}*!/*/}
			{/*		/!*			onMouseEnter={() => handleHoveredItem(index)}*!/*/}
			{/*		/!*			onMouseLeave={() => setHovered(null)}*!/*/}
			{/*		/!*			onClick={() => handleSelectedItem(index)}*!/*/}
			{/*		/!*		>*!/*/}
			{/*		/!*			{icon(color)}*!/*/}
			{/*		/!*		</IconButton>*!/*/}
			{/*		/!*	);*!/*/}
			{/*		/!*})}*!/*/}

			{/*	</div>*/}
			{/*</div>*/}
		</div>
	);
};

export default Header;
