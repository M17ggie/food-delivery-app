import { Box, Button, TextField } from '@mui/material'
import React from 'react'

const SignUpForm = () => {
    return (
        <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField type="text" size="small" variant='outlined' placeholder='Name' />
            <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} size="small" variant='outlined' placeholder='Phone Number' />
            <TextField type="password" size="small" variant='outlined' placeholder='Password' />
            <Button variant='contained' sx={{ width: '100%', maxWidth: { lg: '25%' }, margin: '0 auto' }}>Sign Up!</Button>
        </Box>
    )
}

export default SignUpForm