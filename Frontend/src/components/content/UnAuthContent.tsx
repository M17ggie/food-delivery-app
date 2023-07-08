import React from 'react'
import { useSelector } from 'react-redux';

const UnAuthContent = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    return !isLoggedIn ? <>{children}</> : null
}

export default UnAuthContent