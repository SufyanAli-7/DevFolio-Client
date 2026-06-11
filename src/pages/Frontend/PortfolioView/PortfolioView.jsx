import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'

// Mock database for showcase portfolios
const portfoliosDb = {
  sarahj: {
    name: 'Sarah Jenkins',
    role: 'Frontend Architect',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Passionate about building highly interactive, accessible, and performant web interfaces. Specializing in 3D web graphics, design systems, and responsive architectures.',
    about: 'I have over 5 years of experience crafting interfaces for startups and enterprises. I believe in writing clean, self-documenting code and creating experiences that delight users at first glance.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'Web performance', 'A11y'],
    projects: [
      {
        title: '3D Portfolio Canvas',
        description: 'An interactive portfolio website using Three.js and React Three Fiber with custom lighting and orbit controls.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
        tags: ['Three.js', 'React', 'Tailwind'],
        codeLink: '#',
        liveLink: '#'
      },
      {
        title: 'Component Library Spec',
        description: 'A dark-mode first design system and component library optimized for enterprise SaaS platforms.',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
        tags: ['TypeScript', 'CSS', 'Tailwind'],
        codeLink: '#',
        liveLink: '#'
      }
    ],
    email: 'sarah.j@devfolio.com',
    github: 'https://github.com/sarahj',
    linkedin: 'https://linkedin.com/in/sarahj',
    whatsapp: 'https://wa.me/1234567890'
  },
  marcusc: {
    name: 'Marcus Chen',
    role: 'Full Stack Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Back-end lover and database optimizer. Building reliable, distributed backend architectures, custom APIs, and real-time synchronization systems.',
    about: 'Software engineer focusing on building scalable systems. Experienced in cloud operations, relational databases, and real-time communications using WebSockets.',
    skills: ['Next.js', 'Node.js', 'Express', 'PostgreSQL', 'GraphQL', 'Docker', 'Redis', 'WebSockets'],
    projects: [
      {
        title: 'SaaS Real-time Chat',
        description: 'Real-time multi-room messaging system utilizing WebSockets, Redis pub/sub, and PostgreSQL storage.',
        image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=600&q=80',
        tags: ['Node.js', 'Redis', 'WebSockets'],
        codeLink: '#',
        liveLink: '#'
      },
      {
        title: 'Task Sync Engine',
        description: 'Incremental sync API server providing offline-first capabilities to mobile applications.',
        image: 'https://images.unsplash.com/photo-1484417894907-623942c8ea29?auto=format&fit=crop&w=600&q=80',
        tags: ['GraphQL', 'PostgreSQL', 'Docker'],
        codeLink: '#',
        liveLink: '#'
      }
    ],
    email: 'marcus.c@devfolio.com',
    github: 'https://github.com/marcusc',
    linkedin: 'https://linkedin.com/in/marcusc',
    whatsapp: 'https://wa.me/1234567890'
  },
  elenar: {
    name: 'Elena Rostova',
    role: 'Product Designer & Dev',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Bridging the gap between conceptual design and frontend execution. Creating gorgeous mockups and translating them into pixel-perfect code.',
    about: 'I design and code. My goal is to ensure that visual branding, typography, and interactive details translate seamlessly into live code templates.',
    skills: ['Framer', 'Figma', 'UI Design', 'Interaction Design', 'CSS Grid', 'Typography', 'Aesthetics'],
    projects: [
      {
        title: 'E-Commerce Branding Kit',
        description: 'Complete visual identity design and high-fidelity Framer prototypes for a design-forward retail brand.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        tags: ['Figma', 'Framer', 'UI Design'],
        codeLink: '#',
        liveLink: '#'
      },
      {
        title: 'DevFolio Theme Spec',
        description: 'Crafted the CSS styling system and variables for the DevFolio theme layouts.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
        tags: ['Aesthetics', 'CSS', 'Tailwind'],
        codeLink: '#',
        liveLink: '#'
      }
    ],
    email: 'elena.r@devfolio.com',
    github: 'https://github.com/elenar',
    linkedin: 'https://linkedin.com/in/elenar',
    whatsapp: 'https://wa.me/1234567890'
  }
}

const PortfolioView = () => {
  const { username } = useParams()
  const { backendUrl } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`${backendUrl}/api/portfolio/username/${username}`)
      .then(res => {
        if (res.data.success && res.data.portfolio) {
          setProfile(res.data.portfolio)
          setError(false)
        }
      })
      .catch(err => {
        // Fallback to mock DB if username is mock
        const mockProfile = portfoliosDb[username?.toLowerCase()]
        if (mockProfile) {
          setProfile(mockProfile)
          setError(false)
        } else {
          setError(true)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [username, backendUrl])

  const resolveImage = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path;
    }
    return `${backendUrl}${path}`;
  };

  if (loading) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center relative">
        {/* Dark Grid Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "#09090b",
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px, 24px 24px",
            backgroundPosition: "0 0, 0 0",
          }}
        />
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#2563eb' }} spin />} className="relative z-10" />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="bg-zinc-950 min-h-screen flex flex-col items-center justify-center p-4 relative">
        {/* Dark Grid Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "#09090b",
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px, 24px 24px",
            backgroundPosition: "0 0, 0 0",
          }}
        />
        <div className="relative z-10 max-w-md w-full text-center bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Portfolio Not Found</h2>
          <p className="text-zinc-400 mb-8">
            The developer portfolio you are looking for does not exist or has not been initialized yet.
          </p>
          <Link 
            to="/" 
            className="inline-block w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans relative">
      {/* Dark Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "#09090b",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 24px 24px",
          backgroundPosition: "0 0, 0 0",
        }}
      />

      {/* Back to Home Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center border-b border-zinc-900/60 relative z-10">
        <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to DevFolio
        </Link>
        <span className="text-xs text-zinc-500 font-mono">portfolio: {username}</span>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-zinc-900/60 z-10">
        {/* Animated Background Gradients overlaying the dots */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div 
            animate={{
              scale: [1, 1.15, 1],
              x: [0, 40, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/6 left-1/4 -translate-x-1/2 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px]"
          />
          <motion.div 
            animate={{
              scale: [1.15, 1, 1.15],
              x: [0, -40, 0],
              y: [0, 20, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/6 right-1/4 translate-x-1/2 w-80 h-80 rounded-full bg-indigo-500/10 blur-[100px]"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
          >
            {/* Profile Avatar / Image */}
            <div className="w-28 h-28 rounded-full bg-zinc-900 mx-auto mb-6 flex items-center justify-center p-1 border border-zinc-800 shadow-2xl shadow-blue-500/10 relative overflow-hidden group">
              <div className="absolute inset-0 rounded-full bg-linear-to-tr from-blue-500 to-indigo-500 opacity-20 group-hover:opacity-45 transition-opacity duration-300" />
              {profile.image ? (
                <img 
                  src={resolveImage(profile.image)} 
                  alt={profile.name} 
                  className="w-full h-full object-cover rounded-full z-10 group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="w-full h-full bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white rounded-full z-10">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">{profile.name}</h1>
            <p className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400 text-lg sm:text-xl font-semibold mb-6 tracking-wide">
              {profile.role}
            </p>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {profile.bio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 border-t border-zinc-900 relative z-10">
        <h2 className="text-2xl font-bold text-white mb-6">About Me</h2>
        <p className="text-zinc-400 leading-relaxed text-base">
          {profile.about}
        </p>
      </section>

      {/* Skills Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 border-t border-zinc-900 relative z-10">
        <h2 className="text-2xl font-bold text-white mb-6">Skills & Technologies</h2>
        <div className="flex flex-wrap gap-3">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 border-t border-zinc-900 relative z-10">
        <h2 className="text-2xl font-bold text-white mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.projects.map((project, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-zinc-800/85 bg-zinc-950 hover:border-zinc-700/80 transition-all duration-300 flex flex-col group shadow-2xl shadow-black/80 hover:shadow-blue-950/10 hover:-translate-y-1"
            >
              {/* Project Card Image */}
              <div className="w-full h-48 overflow-hidden bg-zinc-950 border-b border-zinc-900 relative">
                <img 
                  src={resolveImage(project.image) || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 flex flex-col grow">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs text-zinc-500 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
                {/* Links */}
                <div className="flex items-center gap-4 mt-auto border-t border-zinc-900/60 pt-4">
                  <a
                    href={project.codeLink || '#'}
                    className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Code
                  </a>
                  <a
                    href={project.liveLink || '#'}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 border-t border-zinc-900/60 mb-20 text-center relative z-10">
        <div className="w-full max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 mb-6 leading-tight">
            Connect <span className="text-white">With Me</span>
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            Interested in working together or hiring me? Join my network or drop me a message!
          </p>
        </div>
        
        <div className="relative w-full max-w-2xl mx-auto">
          {/* 3D Glowing Container */}
          <div 
            className="rounded-3xl bg-zinc-900/80 border border-zinc-800/80 shadow-2xl backdrop-blur-3xl overflow-hidden p-8 transition-all duration-500 hover:scale-105 flex flex-wrap justify-center gap-8 sm:gap-12"
            style={{
              boxShadow: '0 0 50px rgba(37, 99, 235, 0.35), 0 0 80px rgba(99, 102, 241, 0.15)'
            }}
          >
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="social-icon mail">
                <div className="icon-container">
                  <svg className="h-8 w-8 text-white transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="icon-label">Email</span>
              </a>
            )}

            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-icon github">
                <div className="icon-container">
                  <svg className="h-8 w-8 text-white transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="icon-label">GitHub</span>
              </a>
            )}

            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                <div className="icon-container">
                  <svg className="h-8 w-8 text-white transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="icon-label">LinkedIn</span>
              </a>
            )}

            {profile.whatsapp && (
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                <div className="icon-container">
                  <svg className="h-8 w-8 text-white transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.48 4.907 1.481 5.482 0 9.94-4.407 9.944-9.813.002-2.62-1.018-5.086-2.87-6.941C16.822 1.93 14.364.912 11.753.912c-5.476 0-9.93 4.406-9.933 9.813-.001 1.95.518 3.858 1.5 5.568L2.292 20.8l4.355-1.646zm11.722-6.52c-.328-.164-1.94-.958-2.241-1.07-.301-.11-.52-.164-.738.164-.219.328-.848 1.07-1.039 1.29-.19.22-.382.246-.71.082-.328-.164-1.386-.51-2.64-1.627-.977-.872-1.637-1.95-1.828-2.278-.19-.328-.02-.505.143-.668.148-.147.328-.382.493-.574.164-.19.219-.328.328-.547.11-.219.055-.41-.027-.574-.082-.164-.738-1.78-.984-2.383-.247-.602-.519-.503-.738-.503-.19-.001-.41-.001-.63-.001-.219 0-.575.083-.876.41-.301.328-1.149 1.122-1.149 2.733 0 1.61 1.175 3.167 1.339 3.387.164.22 2.312 3.53 5.597 4.95.782.338 1.392.54 1.868.69.787.25 1.503.214 2.069.13.63-.094 1.94-.793 2.214-1.56.274-.766.274-1.422.192-1.56-.083-.137-.301-.219-.63-.383z" />
                  </svg>
                </div>
                <span className="icon-label">WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Mini Branding Footer */}
      <div className="py-8 text-center border-t border-zinc-900 text-xs text-zinc-600 relative z-10">
        Created using <Link to="/" className="text-zinc-500 hover:underline">DevFolio</Link> Portfolio Builder.
      </div>
    </div>
  )
}

export default PortfolioView
