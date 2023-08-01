import { getUserInfo, getUserInfoHandler } from '@store/user/user.reducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { loginStateHandler } from '../store/auth/auth.reducer';

const useGetUserInfo = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUserInfoHandler({ userType: "restaurant" })).unwrap().then((res) => {
            dispatch(getUserInfo(res));
            dispatch(loginStateHandler())
        })
    }, [])
}

export default useGetUserInfo