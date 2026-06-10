import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Home'
import PortfolioView from './PortfolioView/PortfolioView'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Page404 from '@/components/Misc/Page404'

const Frontend = () => {
    const location = useLocation()
    const isPortfolioRoute = location.pathname.startsWith('/portfolio/')

    return (
        <>
            {!isPortfolioRoute && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="portfolio/:username" element={<PortfolioView />} />
                <Route path='*' element={<Page404 />} />
            </Routes>
            {!isPortfolioRoute && <Footer />}
        </>
    )
}

export default Frontend