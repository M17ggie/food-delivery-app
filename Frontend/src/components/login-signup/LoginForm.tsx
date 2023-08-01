import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AppDispatch } from '@store/index';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { getBasicRestaurantDetail } from '../../api/restaurantApi';
import { loginHandler, loginStateHandler } from '../../store/auth/auth.reducer';
import AuthButton from './AuthButton';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ close, userType }: { close: Function, userType: string }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false)

    const schema = yup.object().shape({
        email: yup.string().required().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email'),
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
        setIsLoading(true)
        try {
            await schema.validate(loginData, { abortEarly: false });
            setErrors({});
            dispatch(loginHandler({ loginDetails: loginData, userType })).unwrap().then((res) => {
                dispatch(loginStateHandler())
                switch (userType) {
                    // case "user": 
                    case "restaurant": const response = dispatch(getBasicRestaurantDetail(res.data));
                        const isDetailsSubmitted = response.payload.isDetailsSubmitted;
                        if (isDetailsSubmitted) {
                            navigate("/restaurant/dashboard", { replace: true });
                        } else {
                            navigate("/register/restaurant", { replace: true });
                        }
                        break;
                    // case "delivery": dispatch();
                    //     break;
                    default: break;
                }
                close();
            }).catch((err) => {
                const errorMessage = err.response?.data?.message || 'An error occured'
                toast.error(errorMessage)
            })
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
        setIsLoading(false)
    }

    return (
        <Box onSubmit={handleSubmit} component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} >
            <TextField
                onChange={handleChange}
                value={loginData.email}
                name="email"
                id="email"
                inputProps={{ inputMode: 'email' }}
                size="small"
                variant='outlined'
                placeholder='Email'
                error={!!errors.email}
                helperText={<span style={{ color: 'red' }}>{errors.email}</span>}
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
                error={!!errors.password}
                helperText={<span style={{ color: 'red' }}>{errors.password}</span>}
            />

            <AuthButton isLoading={isLoading} name={'Login'} />
        </Box>
    )
}

export default LoginForm