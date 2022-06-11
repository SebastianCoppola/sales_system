import React from "react";
// REACT ROUTER DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// VIEWS
import Login from '../views/Login/Login';
import Products from '../views/Products/Products';
import Sales from '../views/Sales/Sales';
import Profile from '../views/Profile/Profile';
import PrivateRoute from './PrivateRoute';
import NotFound from '../views/NotFound/NotFound';
import SignUp from '../components/SignUp/SignUp';
import Home from '../views/Home/Home';
//COMPONENTS
import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';

function AppRoutes() {
    return (
    <Router>
		<div className='App'>
			<Header />
			<NavBar />
			<Routes>
				<Route path='/' element={<PrivateRoute/>}>
					<Route path='/' element={<Profile />} />
				</Route>
				<Route path='/products' element={<PrivateRoute/>}>
					<Route path='/products' element={<Products />} />
				</Route>
				<Route path='/sales' element={<PrivateRoute/>}>
					<Route path='/sales' element={<Sales />} />
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/singup' element={<SignUp />} />
				<Route path='*' element={<NotFound />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</div>

		</Router>
    );
}

export default AppRoutes;