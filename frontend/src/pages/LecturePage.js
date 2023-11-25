import {useState, useEffect} from 'react';
import { DataGrid, ruRU } from '@mui/x-data-grid';
import styles from './LecturePage.module.scss';
import {apiMainGet} from '../api/api';
import * as React from 'react';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const columnsFull = [
	{ field: 'id', headerName: 'ID', width: 50 },
	{ field: 'name', headerName: 'Название', width: 200 },
	{ field: 'lecturer', headerName: 'Автор', width: 150 },
	{ field: 'datetime', headerName: 'Дата', width: 150 },
	{ field: 'analyticLectureQuality', headerName: 'Качество', width: 100 },
	{ field: 'analyticSilence', headerName: 'Отношение тишины к времени лекции', width: 300 },
	{ field: 'analyticSimilarity', headerName: 'Соответсвие методичке', width: 200 },
];

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'name', headerName: 'Параметр', width: 300 },
	{ field: 'param', headerName: 'Значение', width: 120 },
];

export default () => {
	const [dataEvents, setDataEvents] = useState([]);
	const [countRows, setCountRows] = useState(0);
	const [prevLink, setPrevLink] = useState('');
	const [nextLink, setNextLink] = useState('');
	const [currentLink, setCurrentLink] = useState('');
	const [isLoad, setIsLoad] = useState(false);
	const [pageCounter, setPageCounter] = useState(0);
	const [selectedLecture, setSelectedLecture] = useState(null);

	const path = 'ai-med-help.ru';
	// const localPath = window.location.host;

	const getLink = `http://${path}/api/v1/lectures`;

	const handlePlayText = (text) => {
		// Логика для проигрывания текста
	};

	const handleEdit = (section) => {
		// Логика для редактирования секции
	};

	const handleDelete = (section, index) => {
		if (selectedLecture === null) return;
		console.log(section, index);
		// dataEvents[selectedLecture].summary.splice(index, 1);
		console.log(dataEvents[selectedLecture].summary[index]);

		dataEvents[selectedLecture].summary.splice(index, 1)
	};

	const handleDoubleClick = (id) => {
		setSelectedLecture(id);
	};

	useEffect(() => {
		getEvents(getLink);
	}, []);

	const getEvents = (url = '') => {
		apiMainGet(url).then(({ data, error }) => {
			if (error.isError) return;

			const { next, count, previous, results } = data;

			setDataEvents(results);
			setCountRows(count);
			setPrevLink(previous);
			setNextLink(next);

			setIsLoad(false);
			setCurrentLink(url);
		});
	};

	const handleChangePage = (infoPage) => {
		let linkMove = pageCounter < infoPage ? nextLink : prevLink;

		if (!linkMove) {
			linkMove = currentLink;
		}

		getEvents(linkMove);

		setIsLoad(true);
		setPageCounter(infoPage);
	};

	console.log(selectedLecture);

	const oneText = (contentData, index) => {
		console.log(contentData);

		return(
			<div key={contentData.text} className={styles.oneText}>
				{/*<button style={{marginLeft: '-178px', marginRight: 0}} onClick={() => handlePlayText(contentData.text)}>Воспроизвести</button>*/}
				<p style={{maxWidth: '500px', border: '1px solid black', padding: '10px', borderRadius: 5, margin: 10}}>{contentData.text}</p>
				{/*<p style={{width: 30, display: 'inline-block'}}>{contentData.accuracy}%</p>*/}
				{/*<IconButton style={{marginLeft: 10}} onClick={() => handleEdit(contentData)}>*/}
				{/*	<AutoFixHighIcon sx={{color: 'black'}}/>*/}
				{/*</IconButton>*/}
				<IconButton style={{background: 'red'}} onClick={() => handleDelete(contentData, index)}>
					<DeleteIcon sx={{color: 'white'}}/>
				</IconButton>
			</div>
		);
	};

	const oneGlos = (contentData) => {
		console.log(contentData);

		return (
			<div key={contentData[0]} className={styles.oneText}>
				<p>{contentData[0]}</p>
				<p style={{maxWidth: '400px', border: '1px solid black', padding: '10px', borderRadius: 5, margin: 10}}>{contentData[1]}</p>
				<IconButton style={{background: 'red'}} onClick={() => handleDelete(contentData)}>
					<DeleteIcon sx={{color: 'white'}}/>
				</IconButton>
			</div>
		)
	};

	const selectLecture = (id) => {
		const selectedLectureData = dataEvents.find(lecture => lecture.id === id);

		console.log(selectedLectureData);
		const contentData = [
			{
				id: 0,
				title: 'Конспект',
				data: selectedLectureData.summary,
			},
			// {
			// 	id: 1,
			// 	title: 'Введение',
			// 	data: [
			// 		{
			// 			text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
			// 			accuracy: 78,
			// 		},
			// 		{
			// 			text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
			// 			accuracy: 12,
			// 		},
			// 		{
			// 			text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
			// 			accuracy: 83,
			// 		},
			// 	],
			// },
			// {
			// 	id: 2,
			// 	title: 'Содержание',
			// 	data: [
			// 		{
			// 			text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
			// 			accuracy: 78,
			// 		},
			// 		{
			// 			text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
			// 			accuracy: 12,
			// 		},
			// 		{
			// 			text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
			// 			accuracy: 83,
			// 		},
			// 	],
			// },
			// {
			// 	id: 3,
			// 	title: 'Заключение',
			// 	data: [
			// 		{
			// 			text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n",
			// 			accuracy: 50,
			// 		},
			// 	],
			// },
			{
				id: 1,
				title: 'Глоссарий',
				data: selectedLectureData.glossary,
			},
			{
				id: 2,
				title: 'Аналитика',
				data: [
					{
						id: 1,
						name: 'Качество лекции',
						param: selectedLectureData.analyticLectureQuality,
					},
					{
						id: 2,
						name: 'Процент cоответствия лекции методичке',
						param: selectedLectureData.analyticSimilarity,
					},
					{
						id: 3,
						name: 'Отношение тишины ко времени лекции',
						param: selectedLectureData.analyticSilence,
					},
				],
			},
		]

		console.log(selectedLectureData);
		return(
			<div style={{marginLeft: 128, marginTop: 20}}>
				<IconButton style={{position: 'absolute', left: 50}} onClick={() => setSelectedLecture(null)}>
					<ArrowBackIosNewIcon sx={{color: 'black'}}/>
				</IconButton>
				<div style={{display: 'flex', marginLeft: 50}}>
					<div className={styles.oneColumn}>
						<div>Лекция №{selectedLectureData.id}</div>
						<div>Лектор</div>
					</div>
					<div className={styles.oneColumn}>
						<div>{selectedLectureData.name}</div>
						<div>{selectedLectureData.lecturer}</div>
					</div>
					<div className={styles.oneColumn}>
						<div>{selectedLectureData.date}</div>
						{selectedLectureData.manual && <div>{selectedLectureData.manual}</div>}
					</div>
				</div>

				{contentData.map(content => {
					const {id, data} = content;

					console.log(content);

					return (
						<div style={{ height: '300px', width: '100%' }} key={`${content.title}-${content.id}`}>
							<h3>{content.title}</h3>
							{id === 1
								? content.data.map(contentData => oneGlos(contentData))
								: id === 2
									? <DataGrid sx={{width: 500}} rows={data} columns={columns} pageSize={5} />
									: content.data.map((contentData, index) => {
										if (contentData.t === 'conspect') {
											return oneText(contentData, index);
										}
									})
							}
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className={styles.page}>
			{selectedLecture !== null
				? selectLecture(selectedLecture)
				: <div style={{margin: 30, width: 1200, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<h2>Список лекций</h2>

					<DataGrid
						// style={{color: '#B1B5C5', borderRight: 'none', borderRadius: 0}}
						sx={{width: 1200}}
						columns={columnsFull}
						// rows={lectures}
						rows={dataEvents}
						loading={isLoad}
						pagination
						paginationMode="server"
						rowCount={countRows}
						onPageChange={handleChangePage}
						pageSizeOptions={[10]}
						pageSize={10}
						rowsPerPageOptions={[10]}
						onRowDoubleClick={(params) => handleDoubleClick(params.id)}
						// loading={isLoad}
						// paginationMode={'server'}
						// rowCount={countRows}
						disableColumnFilter
						// pageSizeOptions={[10]}
						hideFooterSelectedRowCount={true}
						onPaginationModelChange={handleChangePage}
						localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
					/>
				</div>
			}
		</div>
	);
};