import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Page404 = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden px-4 text-center text-zinc-100">
      {/* Background Glow Spots */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg flex flex-col items-center"
      >
        {/* Giant Glowing 404 Badge */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8 flex justify-center items-center"
        >
          <div className="absolute w-64 h-64 rounded-full bg-blue-600/10 blur-[80px] z-0 pointer-events-none animate-pulse" />
          <h1 className="relative z-10 text-[8rem] sm:text-[10rem] font-extrabold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-500 to-purple-500 select-none">
            404
          </h1>
        </motion.div>

        {/* Text Details */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight"
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-zinc-400 text-sm sm:text-base mb-10 max-w-md leading-relaxed"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            to="/"
            className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-900/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            Take Me Home
          </Link>
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-200"
          >
            Go Back
          </button>
        </motion.div>

        {/* Support Link */}
        <motion.p
          variants={itemVariants}
          className="mt-10 text-xs text-zinc-500"
        >
          If you believe this is an error, please{' '}
          <a href="mailto:support@devfolio.com" className="text-zinc-400 hover:text-white underline transition-colors">
            contact support
          </a>
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Page404