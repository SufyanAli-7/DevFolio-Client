import React from 'react'
import { motion } from 'framer-motion'

const Features = () => {
  const featuresList = [
    {
      title: 'No-Code Portfolio Builder',
      description: 'Create a professional portfolio by simply filling out your profile details, skills, projects, and social links no coding required.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: 'Professional Profile',
      description: 'Manage your personal information, profile image, professional role, and bio from a centralized dashboard.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      title: 'Advanced Project Manager',
      description: 'Add, update, and organize your projects with descriptions, technologies, images, and repository links.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: 'Dynamic Skills Management',
      description: 'Showcase your technical expertise by managing skills, frameworks, tools, and technologies in one place.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Portfolio Preview',
      description: 'Preview your portfolio instantly and see how visitors will experience your professional profile for employers.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: 'Social & Contact Integration',
      description: 'Connect your GitHub, LinkedIn, email, and other professional links to make networking effortless for employers.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
        </svg>
      )
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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 12 }
    }
  }

  return (
    <section id="features" className="py-24 sm:py-32 bg-zinc-950 border-t border-zinc-900 relative">
      {/* Subtle Glow Background */}
      <div className="absolute top-[30%] right-[10%] w-87.5 h-87.5 rounded-full bg-blue-900/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-87.5 h-87.5 rounded-full bg-indigo-900/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-blue-500 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">Powering Your Career</h2>
          <p className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Everything You Need to Showcase Your Talent
          </p>
          <p className="text-zinc-400 text-base sm:text-lg mt-4">
            DevFolio provides the tools to build, manage, and host a professional portfolio that sets you apart from the crowd.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="p-8 rounded-2xl border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-800 transition-all duration-300 flex flex-col group relative overflow-hidden"
            >
              {/* Top gradient border reveal on hover */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-800 group-hover:border-zinc-700 group-hover:bg-zinc-800/50 transition-colors duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200">
                {feature.title}
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed grow">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features
