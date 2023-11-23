import {useState, useEffect, useRef} from 'react';
import Header from '../components/Header/Header';
import {createTheme, styled, ThemeProvider} from '@mui/material';
import { DataGrid, ruRU } from '@mui/x-data-grid';
import TopRigthCard from '../components/TopRigthCard/TopRigthCard';
import TopLeftCard from '../components/TopLeftCard/TopLeftCard';
// import BottomRightCard from '../components/BottomRigthCard/BottomRigthCard';
import styles from './TestPage.module.scss';
import {apiMainGet} from '../api/api';
import { ReactMic } from 'react-mic';

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

	const serverPath = '77.223.96.53';
	// const localPath = window.location.host;

	const getLink = `http://${serverPath}/api/v1/events/`;
	// const getLink = `http://${localPath}/api/v1/events/`;

	useEffect(() => {
		getEvents(getLink);

		setIsLoad(true);
		setReloadPage(false);
	}, [reloadPage]);

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

	const handleChangePage = (infoPage) => {
		let linkMove = pageCounter < infoPage.page ? nextLink : prevLink;

		if (!linkMove) {
			linkMove = currentLink;
		}

		const urlParts = linkMove.split('?');
		let updatelink = linkMove;

		const queryParams = new URLSearchParams(urlParts[1]);
		queryParams.set('page_size', infoPage.pageSize.toString());

		updatelink = `${urlParts[0]}?${queryParams.toString()}`;

		getEvents(updatelink);

		setIsLoad(true);
		setPageCounter(infoPage.page);
	};

	const handleSelectRow = (row) => {
		setSelected(row.row);
	};

	const audioRef = useRef();
	const nameRef = useRef();

	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Здесь вы можете реализовать отправку данных на сервер.
		// Для отправки файла вы можете использовать объект FormData.
		const formData = new FormData();
		formData.append('audio', audioRef.current.files[0]);
		formData.append('name', nameRef.current.value);

		// Заглушка для отправки данных на сервер
		console.log(formData);

		// fetch('/your-api-endpoint', {
		//   method: 'POST',
		//   body: formData,
		// })
		// .then(response => response.json())
		// .then(data => console.log(data))
		// .catch((error) => console.error('Error:', error));
	};


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
	};

	const handleSend = () => {
		console.log(recordedData);
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

	return (
		<div style={{ backgroundColor: '#202125', height: '100%', width: 'calc(100% - 70px)', marginLeft: 70 }}>
			<Header />

			<div style={{width: 'calc(100% - 0px)', height: 'calc(100% - 80px)', display: 'flex'}}>
				<ThemeProvider theme={darkTheme}>
					<div style={{width: '65%', height: '100%', display: 'flex', flexDirection: 'column'}}>
						<div style={{width: '100%', height: '55%', borderRight: '1px solid #404249'}}>
							{/*<TopLeftCard row={selected}/>*/}


							<div className={styles.App}>
								<form onSubmit={handleFormSubmit}>
									<input ref={nameRef} type="text" name="name" placeholder="Your Name" required />
									<input ref={audioRef} type="file" name="audio" accept="audio/*" required />
									<input type="submit" value="Submit" />
								</form>
							</div>

						</div>

						<div className={styles.ReactMic} style={{width: '100%', height: '45%'}}>

							<ReactMic
								record={recordStart}
								onStop={handleStop}
								onData={handleData}
								strokeColor="#FFFFFF"
								backgroundColor="#202125"
							/>
							<button onClick={handleStart}>Start Recording</button>
							<button onClick={handleStop}>Stop Recording</button>
							<button onClick={handleSend}>Send Audio</button>



							{recordedData && (
								<div>
									<audio controls src={URL.createObjectURL(recordedData)} />
								</div>
							)}
							{/*<StyledDataGrid*/}
							{/*	style={{color: '#B1B5C5', borderRight: 'none', borderRadius: 0}}*/}
							{/*	rows={dataEvents}*/}
							{/*	columns={columnsFull}*/}
							{/*	loading={isLoad}*/}
							{/*	paginationMode={'server'}*/}
							{/*	rowCount={countRows}*/}
							{/*	disableColumnFilter*/}
							{/*	initialState={{*/}
							{/*		pagination: {*/}
							{/*			paginationModel: { pageSize: 10 },*/}
							{/*		},*/}
							{/*	}}*/}
							{/*	pageSizeOptions={[10]}*/}
							{/*	hideFooterSelectedRowCount={true}*/}
							{/*	onRowClick={handleSelectRow}*/}
							{/*	onPaginationModelChange={handleChangePage}*/}
							{/*	localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}*/}
							{/*/>*/}
						</div>
					</div>

					<div style={{width: '35%', height: '100%', display: 'flex', flexDirection: 'column'}}>
						<div style={{width: '100%', height: '55%'}}>
							{/*<TopRigthCard getLink={getLink} row={selected} setReloadPage={setReloadPage}/>*/}
						</div>

						<div style={{width: '100%', height: '45%'}}>


							{/*<BottomRightCard getLink={getLink} number={selected.number}/>*/}
						</div>
					</div>
				</ThemeProvider>
			</div>
		</div>
	);
};