import {useState, useEffect, useRef} from 'react';
import Header from '../components/Header/Header';
import {createTheme, Input, styled, ThemeProvider} from '@mui/material';
import { DataGrid, ruRU } from '@mui/x-data-grid';
import TopRigthCard from '../components/TopRigthCard/TopRigthCard';
import TopLeftCard from '../components/TopLeftCard/TopLeftCard';
// import BottomRightCard from '../components/BottomRigthCard/BottomRigthCard';
import styles from './LecturePage.module.scss';
import {apiMainGet} from '../api/api';
import { ReactMic } from 'react-mic';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MyCard from '../components/Modal/ModalContent';
import * as React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default () => {
	const columns = [
		{ field: 'param1', headerName: 'Место', flex: 1 },
		{ field: 'param2', headerName: 'Событие', flex: 1 },
		{ field: 'param3', headerName: 'Судно', flex: 1 },

	];

	const data = [
		{
			text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
			accuracy: 78,
		},
		{
			text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
			accuracy: 12,
		},
		{
			text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
			accuracy: 83,
		},
	];

	const contentData = [
		{
			id: 0,
			title: 'Оглавление',
			data: [
				{
					text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
					accuracy: 78,
				},
				{
					text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
					accuracy: 12,
				},
				{
					text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
					accuracy: 83,
				},
			],
		},
		{
			id: 1,
			title: 'Введение',
			data: [
				{
					text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
					accuracy: 78,
				},
				{
					text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
					accuracy: 12,
				},
				{
					text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
					accuracy: 83,
				},
			],
		},
		{
			id: 2,
			title: 'Содержание',
			data: [
				{
					text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
					accuracy: 78,
				},
				{
					text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
					accuracy: 12,
				},
				{
					text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
					accuracy: 83,
				},
			],
		},
		{
			id: 3,
			title: 'Заключение',
			data: [
				{
					text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
					accuracy: 50,
				},
			],
		},
		{
			id: 4,
			title: 'Глоссарий',
			data: [
				{
					term: 'offchdc',
					text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
				},
			],
		},
		{
			id: 5,
			title: 'Аналитика',
			data: [
				{
					id: 0,
					param1: '86',
					param2: '70',
					param3: '0.15',
				},
			],
		},
	]

// You can then use the `data` array in your code
	const lecture = {
		number: 1,
		title: 'Название лекции',
		author: 'Автор',
		date: '01.01.2022',
		method: true,
		file: 'Методичка'
	};


	const handlePlayText = (text) => {
		// Логика для проигрывания текста
	};

	const handleEdit = (section) => {
		// Логика для редактирования секции
	};

	const handleDelete = (section) => {
		// Логика для удаления секции
	};

	const oneText = (contentData) => {

		return(
			<div key={contentData.text} className={styles.oneText}>
				<button style={{marginLeft: '-178px', marginRight: 0}} onClick={() => handlePlayText(contentData.text)}>Воспроизвести</button>
				<p style={{maxWidth: '500px', border: '1px solid black', padding: '10px', borderRadius: 5, margin: 10}}>{contentData.text}</p>
				<p style={{width: 30, display: 'inline-block'}}>{contentData.accuracy}%</p>
				<IconButton style={{marginLeft: 10}} onClick={() => handleEdit(contentData)}>
					<AutoFixHighIcon sx={{color: 'black'}}/>
				</IconButton>
				<IconButton style={{background: 'red'}} onClick={() => handleDelete(contentData)}>
					<DeleteIcon sx={{color: 'white'}}/>
				</IconButton>
			</div>
		);
	};

	const oneGlos = (contentData) => {

		return(
			<div key={contentData.text} className={styles.oneText}>
				<p>{contentData.term}</p>
				<p style={{maxWidth: '400px', border: '1px solid black', padding: '10px', borderRadius: 5, margin: 10}}>{contentData.text}</p>
				<IconButton style={{background: 'red'}} onClick={() => handleDelete(contentData)}>
					<DeleteIcon sx={{color: 'white'}}/>
				</IconButton>
			</div>
		);
	}

	return (
		<div className={styles.page}>
			<div style={{marginLeft: 178, marginTop: 20}}>
				<div style={{display: 'flex'}}>
					<div className={styles.oneColumn}>
						<div>Лекция №{lecture.number}</div>
						<div>Лектор</div>
					</div>
					<div className={styles.oneColumn}>
						<div>{lecture.title}</div>
						<div>{lecture.author}</div>
					</div>
					<div className={styles.oneColumn}>
						<div>{lecture.date}</div>
						{lecture.file && <div>{lecture.file}</div>}
					</div>
				</div>

				{contentData.map(content => {
					const {id} = content;

					return (
						<div key={content.id}>
							<h3>{content.title}</h3>
							{id === 4
								? content.data.map(contentData => oneGlos(contentData))
								: id === 5
									? <DataGrid columns={columns} rows={content.data} />
									: content.data.map(contentData => oneText(contentData))}
						</div>
					);
				})}
			</div>
		</div>
	);
};