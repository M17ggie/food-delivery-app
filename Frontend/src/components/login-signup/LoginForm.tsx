import React from 'react'
import TextField from '@mui/material/TextField'
import { Box, Button } from '@mui/material'

const LoginForm = () => {
    return (
        <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} >
            <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} size="small" variant='outlined' placeholder='Phone Number' />
            <TextField type='password' size="small" variant='outlined' placeholder='Password' />
            <Button variant='contained' sx={{ width: '100%', maxWidth: { lg: '25%' }, margin: '0 auto' }}>Login</Button>
        </Box>
    )
}

export default LoginForm