import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisteredRestaurantProtect = () => {
    const navigate = useNavigate()
    const isDetailsSubmitted = useSelector((state: any) => state.user.isDetailsSubmitted);
    useEffect(() => {
        if (!isDetailsSubmitted) {
            toast.info("Please register first to continue");
        }
    }, [isDetailsSubmitted]);
    if (isDetailsSubmitted) {
        return <Outlet />
    }
    navigate("/partner-with-us")
    return null;
}

export default RegisteredRestaurantProtect