import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Portfolio from './Portfolio'

const Index = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/portfolio/*' element={<Portfolio />} />
        </Routes>
    )
}

export default Index