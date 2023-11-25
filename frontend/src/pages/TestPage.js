import {useState, useEffect, useRef} from 'react';
import Header from '../components/Header/Header';
import {createTheme, Input, styled, ThemeProvider} from '@mui/material';
import { DataGrid, ruRU } from '@mui/x-data-grid';
import TopRigthCard from '../components/TopRigthCard/TopRigthCard';
import TopLeftCard from '../components/TopLeftCard/TopLeftCard';
// import BottomRightCard from '../components/BottomRigthCard/BottomRigthCard';
import styles from './TestPage.module.scss';
import {apiMainGet, apiPost} from '../api/api';
import { ReactMic } from 'react-mic';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MyCard from '../components/Modal/ModalContent';
import * as React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const defEvent = {
	'id': 1,
	'input_datetime': '2023-10-14T17:05:16.613423',
	'input_photo': null,
	'recognized_datetime': null,
	'recognized_photo': null,
	'is_analyzed': false,
	'filename': null,
	'type': 0,
	'number': '',
	'is_correct': 0,
	'coordinates': {
		'x': 0,
		'y': 0,
		'width': 0,
		'height': 0
	},
	'recogn_percent': 0.0,
	'analytic_json_numbers': [[1,49],[1,20],[1,99],[1,99],[1,99],[1,63],[1,99],[1,99]],
	'camera': 'Тест камера',
	'place': 'Тест объект',
	'notification': '',
	'workload': 0
};

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const StyledDataGrid = styled(DataGrid)(() => ({
	'& ::-webkit-scrollbar': {
		width: '6px'
	},
	'& ::-webkit-scrollbar-thumb': {
		backgroundColor: '#ccc',
		borderRadius: '3px',
	}
}));

const columnsFull = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'rightDateTime', headerName: 'Дата', flex: 1 },
	{ field: 'number', headerName: 'Номер вагона', flex: 1 },
	{ field: 'recogn_percent', headerName: 'Точность', flex: 1 },
	{ field: 'notification', headerName: 'Состояние', flex: 1 },
	{ field: 'place', headerName: 'Место', flex: 1 },
];

export default () => {
	const [dataEvents, setDataEvents] = useState([]);
	const [countRows, setCountRows] = useState(0);
	const [prevLink, setPrevLink] = useState('');
	const [nextLink, setNextLink] = useState('');
	const [currentLink, setCurrentLink] = useState('');
	const [isLoad, setIsLoad] = useState(false);
	const [pageCounter, setPageCounter] = useState(0);
	const [selected, setSelected] = useState(defEvent);
	const [reloadPage, setReloadPage] = useState(false);
	const [open, setOpen] = React.useState(false);
	// const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const path = 'ai-med-help.ru';
	// const localPath = window.location.host;

	const postLink = `http://${path}/api/v1/lectures/`;

	// useEffect(() => {
	// 	getEvents(getLink);
	//
	// 	setIsLoad(true);
	// 	// setReloadPage(false);
	// }, [reloadPage]);

	const getEvents = (url = '') => {
		apiMainGet(url).then(({ data, error }) => {
			if (error.isError) return;

			const { next, count, previous, results } = data;

			console.log(results);
			const newData = results.map(item => {
				const { input_datetime } = item;
				const dataTime = input_datetime.split('T');
				const firstDate = new Date(dataTime[0]);
				const date = `${firstDate.toLocaleDateString()} ${dataTime[1].slice(0, 5)}`;
				return ({ ...item, rightDateTime: date });
			});

			setDataEvents(newData);
			setCountRows(count);
			setPrevLink(previous);
			setNextLink(next);

			setIsLoad(false);
			setCurrentLink(url);
			setSelected(newData[0]);
		});
	};

	// const handleChangePage = (infoPage) => {
	// 	let linkMove = pageCounter < infoPage.page ? nextLink : prevLink;
	//
	// 	if (!linkMove) {
	// 		linkMove = currentLink;
	// 	}
	//
	// 	const urlParts = linkMove.split('?');
	// 	let updatelink = linkMove;
	//
	// 	const queryParams = new URLSearchParams(urlParts[1]);
	// 	queryParams.set('page_size', infoPage.pageSize.toString());
	//
	// 	updatelink = `${urlParts[0]}?${queryParams.toString()}`;
	//
	// 	getEvents(updatelink);
	//
	// 	setIsLoad(true);
	// 	setPageCounter(infoPage.page);
	// };
	//
	// const handleSelectRow = (row) => {
	// 	setSelected(row.row);
	// };
	//
	const audioRef = useRef();
	const nameRef = useRef();

	// const handleFormSubmit = (e) => {
	// 	e.preventDefault();
	//
	// 	// Здесь вы можете реализовать отправку данных на сервер.
	// 	// Для отправки файла вы можете использовать объект FormData.
	// 	const formData = new FormData();
	// 	formData.append('audio', audioRef.current.files[0]);
	// 	formData.append('name', nameRef.current.value);
	//
	// 	// Заглушка для отправки данных на сервер
	// 	console.log(formData);
	//
	// 	// fetch('/your-api-endpoint', {
	// 	//   method: 'POST',
	// 	//   body: formData,
	// 	// })
	// 	// .then(response => response.json())
	// 	// .then(data => console.log(data))
	// 	// .catch((error) => console.error('Error:', error));
	// };


	const [recordedData, setRecordedData] = useState(null);
	const [recordStart, setRecordStart] = useState(false);

	const handleData = (recordedBlob) => {
		console.log('chunk of real-time data is: ', recordedBlob);
	};

	const handleStart = () => {
		console.log('Recording started');
		setRecordStart(true);
	};

	const handleStop = (recordedBlob) => {
		console.log('Recording stopped');
		setRecordStart(false);
		setRecordedData(recordedBlob.blob);

		// e.preventDefault();
		//
		// const formData = new FormData();
		// formData.append('audio', audioRef.current.files[0]);
		// formData.append('name', nameRef.current.value);
		//
		// console.log(recordedData);
	};

	const handleSend = (e) => {
		// e.preventDefault();
		//
		// const formData = new FormData();
		// formData.append('audio', audioRef.current.files[0]);
		// formData.append('name', nameRef.current.value);
		//
		// console.log(recordedData);
		// if (recordedData) {
		// 	const formData = new FormData();
		// 	formData.append('audio', recordedData, 'recording.wav');
		//
		// 	fetch('your-api-endpoint', {
		// 		method: 'POST',
		// 		body: formData
		// 	})
		// 		.then(response => response.json())
		// 		.then(data => {
		// 			console.log('API response:', data);
		// 			// Handle the response as needed
		// 		})
		// 		.catch(error => {
		// 			console.error('Error:', error);
		// 		});
		// }
	};

	const fileInputRef = useRef(null);

	const handleUpload = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		// Handle the file
	};


	const [lectureName, setLectureName] = useState('');
	const [lecturer, setLecturer] = useState('test@test.ru');
	const [audioFile, setAudioFile] = useState(null);
	const [videoFile, setVideoFile] = useState(null);
	const [recordedAudio, setRecordedAudio] = useState(null);
	const [uploadWordFile, setUploadWordFile] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const handleLectureNameChange = (e) => {
		setLectureName(e.target.value);
	};

	const handleLecturerChange = (e) => {
		setLecturer(e.target.value);
	};

	const handleAudioFileChange = (e) => {
		setAudioFile(e.target.files[0]);
	};

	const handleVideoFileChange = (e) => {
		setVideoFile(e.target.files[0]);
	};

	const handleRecordedAudio = (blob) => {
		setRecordedAudio(blob);
	};

	const handleUploadWordFileChange = () => {
		setUploadWordFile(!uploadWordFile);
	};

	const handleSubmit = (e) => {
		if (!uploadWordFile) setOpenModal(true);
		e.preventDefault();

		// Отправка данных на бэкенд
		const formDataAudio = new FormData();
		const formDataVideo = new FormData();
		if (audioFile) {
			formDataAudio.append('audiofile', audioFile);
		}
		if (videoFile) {
			formDataVideo.append('videoFile', videoFile);
		}
		if (recordedAudio) {
			formDataAudio.append('audioFile', recordedAudio);
		}
		// formData.append('uploadWordFile', uploadWordFile);

		console.log(audioFile);
		const data = {
			lecturer: lecturer,
			name: lectureName,
			audiofile: formDataAudio,
			// audiofile: audioFile,
			videoFile: formDataVideo,
		}

		// fetch('postLink', {
		// 	method: 'POST',
		// 	body: formData,
		// })
		// 	.then(response => response.json())
		// 	.then(data => console.log(data))
		// 	.catch((error) => console.error('Error:', error));

		apiPost(postLink, data);

		// Отправка formData на бэкенд...
	};

	const [selectedFileType, setSelectedFileType] = useState(null);

	const handleFileTypeChange = (e) => {
		setSelectedFileType(e.target.value);
	};

	// const handleFileChange = (e) => {
	// 	// Handle the file change based on the selected file type
	// };

	const handleRecordButtonClick = () => {
		// Handle the record button click based on the selected file type
	};

	console.log(lectureName, lecturer, audioFile, videoFile, recordedAudio, uploadWordFile);

	return (
		<div className={styles.page}>
			{/*<div className={styles.contaner}>*/}
			{/*	<p>Название лекции</p>*/}
			{/*	/!*<div style={{width: 'calc(100% - 0px)', height: 'calc(100% - 80px)', display: 'flex'}}>*!/*/}
			{/*	/!*<ThemeProvider theme={darkTheme}>*!/*/}
			{/*	/!*<div style={{width: '65%', height: '100%', display: 'flex', flexDirection: 'column'}}>*!/*/}
			{/*	/!*<div style={{width: '100%', height: '55%', borderRight: '1px solid #404249'}}>*!/*/}
			{/*	/!*	/!*<TopLeftCard row={selected}/>*!/*!/*/}


			{/*	<div className={styles.App}>*/}
			{/*		<TextField ref={nameRef} label="Название лекции" variant="outlined" />*/}

			{/*		<Input />*/}

			{/*		<div>*/}
			{/*			<Button variant="contained" onClick={handleUpload}>*/}
			{/*				Upload File*/}
			{/*			</Button>*/}
			{/*			<input*/}
			{/*				type="file"*/}
			{/*				accept="audio/*"*/}
			{/*				ref={fileInputRef}*/}
			{/*				onChange={handleFileChange}*/}
			{/*			/>*/}
			{/*		</div>*/}

			{/*		<input ref={nameRef} type="text" name="name" placeholder="Название" required />*/}
			{/*		<input ref={audioRef} type="file" name="audio" accept="audio/*" required />*/}
			{/*		/!*<form onSubmit={handleFormSubmit}>*!/*/}
			{/*		/!*	<input ref={nameRef} type="text" name="name" placeholder="Название" required />*!/*/}
			{/*		/!*	<input ref={audioRef} type="file" name="audio" accept="audio/*" required />*!/*/}
			{/*		/!*	<input type="submit" value="Отправить файл" />*!/*/}
			{/*		/!*</form>*!/*/}
			{/*	</div>*/}

			{/*	/!*</div>*!/*/}

			{/*	<div className={styles.ReactMic}>*/}

			{/*		<ReactMic*/}
			{/*			record={recordStart}*/}
			{/*			onStop={handleStop}*/}
			{/*			onData={handleData}*/}
			{/*			strokeColor="#FFFFFF"*/}
			{/*			backgroundColor="#1f222e"*/}
			{/*		/>*/}
			{/*		<button onClick={handleStart}>Start Recording</button>*/}
			{/*		<button onClick={handleStop}>Stop Recording</button>*/}
			{/*		<button onClick={handleSend}>Send Audio</button>*/}



			{/*		{recordedData && (*/}
			{/*			<div>*/}
			{/*				<audio controls src={URL.createObjectURL(recordedData)} />*/}
			{/*			</div>*/}
			{/*		)}*/}
			{/*		/!*<StyledDataGrid*!/*/}
			{/*		/!*	style={{color: '#B1B5C5', borderRight: 'none', borderRadius: 0}}*!/*/}
			{/*		/!*	rows={dataEvents}*!/*/}
			{/*		/!*	columns={columnsFull}*!/*/}
			{/*		/!*	loading={isLoad}*!/*/}
			{/*		/!*	paginationMode={'server'}*!/*/}
			{/*		/!*	rowCount={countRows}*!/*/}
			{/*		/!*	disableColumnFilter*!/*/}
			{/*		/!*	initialState={{*!/*/}
			{/*		/!*		pagination: {*!/*/}
			{/*		/!*			paginationModel: { pageSize: 10 },*!/*/}
			{/*		/!*		},*!/*/}
			{/*		/!*	}}*!/*/}
			{/*		/!*	pageSizeOptions={[10]}*!/*/}
			{/*		/!*	hideFooterSelectedRowCount={true}*!/*/}
			{/*		/!*	onRowClick={handleSelectRow}*!/*/}
			{/*		/!*	onPaginationModelChange={handleChangePage}*!/*/}
			{/*		/!*	localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}*!/*/}
			{/*/>*/}
			{/*		/!*	</div>*!/*/}
			{/*	</div>*/}

			{/*	/!*<div style={{width: '35%', height: '100%', display: 'flex', flexDirection: 'column'}}>*!/*/}
			{/*	/!*	<div style={{width: '100%', height: '55%'}}>*!/*/}
			{/*	/!*		/!*<TopRigthCard getLink={getLink} row={selected} setReloadPage={setReloadPage}/>*!/*!/*/}
			{/*	/!*	</div>*!/*/}

			{/*	/!*	<div style={{width: '100%', height: '45%'}}>*!/*/}


			{/*	/!*		/!*<BottomRightCard getLink={getLink} number={selected.number}/>*!/*!/*/}
			{/*	/!*	</div>*!/*/}
			{/*	/!*</div>*!/*/}
			{/*	/!*</ThemeProvider>*!/*/}
			{/*	/!*</div>*!/*/}
			{/*	<Modal*/}
			{/*		open={open}*/}
			{/*		onClose={handleClose}*/}
			{/*	>*/}
			{/*		<Box*/}
			{/*			sx={{*/}
			{/*				position: 'absolute',*/}
			{/*				top: '50%',*/}
			{/*				left: '50%',*/}
			{/*				transform: 'translate(-50%, -50%)',*/}
			{/*				display: 'flex',*/}
			{/*				justifyContent: 'center',*/}
			{/*				margin: '50px 20px 0 20px', // Add a 20px margin on the right and left*/}
			{/*			}}*/}
			{/*		>*/}
			{/*			<MyCard handleClose={handleClose}/>*/}
			{/*		</Box>*/}

			{/*	</Modal>*/}
			{/*</div>*/}


			<div className={styles.container}>
				<h2>Загрузка лекции</h2>
				<form onSubmit={handleSubmit}>
					<label>Информация:</label>

					<div className={styles.field} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
						<TextField
							label="Название лекции"
							variant="outlined"
							size={'small'}
							type="text"
							value={lectureName}
							onChange={handleLectureNameChange}
						/>

						<TextField
							label="Лектор"
							variant="outlined"
							size={'small'}
							type="text"
							defaultValue='test@test.ru'
							InputProps={{
								readOnly: true,
							}}
						/>
					</div>
					<div className={styles.field}>
						<label>
							<input
								type="radio"
								name="fileType"
								value="audio"
								onChange={handleFileTypeChange}
							/>
							Загрузить аудио
						</label>
						<input
							type="file"
							id="audioFile"
							accept="audio/*"
							onChange={handleAudioFileChange}
							disabled={selectedFileType !== "audio"}
						/>
					</div>
					<div className={styles.field}>
						<label>
							<input
								type="radio"
								name="fileType"
								value="video"
								onChange={handleFileTypeChange}
							/>
							Загрузить видео
						</label>
						<input
							type="file"
							id="videoFile"
							accept="video/*"
							onChange={handleVideoFileChange}
							disabled={selectedFileType !== "video"}
						/>
					</div>
					<div className={styles.field}>
						<label>
							<input
								type="radio"
								name="fileType"
								value="record"
								onChange={handleFileTypeChange}
							/>
							Записать лекцию
						</label>
						<div className={styles.ReactMic}>
							<ReactMic
								record={recordStart}
								onStop={handleStop}
								onData={handleData}
								strokeColor="#1976d2"
								backgroundColor="white"
							/>
							<div>
								<button
									onClick={handleStart}
									disabled={selectedFileType !== "record"}
								>
									Начать запись
								</button>
								<button
									onClick={handleStop}
									disabled={selectedFileType !== "record"}
								>
									Остановить запись
								</button>
							</div>

							{recordedData && (
								<div>
									<audio controls src={URL.createObjectURL(recordedData)} />
								</div>
							)}
						</div>
					</div>
					<div className={styles.field}>
						<label htmlFor="uploadWordFile">Методичка:</label>
						<input
							type="checkbox"
							id="uploadWordFile"
							checked={uploadWordFile}
							onChange={handleUploadWordFileChange}
						/>
						<input
							type="file"
							id="textFile"
							accept="text/*"
							onChange={handleFileChange}
							disabled={!uploadWordFile}
						/>
					</div>
					<div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
						<button type="submit" disabled={(lectureName === '') || (recordedAudio  === null && videoFile === null && audioFile === null)}>Отправить</button>
					</div>
				</form>
			</div>

			<Modal
				open={openModal}
				onClose={handleClose}
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						display: 'flex',
						justifyContent: 'center',
						margin: '50px 20px 0 20px', // Add a 20px margin on the right and left
					}}
				>
					<MyCard setOpenModal={setOpenModal}/>
				</Box>

			</Modal>
		</div>
	);
};