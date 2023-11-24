import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MyCard({ handleClose = () => {} }) {
	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="div">
                    Предупреждение
				</Typography>
				<Typography variant="body2" color="text.secondary" component="div">
                    Вы не приложили методички, из-за чего часть аналитики не будет работать. Отправить без методички?
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant="contained"
					color="grey"
					onClick={handleClose}
				>
                    Отправить
				</Button>
				<Button
					variant="contained"
					color="warning"
					onClick={handleClose}
				>
                    Отмена
				</Button>
			</CardActions>
		</Card>
	);
}