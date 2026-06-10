import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Page404 from '@/components/Misc/Page404'

const Auth = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path='*' element={<Page404 />} />
        </Routes>
    )
}

export default Auth