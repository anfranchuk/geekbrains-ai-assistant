import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import TestPage from './pages/TestPage';
// import InfoPage from './pages/InfoPage';
// import SettingsPage from './pages/SettingsPage';
import LeftMenu from './components/LeftMenu/LeftMenu';
import SignInSide from './pages/SingIn';
import AccountPage from './pages/AccountPage';
import Header from './components/Header/Header';
import DownloadPage from './pages/DowloadPage';

function App() {
	return (
		<div>
			<BrowserRouter>
				<Header/>
				<Routes>
					<Route path='/' element={<AccountPage />} />
					<Route path='/singin' element={<SignInSide />} />
					<Route path='/download' element={<DownloadPage />} />
					{/*<Route path='/settings' element={<SettingsPage />} />*/}
					<Route path='*' element={<Navigate to='/' />} />
					{/*<Route path='/tg' component={() => {*/}
					{/*	window.location.href = 'https://t.me/RECVNBOT/start';*/}
					{/*}} />*/}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
