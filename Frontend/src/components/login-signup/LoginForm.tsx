import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Box, Button } from '@mui/material'
import * as yup from 'yup';

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        phoneNumber: "",
        password: ""
    });
    const [errors, setErrors] = useState<any>({})

    const schema = yup.object().shape({
        phoneNumber: yup.string().trim().matches(/^([7-9]\d{9})$/, 'Please enter valid phone number'),
        password: yup.string().required().trim().test('len', "Password must be between 8 & 15 characters", value => value.length >= 8 && value.length <= 15)
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await schema.validate(loginData, { abortEarly: false });
            setErrors({})
            console.log(loginData)
        } catch (err: unknown) {
            const newErrors: Record<string, string> = {}
            if (err instanceof yup.ValidationError) {
                err.inner.forEach((error: any) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors)
            } else {
                console.log('What just happened is totally out of my scope')
            }
        }
    }

    return (
        <Box onSubmit={handleSubmit} component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} >
            <TextField
                onChange={handleChange}
                value={loginData.phoneNumber}
                name="phoneNumber"
                id="phoneNumber"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                size="small"
                variant='outlined'
                placeholder='Phone Number'
                error={!!errors.phoneNumber}
                helperText={<span style={{ color: 'red' }}>{errors.phoneNumber}</span>}
            />

            <TextField
                onChange={handleChange}
                value={loginData.password}
                name="password"
                id="password"
                type='password'
                size="small"
                variant='outlined'
                placeholder='Password'
                error={!!errors.phoneNumber}
                helperText={<span style={{ color: 'red' }}>{errors.password}</span>}
            />

            <Button type='submit' variant='contained' sx={{ width: '100%', maxWidth: { lg: '25%' }, margin: '0 auto' }}>Login</Button>
        </Box>
    )
}

export default LoginForm