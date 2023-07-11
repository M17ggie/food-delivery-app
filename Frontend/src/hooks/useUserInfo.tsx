import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useUserInfo = () => {

    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {

        }
    }, [])
}

export default useUserInfo