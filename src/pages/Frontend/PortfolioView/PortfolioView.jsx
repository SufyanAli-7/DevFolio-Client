import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Mock database for showcase portfolios
const portfoliosDb = {
  sarahj: {
    name: 'Sarah Jenkins',
    role: 'Frontend Architect',
    bio: 'Passionate about building highly interactive, accessible, and performant web interfaces. Specializing in 3D web graphics, design systems, and responsive architectures.',
    about: 'I have over 5 years of experience crafting interfaces for startups and enterprises. I believe in writing clean, self-documenting code and creating experiences that delight users at first glance.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'Web performance', 'A11y'],
    projects: [
      {
        title: '3D Portfolio Canvas',
        description: 'An interactive portfolio website using Three.js and React Three Fiber with custom lighting and orbit controls.',
        tags: ['Three.js', 'React', 'Tailwind'],
        link: '#'
      },
      {
        title: 'Component Library Spec',
        description: 'A dark-mode first design system and component library optimized for enterprise SaaS platforms.',
        tags: ['TypeScript', 'CSS', 'Tailwind'],
        link: '#'
      }
    ],
    email: 'sarah.j@devfolio.com'
  },
  marcusc: {
    name: 'Marcus Chen',
    role: 'Full Stack Engineer',
    bio: 'Back-end lover and database optimizer. Building reliable, distributed backend architectures, custom APIs, and real-time synchronization systems.',
    about: 'Software engineer focusing on building scalable systems. Experienced in cloud operations, relational databases, and real-time communications using WebSockets.',
    skills: ['Next.js', 'Node.js', 'Express', 'PostgreSQL', 'GraphQL', 'Docker', 'Redis', 'WebSockets'],
    projects: [
      {
        title: 'SaaS Real-time Chat',
        description: 'Real-time multi-room messaging system utilizing WebSockets, Redis pub/sub, and PostgreSQL storage.',
        tags: ['Node.js', 'Redis', 'WebSockets'],
        link: '#'
      },
      {
        title: 'Task Sync Engine',
        description: 'Incremental sync API server providing offline-first capabilities to mobile applications.',
        tags: ['GraphQL', 'PostgreSQL', 'Docker'],
        link: '#'
      }
    ],
    email: 'marcus.c@devfolio.com'
  },
  elenar: {
    name: 'Elena Rostova',
    role: 'Product Designer & Dev',
    bio: 'Bridging the gap between conceptual design and frontend execution. Creating gorgeous mockups and translating them into pixel-perfect code.',
    about: 'I design and code. My goal is to ensure that visual branding, typography, and interactive details translate seamlessly into live code templates.',
    skills: ['Framer', 'Figma', 'UI Design', 'Interaction Design', 'CSS Grid', 'Typography', 'Aesthetics'],
    projects: [
      {
        title: 'E-Commerce Branding Kit',
        description: 'Complete visual identity design and high-fidelity Framer prototypes for a design-forward retail brand.',
        tags: ['Figma', 'Framer', 'UI Design'],
        link: '#'
      },
      {
        title: 'DevFolio Theme Spec',
        description: 'Crafted the CSS styling system and variables for the DevFolio theme layouts.',
        tags: ['Aesthetics', 'CSS', 'Tailwind'],
        link: '#'
      }
    ],
    email: 'elena.r@devfolio.com'
  }
}

const PortfolioView = () => {
  const { username } = useParams()
  
  // Find profile in mock db, or fallback to default
  const profile = portfoliosDb[username?.toLowerCase()] || {
    name: username ? username.charAt(0).toUpperCase() + username.slice(1) : 'Developer Profile',
    role: 'Creative Developer',
    bio: 'Welcome to my portfolio! I build websites, solve complex problems, and showcase my development journey here.',
    about: 'This is a custom portfolio page created using DevFolio. To edit this content, log in to your dashboard and update your profile details.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Responsive Design'],
    projects: [
      {
        title: 'Example Project One',
        description: 'A stunning web application showcasing custom interactive sections and responsive interfaces.',
        tags: ['React', 'CSS'],
        link: '#'
      },
      {
        title: 'Example Project Two',
        description: 'An API service providing backend support and database storage.',
        tags: ['Node.js', 'Express'],
        link: '#'
      }
    ],
    email: 'yourname@example.com'
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans">
      {/* Back to Home Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center border-b border-zinc-900">
        <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to DevFolio
        </Link>
        <span className="text-xs text-zinc-500 font-mono">portfolio: {username}</span>
      </div>

      {/* Hero Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-blue-500/10">
            {profile.name.charAt(0)}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{profile.name}</h1>
          <p className="text-blue-400 text-lg font-semibold mb-6">{profile.role}</p>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {profile.bio}
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 border-t border-zinc-900">
        <h2 className="text-2xl font-bold text-white mb-6">About Me</h2>
        <p className="text-zinc-400 leading-relaxed text-base">
          {profile.about}
        </p>
      </section>

      {/* Skills Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 border-t border-zinc-900">
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
      <section className="py-16 max-w-4xl mx-auto px-4 border-t border-zinc-900">
        <h2 className="text-2xl font-bold text-white mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.projects.map((project, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 hover:bg-zinc-900/20 transition-all duration-300 flex flex-col group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 grow">
                {project.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-2">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs text-zinc-500 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1 hover:underline"
                >
                  View Code
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 border-t border-zinc-900 mb-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Get In Touch</h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto text-sm sm:text-base">
          Interested in working together or hiring me? Drop an email and let's start a conversation.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Email Me At {profile.email}
        </a>
      </section>

      {/* Mini Branding Footer */}
      <div className="py-8 text-center border-t border-zinc-900 text-xs text-zinc-600">
        Created using <Link to="/" className="text-zinc-500 hover:underline">DevFolio</Link> Portfolio Builder.
      </div>
    </div>
  )
}

export default PortfolioView
