import { getUserInfo, getUserInfoHandler } from '@store/user/user.reducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { loginStateHandler } from '../store/auth/auth.reducer';
import { useSelector } from 'react-redux';

const useGetUserInfo = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { userType } = useSelector((state: any) => state.user)

    useEffect(() => {
        dispatch(getUserInfoHandler({ userType })).unwrap().then((res) => {
            dispatch(getUserInfo(res));
            dispatch(loginStateHandler())
        })
    }, [])
}

export default useGetUserInfo