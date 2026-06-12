import React from 'react'
import Hero from './Hero'
import Features from './Features'
import HowItWorks from './HowItWorks'
import Stats from './Stats'
import Showcase from './Showcase'
import CTA from './CTA'

const Home = () => {

    return (
        <main className="bg-zinc-950 text-zinc-100 overflow-hidden">
            {/* Hero Section */}
            <Hero />

            {/* Features Section */}
            <Features />

            {/* How It Works Section */}
            <HowItWorks />

            {/* Stats Section */}
            <Stats />

            {/* Showcase Section */}
            <Showcase />

            {/* CTA Section */}
            <CTA />
            
        </main>
    )
}

export default Home