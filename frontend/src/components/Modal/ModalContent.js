import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MyCard({ setOpenModal }) {

	const handleClick = () => {
		// Выполните необходимую логику перед закрытием модального окна
		// ...

		// Затем вызовите функцию handleClose для закрытия модального окна
	};

	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="div" style={{marginBottom: 10}}>
                    Предупреждение
				</Typography>
				<Typography variant="body2" color="text.secondary" component="div">
                    Вы не приложили методички, из-за чего часть аналитики не будет работать. Отправить без методички?
				</Typography>
			</CardContent>
			<CardActions style={{display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 15}}>
				<Button
					variant="contained"
					color="grey"
					onClick={() => setOpenModal(false)}
				>
                    Отправить
				</Button>
				<Button
					variant="contained"
					color="warning"
					onClick={() => setOpenModal(false)}
				>
                    Отмена
				</Button>
			</CardActions>
		</Card>
	);
}