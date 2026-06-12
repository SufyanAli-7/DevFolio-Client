import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'

const CTA = () => {
    const { isAuth } = useAuth()
    return (
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
                        Ready to Build Your <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                            Professional Portfolio?
                        </span>
                    </h2>

                    <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Create, manage, and showcase your professional profile through a simple and powerful portfolio management platform.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
                        <Link
                            to={isAuth ? "/dashboard" : "/auth/register"}
                            className="w-full sm:w-auto text-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-900/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                        >
                            Start Building for Free
                        </Link>
                        <Link
                            to={isAuth ? "/dashboard" : "/auth/login"}
                            className="w-full sm:w-auto text-center px-8 py-4 rounded-xl text-base font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800/60 transition-all duration-200"
                        >
                            {isAuth ? "Go to Dashboard" : "Log In to Dashboard"}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTA