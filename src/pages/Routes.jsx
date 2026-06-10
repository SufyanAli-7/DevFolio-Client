import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { useAuth } from '@/context/AuthContext'
import ProtectedRoute from '@/components/Misc/ProtectedRoute'
import Page404 from '@/components/Misc/Page404'

const Index = () => {
    const { isAuth } = useAuth()
    return (
        <Routes>
            <Route path='/*' element={<Frontend />} />
            <Route path='auth/*' element={!isAuth ? <Auth /> : <Navigate to='/dashboard' />} />
            <Route path='dashboard/*' element={<ProtectedRoute Component={Dashboard} />} />
            <Route path='*' element={<Page404 />} />
        </Routes>
    )
}

export default Index