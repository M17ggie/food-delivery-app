import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useGetLocation = () => {
    const { isLoggedIn } = useSelector((state: any) => state.auth)
    useEffect(() => {
        if (isLoggedIn && navigator?.geolocation) {
            navigator.geolocation.getCurrentPosition(location => {
                if (location) console.log(location)
            })
        }
    }, [isLoggedIn])

}

export default useGetLocation