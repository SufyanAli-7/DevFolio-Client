import { Routes, Route } from 'react-router-dom'
import PersonalInfo from './PersonalInfo'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import SocialLinks from './SocialLinks'

const Portfolio = () => {
    return (
        <Routes>
            <Route path='/' element={<PersonalInfo />} />
            <Route path='/personal-info' element={<PersonalInfo />} />
            <Route path='/about' element={<About />} />
            <Route path='/skills' element={<Skills />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/social-links' element={<SocialLinks />} />
        </Routes>
    )
}

export default Portfolio