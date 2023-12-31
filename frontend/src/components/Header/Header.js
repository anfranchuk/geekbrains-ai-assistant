import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useNavigate} from 'react-router-dom';
import Typography from "@mui/material/Typography";

const ITEM_HEIGHT = 48;

const options = [
	{
		title: 'Загрузка лекции',
		link: '/download',
	},
	{
		title: 'Список лекций',
		link: '/lecture',
	},
];

export default function Header() {
	const navigate = useNavigate();

	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = () => {
		navigate('/account');
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};


	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			position={'fixed'}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{/*<MenuItem>*/}
			{/*	<IconButton*/}
			{/*		size="large"*/}
			{/*		aria-label="show 17 new notifications"*/}
			{/*		color="inherit"*/}
			{/*	>*/}
			{/*		<Badge badgeContent={17} color="error">*/}
			{/*			<NotificationsIcon />*/}
			{/*		</Badge>*/}
			{/*	</IconButton>*/}
			{/*	<p>Notifications</p>*/}
			{/*</MenuItem>*/}
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
						onClick={handleClick}
					>
						<MenuIcon />
					</IconButton>

					<Menu
						id="long-menu"
						MenuListProps={{
							'aria-labelledby': 'long-button',
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						PaperProps={{
							style: {
								maxHeight: ITEM_HEIGHT * 4.5,
								width: '20ch',
							},
						}}
					>
						{options.map(({ title, link }) => (
							<MenuItem key={title} onClick={() => {navigate(link); setAnchorEl(null);}}>
								{title}
							</MenuItem>
						))}
					</Menu>

					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Интеллектуальный ассистент методиста
					</Typography>
					<Box sx={{ flexGrow: 1 }}/>
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{/*<IconButton size="large" aria-label="show 4 new mails" color="inherit">*/}
						{/*	<Badge badgeContent={4} color="error">*/}
						{/*		<MailIcon />*/}
						{/*	</Badge>*/}
						{/*</IconButton>*/}
						{/*<IconButton*/}
						{/*	size="large"*/}
						{/*	aria-label="show 17 new notifications"*/}
						{/*	color="inherit"*/}
						{/*>*/}
						{/*	<Badge badgeContent={17} color="error">*/}
						{/*		<NotificationsIcon />*/}
						{/*	</Badge>*/}
						{/*</IconButton>*/}
						<IconButton
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
		</Box>
	);
}