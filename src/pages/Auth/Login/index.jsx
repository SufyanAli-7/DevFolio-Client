import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, theme, Form, Input, Button, Checkbox, message } from 'antd'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { backendUrl, readProfile } = useAuth()

  const onFinish = (values) => {
    setLoading(true)
    message.loading({ content: 'Signing you in...', key: 'login' })

    axios.post(`${backendUrl}/api/auth/login`, {
      email: values.email,
      password: values.password
    }, { withCredentials: true })
      .then((res) => {
        const { success, message: msg } = res.data
        if (success) {
          readProfile()
          message.success({ content: msg || 'Welcome back to DevFolio!', key: 'login', duration: 2 })
          
        }
      })
      .catch((err) => {
        const errMsg = err.response?.data?.message || 'Invalid email or password'
        message.error({ content: errMsg, key: 'login', duration: 3 })
      })
      .finally(() => {
        setLoading(false)
      })
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Welcome back</h2>
            <p className="text-zinc-400 text-sm mt-2">Sign in to manage your portfolio dashboard</p>
          </div>

          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
            className="space-y-4"
          >
            {/* Email Address */}
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
              label={
                <div className="flex justify-between w-full items-center">
                  <span className="text-zinc-300 text-sm">Password</span>
                  <a href="#" className="text-xs text-blue-400 hover:underline">Forgot?</a>
                </div>
              }
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password 
                placeholder="••••••••" 
                className="bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 hover:border-zinc-700 focus:border-blue-500 h-10 px-3 rounded-lg"
              />
            </Form.Item>

            {/* Remember Me */}
            <Form.Item
              name="remember"
              valuePropName="checked"
              className="mb-2"
            >
              <Checkbox className="text-zinc-400 text-xs">Remember me</Checkbox>
            </Form.Item>

            {/* Submit */}
            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-500 border-none text-white font-semibold rounded-lg shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Switch link */}
          <div className="text-center mt-6 text-zinc-400 text-sm">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-blue-400 hover:underline font-medium">
              Register Free
            </Link>
          </div>
        </motion.div>
      </div>
    </ConfigProvider>
  )
}

export default Login