import React, {useEffect, useState} from 'react';
import styles from './TopRigthCard.module.scss';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import Pie from '../../components/Pie/Pie';
import EditIcon from '../../assets/icons/EditIcon';
import CheckIcon from '@mui/icons-material/Check';
import {IconButton} from '@mui/material';
import {apiMainPatch} from '../../api/api';

const TopRigthCard = ({ getLink, row, setReloadPage }) => {
	const { number, analytic_json_numbers, recogn_percent, workload } = row;

	const typeCarriage = Number(number[0]);
	const isValidFull = recogn_percent >= 50;

	const testAnalytic = [[1,49],[1,20],[1,99],[1,99],[1,99],[1,63],[1,99],[1,99]];

	const analyticArray = analytic_json_numbers.length === undefined ? testAnalytic : analytic_json_numbers;

	const [isEdit, setIsEdit] = useState(false);
	const [numbers, setNumbers] = useState([]); // Состояние для хранения чисел
	const [analyticNumbers, setAnalyticNumbers] = useState(analyticArray); // Состояние для хранения чисел

	const handleEditField = () => {
		const editLink = `${getLink}${row.id}/`;
		const newNumber = numbers.join('');

		setIsEdit(false);

		const newParam = {
			number: newNumber,
			analytic_json_numbers: analyticNumbers
		};

		apiMainPatch(editLink, newParam);
		setReloadPage(true);
	};

	useEffect(() => {
		if (number === undefined) return;
		const digits = number.split('');

		setNumbers(digits);
		setAnalyticNumbers(analyticArray);
	}, [row]);

	const handleInputChange = (newNumber, index) => {
		const updatedNumbers = [...numbers];
		updatedNumbers[index] = newNumber;
		setNumbers(updatedNumbers);

		const updatedAnalyticNumbers = [...analyticNumbers];
		updatedAnalyticNumbers[index] = [`${newNumber}`, 100, 1];
		setAnalyticNumbers(updatedAnalyticNumbers);
	};

	return (
		<div className={styles.parent}>
			<div className={styles.header}>
				<div>
					<div style={{height: 56, display: 'flex',}}>
						{analyticArray?.map(([number, probability], index) => {
							const isValid = probability >= 50; // Задайте условие для определения правильности числа

							return (
								<div key={index}>
									{!isEdit
										? <div style={{ color: isValid ? 'green' : 'red', fontSize: 40, margin: 2 }}>{number}</div>
										: <div>
											<input
												style={{width: 20}}
												className={styles.searchInput}
												placeholder={number}
												onChange={(e) => handleInputChange(+e.target.value, index)}
											/>
										</div>
									}
								</div>
							);
						})}
					</div>
					<div className={styles.bottomText}>
						Номер вагона
					</div>
				</div>
				<ArrowIcon/>
				<div>
					<div style={{height: 49, marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
						<div style={{fontSize: 30, display: 'flex', alignItems: 'center'}}>
							{recogn_percent}%
							<Pie percentage={recogn_percent} colour={isValidFull ? 'green' : 'red'}/*colour='#A60000'*/ />
						</div>

						{!isEdit ?
							<IconButton onClick={() => setIsEdit(true)}>
								<EditIcon />
							</IconButton>
							: <IconButton onClick={handleEditField}>
								<CheckIcon style={{ color: '#B1B5C5'}} fontSize='large'/>
							</IconButton>
						}
					</div>
					<div className={styles.bottomText}>
						Точность определения
					</div>
				</div>
			</div>

			<div className={styles.center}>
			</div>

			<div className={styles.bottom}>
				<div style={{marginRight: 20}}>
					<div style={{height: 56, fontSize: 40}}>
					</div>
					<div className={styles.bottomText}>
						Род вагона
					</div>
				</div>

				<div style={{marginLeft: 20}}>
					<div style={{height: 49, marginBottom: 4}}>
						<div style={{fontSize: 30, display: 'flex', alignItems: 'center'}}>
							{workload}%
							<Pie percentage={workload} colour='#0795E0' />
						</div>
					</div>
					<div className={styles.bottomText}>
						Загруженность
					</div>
				</div>
			</div>

		</div>
	);
};

export default TopRigthCard;
