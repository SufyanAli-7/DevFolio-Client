import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from './Hero'
import Features from './Features'
import HowItWorks from './HowItWorks'
import Stats from './Stats'

const Home = () => {
    const showcases = [
        {
            name: 'Sarah Jenkins',
            role: 'Frontend Architect',
            skills: ['React', 'TypeScript', 'Tailwind', 'Three.js'],
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
            username: 'sarahj',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            name: 'Marcus Chen',
            role: 'Full Stack Engineer',
            skills: ['Next.js', 'Node.js', 'PostgreSQL', 'GraphQL'],
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
            username: 'marcusc',
            color: 'from-purple-500 to-pink-500'
        },
        {
            name: 'Elena Rostova',
            role: 'Product Designer',
            skills: ['Framer', 'Figma', 'Aesthetics', 'UI Design'],
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            username: 'elenar',
            color: 'from-indigo-500 to-purple-500'
        }
    ]

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
            <section id="showcase" className="py-24 sm:py-32 bg-zinc-950 border-t border-zinc-900 relative">
                <div className="absolute top-[20%] right-[-5%] w-100 h-100 rounded-full bg-purple-900/5 blur-[120px] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-blue-500 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">Community Showcase</h2>
                        <p className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                            Designed by Creators, Inspired by Excellence
                        </p>
                        <p className="text-zinc-400 text-base sm:text-lg mt-4">
                            Take a look at some of the stunning, responsive portfolios generated using DevFolio.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {showcases.map((showcase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group rounded-2xl border border-zinc-900 bg-zinc-900/10 p-6 flex flex-col hover:border-zinc-800 hover:bg-zinc-900/25 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-zinc-800">
                                        <img src={showcase.image} alt={showcase.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors duration-200">{showcase.name}</h3>
                                        <p className="text-zinc-400 text-xs sm:text-sm">{showcase.role}</p>
                                    </div>
                                </div>

                                {/* Link Tag */}
                                <div className="mb-6 py-2 px-3.5 rounded-lg bg-zinc-950 border border-zinc-900 text-xs font-mono text-zinc-400 flex justify-between items-center group-hover:border-zinc-800 transition-colors">
                                    <span>devfolio.com/portfolio/{showcase.username}</span>
                                    <span className="text-blue-500 hover:underline cursor-pointer font-semibold">Visit</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {showcase.skills.map((skill, sIdx) => (
                                        <span key={sIdx} className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto border-t border-zinc-900 pt-4 flex justify-between items-center">
                                    <span className="text-xs text-zinc-500">Theme: Glassmorphism</span>
                                    <div className="flex gap-1">
                                        <span className={`w-3.5 h-3.5 rounded-full bg-linear-to-r ${showcase.color}`} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 sm:py-32 bg-zinc-950 border-t border-zinc-900 relative">
                {/* Background lighting */}
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-linear-to-tr from-blue-600/5 to-indigo-600/5 blur-[120px] pointer-events-none z-0" />
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-3xl border border-zinc-800/60 bg-linear-to-b from-zinc-900/30 to-zinc-950/30 p-8 sm:p-16 backdrop-blur-md shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 text-zinc-800 font-mono text-xs select-none pointer-events-none">
                            {"</> DevFolio"}
                        </div>

                        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                            Ready to Claim Your <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                                Developer Identity?
                            </span>
                        </h2>
                        
                        <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                            Join thousands of developers and designers who build their online presence with DevFolio. Setup is fast, hosting is free, and layout options are premium.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
                            <Link
                                to="/auth/register"
                                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-900/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                            >
                                Start Building for Free
                            </Link>
                            <Link
                                to="/auth/login"
                                className="w-full sm:w-auto text-center px-8 py-4 rounded-xl text-base font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800/60 transition-all duration-200"
                            >
                                Log In to Dashboard
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}

export default Home