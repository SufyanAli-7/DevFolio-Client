import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const glowVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.6 }
    }
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-zinc-950">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center"
      >
        {/* Eyebrow Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-md text-zinc-300 text-xs sm:text-sm font-medium mb-8 cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-zinc-400">✨ Claim your custom URL</span>
          <span className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold ml-1">
            portfolio/:username
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl leading-[1.15]"
        >
          Your Professional Story,{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
            Beautifully Crafted
          </span>{' '}
          in Minutes.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed"
        >
          Showcase your skills, experience, and projects on a premium portfolio site. DevFolio lets you manage your data through a simple dashboard and deploy instantly.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto"
        >
          <Link
            to="/auth/register"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-900/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] border border-blue-400/20"
          >
            Create Your Portfolio
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-xl text-base font-semibold text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-200"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div
          variants={glowVariants}
          className="relative w-full max-w-4xl px-4 sm:px-0"
        >
          {/* Neon Glow Behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full bg-linear-to-tr from-blue-600/10 to-indigo-600/10 blur-[80px] z-0 pointer-events-none" />

          {/* Browser Window Frame */}
          <div className="relative z-10 rounded-2xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-md p-1.5 sm:p-2.5 shadow-2xl shadow-black/80 group">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-800/50 bg-zinc-950/40 rounded-t-xl">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 text-xs font-mono text-zinc-500 tracking-wider">devfolio.com/dashboard</span>
            </div>
            <div className="overflow-hidden rounded-b-xl bg-zinc-950/90 aspect-16/10">
              <img
                src="/dashboard_mockup.png"
                alt="DevFolio Dashboard Mockup"
                className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-700"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero