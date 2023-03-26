import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import * as yup from 'yup'

const SignUpForm = () => {

    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<any>({});

    const schema = yup.object().shape({
        name: yup.string().min(3, 'Name must be atleast 3 characters long').max(20, 'Name should not exceed 20 characters').matches(/^[a-zA-Z\s]*$/, "Name must not include numbers or special characters").required('Name is a required field'),
        email: yup.string().required().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter valid email'),
        password: yup.string().required().trim().test('len', "Password must be between 8 & 15 characters", value => value.length >= 8 && value.length <= 15)
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await schema.validate(signUpData, { abortEarly: false });
            setErrors({})
            console.log(signUpData)
        } catch (err: unknown) {
            if (err instanceof yup.ValidationError) {
                const newErrors: { [key: string]: string } = {}
                err.inner.forEach((error: any) => {
                    newErrors[error.path] = error.message
                })
                setErrors(newErrors);
            } else {
                console.log('This is beyond my scope')
            }
        }
    }

    return (
        <Box onSubmit={handleSubmit} component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                size="small"
                variant='outlined'
                placeholder='Name'
                error={!!errors.name}
                helperText={<span style={{ color: 'red' }}>{errors.name}</span>}
            />

            <TextField
                onChange={handleChange}
                inputProps={{ inputMode: 'email' }}
                size="small"
                name="email"
                id="email"
                variant='outlined'
                placeholder='Email'
                error={!!errors.email}
                helperText={<span style={{ color: 'red' }}>{errors.email}</span>}
            />

            <TextField
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                size="small"
                variant='outlined'
                placeholder='Password'
                error={!!errors.password}
                helperText={<span style={{ color: 'red' }}>{errors.password}</span>}
            />
            <Button type='submit' variant='contained' sx={{ width: '100%', maxWidth: { lg: '25%' }, margin: '0 auto' }}>Sign Up!</Button>
        </Box>
    )
}

export default SignUpForm