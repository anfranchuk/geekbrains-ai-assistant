import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import backImage from '../assets/img_1.png';


export default function AccountPage() {
	const defUser = {
		name: 'Имя  Фамилия',
		role: 'Лектор'
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				margin: '50px 20px 0 20px', // Add a 20px margin on the right and left
			}}
		>
			<Card sx={{ display: 'flex' }}>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<CardContent sx={{ flex: '1 0 auto' }}>
						<Typography component="div" variant="h5">
							{defUser.name}
						</Typography>
						<Typography variant="subtitle1" color="text.secondary" component="div">
							{defUser.role}
						</Typography>
					</CardContent>
				</Box>
				<CardMedia
					component="img"
					sx={{ width: 151 }}
					image={backImage}
					alt="Live from space album cover"
				/>
			</Card>

		</Box>

	);
}