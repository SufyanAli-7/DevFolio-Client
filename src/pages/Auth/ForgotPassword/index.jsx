import { useAuth } from '@/context/AuthContext'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const { Title, Paragraph } = Typography
const { Item } = Form

const ForgotPassword = () => {    
    const { backendUrl } = useAuth()
    const navigate = useNavigate()    

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
   

    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleOtpChange = (value) => {
        setOtp(value);
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    
    const handleSubmitEmail = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email })
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
    
    
    const handleSubmitOtp = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        setTimeout(() => {
            setIsOtpSubmitted(true)
            setIsLoading(false)
        }, 1000)
    }



    const handleSubmitNewPassword = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post(`${backendUrl}/api/auth/reset-password`, { email, otp, newPassword })
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
        <>
            {/* Enter Email id */}
            {!isEmailSent && 
            <div className='flex justify-center items-center bg-indigo-500 min-h-screen px-4'>
                <div className='p-4 md:px-6 rounded-lg bg-white w-full max-w-md py-5 shadow-lg'>
                    <Title className='text-center' level={1}>Forgot Password</Title>
                    <Paragraph className='text-center'>Enter your registered email address</Paragraph>
                    <Form layout='vertical'>
                        <Row>
                            <Col span={24}>
                                <Item label='Email' required>
                                    <Input placeholder='Enter your email' size='large' name='email' value={email} onChange={handleEmailChange} />
                                </Item>
                            </Col>
                            <Paragraph>Remember Password? <Link to='/auth/login'>Login here</Link></Paragraph>
                            <Col span={24}>
                                <Button type='primary' size='large' htmlType='submit' loading={isLoading} onClick={handleSubmitEmail} block>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div> 
            }

            {/* Enter OTP  */}

            {!isOtpSubmitted && isEmailSent &&
            <div className='flex justify-center items-center bg-indigo-500 min-h-screen px-4'>
                <div className='p-4 md:p-8 rounded-lg bg-white w-full max-w-md py-5 shadow-lg'>
                    <Title className='text-center' level={1}>Reset Password OTP</Title>
                    <Paragraph className='text-center'>Enter the 6-digit code sent to your email id.</Paragraph>
                    <Form layout='vertical'>
                        <Row>
                            <Col span={24} className='mt-4'>
                                <Input.OTP size='large' value={otp} onChange={handleOtpChange} />
                            </Col>
                            <Col span={24}>
                                <Button type='primary' className='mt-6' block size='large' htmlType='submit' loading={isLoading} onClick={handleSubmitOtp}> 
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            }
            {/* Enter New Password */}
            {isOtpSubmitted && isEmailSent &&
            <div className='flex justify-center items-center bg-indigo-500 min-h-screen px-4'>
                <div className='p-4 md:px-6 rounded-lg bg-white w-full max-w-md py-5 shadow-lg'>
                    <Title className='text-center' level={1}>New password</Title>
                    <Paragraph className='text-center'>Enter the new password below</Paragraph>
                    <Form layout='vertical' >
                        <Row>
                            <Col span={24}>
                                <Item label='New Password' required>
                                    <Input.Password placeholder='Enter new password' size='large' name='newPassword' value={newPassword} onChange={handleNewPasswordChange} />
                                </Item>
                            </Col>
                            <Col span={24}>
                                <Button type='primary' size='large' htmlType='submit' block loading={isLoading} onClick={handleSubmitNewPassword}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            }

        </>
    )
}

export default ForgotPassword