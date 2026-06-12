import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ConfigProvider, theme, Dropdown, Avatar } from 'antd'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuth, user, handleLogout, backendUrl } = useAuth()
  const [portfolio, setPortfolio] = useState(null)

  useEffect(() => {
    if (isAuth) {
      axios.get(`${backendUrl}/api/portfolio/me`, { withCredentials: true })
        .then(res => {
          if (res.data.success && res.data.portfolio) {
            setPortfolio(res.data.portfolio);
          }
        })
        .catch(err => {
          setPortfolio(null);
        });
    } else {
      setPortfolio(null);
    }
  }, [isAuth, backendUrl]);

  const resolveImage = (path) => {
    if (!path) {
      return "https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png";
    }
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path;
    }
    if (path === "/temp/default-avatar.png") {
      return "https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png";
    }
    return `${backendUrl}${path}`;
  };

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Stats', href: '#stats' },
    { name: 'Showcase', href: '#showcase' },
  ]

  const dropdownItems = [
    {
      key: 'profile',
      label: (
        <div className="px-3 py-2 flex flex-col min-w-37.5 select-none">
          <span className="font-semibold text-white text-sm">{user?.userName?.charAt(0)?.toUpperCase() + user?.userName?.slice(1) || 'User'}</span>
          <span className="text-zinc-500 text-xs mt-0.5">{user?.email}</span>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'dashboard',
      label: <Link to="/dashboard" className="text-sm">Dashboard</Link>,
    },
    {
      key: 'logout',
      label: <span className="text-red-500 text-sm font-medium">Log Out</span>,
      onClick: handleLogout
    }
  ]

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#2563eb', // blue-600
          colorBgContainer: '#18181b', // zinc-900
          colorBgElevated: '#18181b', // zinc-900 dropdown popup
          borderRadius: 8,
          colorBorder: '#27272a', // zinc-800
        },
      }}
    >
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 rounded-lg bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300">
              Dev<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Folio</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuth ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-zinc-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Dropdown
                  menu={{ items: dropdownItems }}
                  trigger={['hover']}
                  placement="bottomRight"
                  overlayClassName="border border-zinc-800/80 rounded-lg shadow-2xl"
                >
                  <Avatar 
                    size="large" 
                    src={resolveImage(portfolio?.image)} 
                    className="cursor-pointer border border-blue-500/40 hover:border-blue-500 transition-colors bg-blue-600 shadow-md shadow-blue-600/10 font-bold"
                  >
                    {user?.userName?.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                </Dropdown>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-sm font-medium text-zinc-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-lg shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 transition-all duration-200 border border-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Create Portfolio
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-zinc-900 bg-zinc-950/95 backdrop-blur-xl transition-all duration-300 ease-in-out" id="mobile-menu">
            <div className="px-2 pt-4 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-4 border-t border-zinc-900 px-5 flex flex-col gap-3">
              {isAuth ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    <Avatar 
                      src={resolveImage(portfolio?.image)}
                      className="font-bold border border-blue-500/40 bg-blue-600"
                    >
                      {user?.userName?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{user?.userName.charAt(0).toUpperCase() + user?.userName.slice(1)}</span>
                      <span className="text-zinc-500 text-xs">{user?.email}</span>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2.5 rounded-lg text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/50 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      handleLogout()
                    }}
                    className="w-full text-center py-2.5 rounded-lg text-base font-medium text-red-500 hover:text-red-400 hover:bg-red-500/5 transition-colors border border-red-500/20"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2.5 rounded-lg text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/50 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2.5 rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/10 transition-colors duration-200"
                  >
                    Create Portfolio
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </ConfigProvider>
  )
}

export default Navbar