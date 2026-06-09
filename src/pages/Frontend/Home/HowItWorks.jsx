import React from 'react'
import { motion } from 'framer-motion'

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Create an Account',
      description: 'Sign up in seconds. All you need is an email and a unique username to claim your portfolio URL.'
    },
    {
      number: '02',
      title: 'Add Projects & Skills',
      description: 'Fill out your profile. Add your experience, skills, and projects with tags, descriptions, and source code links.'
    },
    {
      number: '03',
      title: 'Choose Your Design',
      description: 'Select from our pre-styled, high-performance layout themes that fit your unique personality.'
    },
    {
      number: '04',
      title: 'Share & Go Live',
      description: 'Get your instant, live link at devfolio.com/portfolio/:username and share it on resumes and social channels.'
    }
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const stepVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  }

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-blue-500 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">Simple Setup</h2>
          <p className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            How DevFolio Works
          </p>
          <p className="text-zinc-400 text-base sm:text-lg mt-4">
            Four simple steps to get your portfolio up, running, and ready for recruitment.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-px bg-zinc-800 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="flex flex-col items-center text-center relative z-10 group"
            >
              {/* Step Circle */}
              <div className="w-18 h-18 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center text-xl font-bold text-transparent bg-clip-text bg-linear-to-tr from-blue-400 to-indigo-400 mb-6 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all duration-300">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200">
                {step.title}
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed px-4">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
