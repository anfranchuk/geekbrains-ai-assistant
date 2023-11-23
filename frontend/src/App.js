import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import TestPage from './pages/TestPage';
// import InfoPage from './pages/InfoPage';
// import SettingsPage from './pages/SettingsPage';
import LeftMenu from './components/LeftMenu/LeftMenu';

function App() {
	return (
		<div style={{height: '100vh', width: '100vw'}}>
			<BrowserRouter>
				<LeftMenu />

				<Routes>
					<Route path='/' element={<TestPage />} />
					{/*<Route path='/info' element={<InfoPage />} />*/}
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
