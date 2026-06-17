import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, theme, Form, Input, Button } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'

const ForgotPassword = () => {    
    const { backendUrl } = useAuth()
    const navigate = useNavigate()    

    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [isEmailSent, setIsEmailSent] = useState(false)
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleOtpChange = (value) => {
        setOtp(value)
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    const handleSubmitEmail = (values) => {
        setIsLoading(true)
        axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email: values.email })
            .then(res => {
                const { success, message } = res.data
                if (success) {
                    setIsEmailSent(true)
                    window.toastify(message, 'success')
                }
            })
            .catch(err => {
                window.toastify(err.response?.data?.message || 'Failed to send OTP', 'error')
            })
            .finally(() => {
                setIsLoading(false)
            })   
    }

    const handleSubmitOtp = () => {
        if (!otp || otp.length < 6) {
            window.toastify('Please enter the 6-digit OTP code', 'error')
            return
        }
        setIsLoading(true)
        setTimeout(() => {
            setIsOtpSubmitted(true)
            setIsLoading(false)
        }, 1000)
    }

    const handleSubmitNewPassword = (values) => {
        setIsLoading(true)
        axios.post(`${backendUrl}/api/auth/reset-password`, { 
            email, 
            otp, 
            newPassword: values.newPassword 
        })
            .then(res => {
                const { success, message } = res.data
                if (success) {
                    window.toastify(message, 'success')
                    navigate('/auth/login')
                }
            })
            .catch(err => {
                window.toastify(err.response?.data?.message || 'Failed to reset password', 'error')
            })
            .finally(() => {
                setIsLoading(false)
            })
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
                <Link to="/auth/login" className="absolute top-6 left-6 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Login
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
                        
                        <AnimatePresence mode="wait">
                            {!isEmailSent && (
                                <motion.div
                                    key="step1-header"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Forgot Password</h2>
                                    <p className="text-zinc-400 text-sm mt-2">Enter your registered email address to receive an OTP</p>
                                </motion.div>
                            )}

                            {!isOtpSubmitted && isEmailSent && (
                                <motion.div
                                    key="step2-header"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Reset Password OTP</h2>
                                    <p className="text-zinc-400 text-sm mt-2">Enter the 6-digit code sent to your email</p>
                                </motion.div>
                            )}

                            {isOtpSubmitted && isEmailSent && (
                                <motion.div
                                    key="step3-header"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">New Password</h2>
                                    <p className="text-zinc-400 text-sm mt-2">Enter your new secure password below</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* Step 1: Send OTP to Email */}
                        {!isEmailSent && (
                            <motion.div
                                key="step1-form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Form
                                    layout="vertical"
                                    requiredMark={false}
                                    onFinish={handleSubmitEmail}
                                    className="space-y-4"
                                >
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
                                            value={email}
                                            onChange={handleEmailChange}
                                            className="bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 hover:border-zinc-700 focus:border-blue-500 h-10 px-3 rounded-lg"
                                        />
                                    </Form.Item>

                                    <Form.Item className="mb-0">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={isLoading}
                                            className="w-full h-11 bg-blue-600 hover:bg-blue-500 border-none text-white font-semibold rounded-lg shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
                                        >
                                            Send OTP
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div className="text-center mt-6 text-zinc-400 text-sm">
                                    Remember Password?{' '}
                                    <Link to="/auth/login" className="text-blue-400 hover:underline font-semibold">
                                        Login here
                                    </Link>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Input OTP */}
                        {!isOtpSubmitted && isEmailSent && (
                            <motion.div
                                key="step2-form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Form
                                    layout="vertical"
                                    requiredMark={false}
                                    onFinish={handleSubmitOtp}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-center py-2">
                                        <Input.OTP
                                            length={6}
                                            value={otp}
                                            onChange={handleOtpChange}
                                            size="large"
                                        />
                                    </div>

                                    <Form.Item className="mb-0">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={isLoading}
                                            className="w-full h-11 bg-blue-600 hover:bg-blue-500 border-none text-white font-semibold rounded-lg shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
                                        >
                                            Verify OTP
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <div className="text-center mt-6 text-zinc-400 text-sm">
                                    Did not get code?{' '}
                                    <button 
                                        type="button"
                                        onClick={() => handleSubmitEmail({ email })}
                                        disabled={isLoading}
                                        className="text-blue-400 hover:underline font-medium bg-transparent border-none p-0 cursor-pointer disabled:opacity-50"
                                    >
                                        Resend Code
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Input New Password */}
                        {isOtpSubmitted && isEmailSent && (
                            <motion.div
                                key="step3-form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Form
                                    layout="vertical"
                                    requiredMark={false}
                                    onFinish={handleSubmitNewPassword}
                                    className="space-y-4"
                                >
                                    <Form.Item
                                        label={<span className="text-zinc-300 text-sm">New Password</span>}
                                        name="newPassword"
                                        rules={[
                                            { required: true, message: 'Please input your new password!' },
                                            { min: 6, message: 'Password must be at least 6 characters!' }
                                        ]}
                                    >
                                        <Input.Password
                                            placeholder="••••••••"
                                            value={newPassword}
                                            onChange={handleNewPasswordChange}
                                            className="bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 hover:border-zinc-700 focus:border-blue-500 h-10 px-3 rounded-lg"
                                        />
                                    </Form.Item>

                                    <Form.Item className="mb-0">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={isLoading}
                                            className="w-full h-11 bg-blue-600 hover:bg-blue-500 border-none text-white font-semibold rounded-lg shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
                                        >
                                            Reset Password
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </ConfigProvider>
    )
}

export default ForgotPassword