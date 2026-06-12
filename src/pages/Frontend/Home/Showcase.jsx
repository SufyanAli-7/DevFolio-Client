import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Showcase = () => {
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
        <section id="showcase" className="py-24 sm:py-32 bg-zinc-950 border-t border-zinc-900 relative">
            <div className="absolute top-[20%] right-[-5%] w-100 h-100 rounded-full bg-purple-900/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-blue-500 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">PORTFOLIO PREVIEW</h2>
                    <p className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                        Professional Portfolio Examples
                    </p>
                    <p className="text-zinc-400 text-base sm:text-lg mt-4">
                        Explore sample portfolios built with DevFolio and discover how your professional profile can look.
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
                                <span>{import.meta.env.VITE_PORTFOLIO_URL}{showcase.username}</span>
                                <span className="text-blue-500 hover:underline cursor-pointer font-semibold"><Link to={"https://" + import.meta.env.VITE_PORTFOLIO_URL + showcase.username} target='_blank'>View</Link></span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {showcase.skills.map((skill, sIdx) => (
                                    <span key={sIdx} className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto border-t border-zinc-900 pt-4 flex justify-between items-center">
                                <span className="text-xs text-zinc-500">Portfolio Preview</span>
                                <div className="flex gap-1">
                                    <span className={`w-3.5 h-3.5 rounded-full bg-linear-to-r ${showcase.color}`} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Showcase