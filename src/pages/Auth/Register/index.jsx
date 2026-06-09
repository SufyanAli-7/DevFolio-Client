import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, theme, Form, Input, Button, Checkbox, message } from 'antd'
import { motion } from 'framer-motion'

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    setLoading(true)
    message.loading({ content: 'Creating your account...', key: 'register' })

    // Simulate API registration call
    setTimeout(() => {
      message.success({ content: 'Registration successful! Welcome to DevFolio.', key: 'register', duration: 2 })
      setLoading(false)
      // Save mock state to local storage
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify({ username: values.username, email: values.email }))
      // Redirect to login page or dashboard
      navigate('/auth/login')
    }, 1500)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Validation Failed:', errorInfo)
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#2563eb', // blue-600
          colorBgContainer: '#09090b', // zinc-950
          borderRadius: 8,
          colorBorder: '#27272a', // zinc-800
        },
      }}
    >
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
        {/* Glow Spots */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />

        {/* Back Link */}
        <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm z-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to DevFolio
        </Link>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md bg-zinc-900/30 border border-zinc-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10"
        >
          {/* Brand Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 group mb-3">
              <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Dev<span className="text-blue-400">Folio</span>
              </span>
            </Link>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Create an account</h2>
            <p className="text-zinc-400 text-sm mt-2">Start building your developer presence today</p>
          </div>

          <Form
            name="register"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
            className="space-y-4"
          >
            {/* Username */}
            <Form.Item
              label={<span className="text-zinc-300 text-sm">Username</span>}
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain alphanumeric characters and underscores.' },
                { min: 3, message: 'Username must be at least 3 characters.' }
              ]}
            >
              <Input 
                placeholder="john_doe" 
                className="bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 hover:border-zinc-700 focus:border-blue-500 h-10 px-3 rounded-lg"
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label={<span className="text-zinc-300 text-sm">Email Address</span>}
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email address!' }
              ]}
            >
              <Input 
                placeholder="you@example.com" 
                className="bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 hover:border-zinc-700 focus:border-blue-500 h-10 px-3 rounded-lg"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label={<span className="text-zinc-300 text-sm">Password</span>}
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password 
                placeholder="••••••••" 
                className="bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 hover:border-zinc-700 focus:border-blue-500 h-10 px-3 rounded-lg"
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              label={<span className="text-zinc-300 text-sm">Confirm Password</span>}
              name="confirm"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                (({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                })),
              ]}
            >
              <Input.Password 
                placeholder="••••••••" 
                className="bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 hover:border-zinc-700 focus:border-blue-500 h-10 px-3 rounded-lg"
              />
            </Form.Item>

            {/* Terms and conditions */}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must accept the agreement!')) },
              ]}
            >
              <Checkbox className="text-zinc-400 text-xs">
                I agree to the{' '}
                <a href="#" className="text-blue-400 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:underline">
                  Privacy Policy
                </a>.
              </Checkbox>
            </Form.Item>

            {/* Submit */}
            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-500 border-none text-white font-semibold rounded-lg shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          {/* Switch link */}
          <div className="text-center mt-6 text-zinc-400 text-sm">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-blue-400 hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </ConfigProvider>
  )
}

export default Register