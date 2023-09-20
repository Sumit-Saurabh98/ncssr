import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import ProtectedRoute from './ProtectedRoute';

function AllRoute(props) {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        </Routes>
    );
}

export default AllRoute;