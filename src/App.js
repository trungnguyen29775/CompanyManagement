import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { useContext, useEffect } from 'react';
import StateContext from './context/context.context';
import MainLayout from './layout/mainLayout';
import Profile from './pages/profile/profile';
import SignInSide from './pages/login';
import Home from './pages/home/home';
import AdminLayout from './layout/adminLayout';

function App() {
    const [state, dispatchState] = useContext(StateContext);
    const navigation = useNavigate();

    useEffect(() => {
        console.log(state);
    }, [state]);
    useEffect(() => {
        if (state.login !== true) navigation('/login');
    }, [state]);
    useEffect(() => {
        if (state.userData.role === 'admin') navigation('/admin');
        else if (state.userData.role === 'member') navigation('/');
    }, [state.userData]);
    return (
        <Routes>
            <Route path="/login" element={<SignInSide />} />
            <Route path="/admin" element={<AdminLayout />} />
            <Route path="/" element={<MainLayout />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default App;
