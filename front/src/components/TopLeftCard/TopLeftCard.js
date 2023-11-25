import React from 'react';
import styles from './TopLeftCard.module.scss';

const TopLeftCard = ({ row }) => {
	const { input_photo, recognized_photo, camera, filename, is_correct, notification, place, type} = row;

	const isCorrect = is_correct === 1 ? 'Номер совпадает с алгоритмом' : 'Номер не совпадает с алгоритмом';
	const isType = type === 1 ? 'На изображении присутствует номер вагона' : 'На изображении не присутствует номер вагона';

	return (
		<div className={styles.parent}>
			<div style={{height: '100%', width: 'max-content'}}>
				<img
					style={{height: 'calc(50% - 10px)'}}
					src={input_photo}
					alt='ImageTop'
				/>
				<img
					style={{marginTop: '10px', height: 'calc(50% - 10px)'}}
					src={recognized_photo}
					alt='ImageBottom'
				/>
			</div>

			<div style={{height: '100%', width: '60%', marginLeft: 10, display: 'flex', flexDirection: 'column', gap: 15}}>
				<div>
					Камера: {camera}
				</div>
				<div>
					Файл: {filename}
				</div>
				<div>
					Состояние: {notification}
				</div>
				<div>
					Место: {place}
				</div>
				<div>
					{isCorrect}
				</div>
				<div>
					{isType}
				</div>
			</div>
		</div>
	);
};

export default TopLeftCard;
