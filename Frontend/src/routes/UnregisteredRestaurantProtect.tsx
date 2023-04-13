import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

const UnregisteredRestaurantProtect = () => {
    const isDetailsSubmitted = useSelector((state: any) => state.unregisteredRestaurant.isDetailsSubmitted)
    console.log({ isDetailsSubmitted })
    if (!isDetailsSubmitted) {
        return <Outlet />
    }
    toast.info("Your have submitted your details. Please login to check status of your application");
    redirect('/partner-with-us');
    return null;
}

export default UnregisteredRestaurantProtect