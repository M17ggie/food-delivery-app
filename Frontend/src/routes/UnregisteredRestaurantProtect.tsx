import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UnregisteredRestaurantProtect = () => {
    const navigate = useNavigate()
    const isDetailsSubmitted = useSelector((state: any) => state.user.isDetailsSubmitted);
    useEffect(() => {
        if (isDetailsSubmitted) {
            toast.info("Your have submitted your details!");
        }
    }, [isDetailsSubmitted])
    if (!isDetailsSubmitted) {
        return <Outlet />
    }
    navigate("/restaurant/dashboard");
    return null;
}

export default UnregisteredRestaurantProtect