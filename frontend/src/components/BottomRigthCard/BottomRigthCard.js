import React, {useEffect, useState} from 'react';
import styles from './BottomRigthCard.module.scss';
import {DataGrid, ruRU} from '@mui/x-data-grid';
import {apiMainGet} from '../../api/api';
import { styled} from '@mui/material';

const StyledDataGrid = styled(DataGrid)(() => ({
	'& ::-webkit-scrollbar': {
		width: '6px'
	},
	'& ::-webkit-scrollbar-thumb': {
		backgroundColor: '#ccc',
		borderRadius: '3px',
	}
}));

const columns = [
	{ field: 'rightDateTime', headerName: 'Дата', flex: 1 },
	{ field: 'notification', headerName: 'Состояние', flex: 1 },
	{ field: 'place', headerName: 'Место', flex: 1 },
];

const BottomRigthCard = ({ getLink, number }) => {
	const [dataEvents, setDataEvents] = useState([]);
	const [countRows, setCountRows] = useState(0);
	const [prevLink, setPrevLink] = useState('');
	const [nextLink, setNextLink] = useState('');
	const [currentLink, setCurrentLink] = useState('');
	const [isLoad, setIsLoad] = useState(false);
	const [pageCounter, setPageCounter] = useState(0);

	const getNumberLink = `${getLink}?number=${number}`;

	useEffect(() => {
		getEvents(getNumberLink);

		setIsLoad(true);
	}, [getNumberLink]);

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
	
	return (
		<div className={styles.parent}>
			<StyledDataGrid
				style={{color: '#B1B5C5', borderRadius: 0}}
				rows={dataEvents}
				columns={columns}
				loading={isLoad}
				paginationMode={'server'}
				disableColumnFilter
				rowCount={countRows}
				initialState={{
					pagination: { paginationModel: { pageSize: 10 } },
				}}
				hideFooterSelectedRowCount={true}
				onPaginationModelChange={handleChangePage}
				localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
			/>
		</div>
	);
};

export default BottomRigthCard;
