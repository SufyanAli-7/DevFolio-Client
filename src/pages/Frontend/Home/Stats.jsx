import React from 'react'
import { motion } from 'framer-motion'

const Stats = () => {
  const statsList = [
    {
      value: '10,000+',
      label: 'Portfolios Created',
      description: 'Active developers sharing their work globally.'
    },
    {
      value: '500,000+',
      label: 'Project Views',
      description: 'Recruiters and teams discovering talent.'
    },
    {
      value: '99.9%',
      label: 'Server Uptime',
      description: 'Reliable, instant hosting for portfolios.'
    },
    {
      value: '4.9/5',
      label: 'Developer Rating',
      description: 'Voted by freelancers, students, and engineers.'
    }
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const statVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="stats" className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {statsList.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900/10 border border-zinc-900/60 hover:bg-zinc-900/20 hover:border-zinc-800 transition-all duration-300"
            >
              <span className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-sm sm:text-base font-semibold text-white mb-1">
                {stat.label}
              </span>
              <span className="text-zinc-500 text-xs sm:text-sm">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
