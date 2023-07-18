import React from 'react'
import { useSelector } from 'react-redux';

const AuthContent = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    return isLoggedIn ? <>{children}</> : null
}

export default AuthContent