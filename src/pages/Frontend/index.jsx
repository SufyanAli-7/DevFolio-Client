import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Home'
import PortfolioView from './PortfolioView/PortfolioView'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Frontend = () => {
    const location = useLocation()
    const isPortfolioRoute = location.pathname.startsWith('/portfolio/')

    return (
        <>
            {!isPortfolioRoute && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="portfolio/:username" element={<PortfolioView />} />
            </Routes>
            {!isPortfolioRoute && <Footer />}
        </>
    )
}

export default Frontend