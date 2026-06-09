import React from 'react'
import Navbar from './Navbar'

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-md border-b border-zinc-900/60">
            <Navbar />
        </header>
    )
}

export default Header