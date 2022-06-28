import { Box, Typography, TextField, Alert, Button, Paper } from '@mui/material'
import { useState } from 'react'
import { useLoginUserMutation, useVerifyOTPMutation } from '../services/OTPAuthApi'

const Login = () => {
  const [authid, setAuthId] = useState(null)
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  // RTK Query
  const [loginUser] = useLoginUserMutation()
  const [verifyOTP] = useVerifyOTPMutation()

  const handleSendOTPForm = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const actualData = {
      phonenumber: data.get('phonenumber'),
    }
    if (actualData.phonenumber) {
      const res = await loginUser(actualData)
      if (res.data.status === "success") {
        setAuthId(res.data.id)
        document.getElementById("login-form").reset()
        setError({ status: true, msg: res.data.message, type: 'success' })
      }
      if (res.data.status === "failed") {
        setError({ status: true, msg: res.data.message, type: 'error' })
      }
    } else {
      setError({ status: true, msg: "Enter Valid Number", type: 'error' })
    }
  }

  const handleVerifyOTPForm = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const actualData = {
      otpcode: data.get('otpcode'),
      id: authid
    }
    if (actualData.otpcode && actualData.id) {
      const res = await verifyOTP(actualData)
      if (res.data.status === "success") {
        setError({ status: true, msg: res.data.message, type: 'success' })
      }
      if (res.data.status === "failed") {
        setError({ status: true, msg: res.data.message, type: 'error' })
      }
    } else {
      setError({ status: true, msg: "OTP Required", type: 'error' })
    }
  }
  return (
    <>
      <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'error.light', padding: 2 }}>
        <Typography variant='h4' component="div" sx={{ fontWeight: 'bold', color: 'white' }}>OTP Verification</Typography>
      </Box>

      {authid === null ?
        <>
          <Box component="form" sx={{ p: 3, display: 'flex', justifyContent: 'center' }} noValidate id="login-form" onSubmit={handleSendOTPForm}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <TextField id="phonenumber" name="phonenumber" required fullWidth margin='normal' label='Phone Number' />
              <br />
              <Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
                <Button type='submit' variant='contained' color="error">Send OTP</Button>
              </Box>
              {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
            </Paper>
          </Box>
        </>
        :
        <>
          <Box component="form" sx={{ p: 3, display: 'flex', justifyContent: 'center' }} noValidate id="verify-otp-form" onSubmit={handleVerifyOTPForm}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <TextField id="otpcode" name="otpcode" required fullWidth margin='normal' label='Enter OTP' />
              <br />
              <Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
                <Button type='submit' variant='contained' color="info">Verify</Button>
              </Box>
              {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
            </Paper>
          </Box>
        </>
      }
    </>
  )
}

export default Login