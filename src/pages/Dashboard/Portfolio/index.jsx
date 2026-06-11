import { Routes, Route } from 'react-router-dom'
import Hero from './Hero'

const Portfolio = () => {
    return (
        <Routes>
            <Route path='/' element={<Hero />} />
        </Routes>
    )
}

export default Portfolio