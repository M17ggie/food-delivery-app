import AdminDashboard from '@pages/admin-dashboard/AdminDashboard'
import Home from '@pages/landing-page/Home'
import PartnerWithUs from '@pages/partner-with-us/PartnerWithUs'
import RegisterRestaurant from '@pages/register-restaurant/RegisterRestaurant'
import UnregisteredRestaurantProtect from '@routes/UnregisteredRestaurantProtect'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import useGetLocation from './hooks/useGetLocation'
import useGetUserInfo from './hooks/useGetUserInfo'
import RegisteredRestaurantProtect from '@routes/RegisteredRestaurantProtect'
import RestaurantDashboard from '@pages/restaurant-dashboard/RestaurantDashboard'

function App() {

  useGetUserInfo();
  // useGetLocation();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* partner with us */}
          <Route path="/partner-with-us" element={<PartnerWithUs />} />

          {/* register restaurant */}
          <Route path="/register" element={<UnregisteredRestaurantProtect />}>
            <Route path="/register/restaurant" element={<RegisterRestaurant />} />
          </Route>

          {/* registered restaurant */}
          <Route path="/restaurant" element={<RegisteredRestaurantProtect />}>
            <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
          </Route>

          {/* <Route path="/admin" element={<AdminOnly />} > */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* </Route> */}
        </Routes>
      </Router>

      <ToastContainer
        position='top-right'
        autoClose={1500}
        hideProgressBar={true}
        closeOnClick
        closeButton
      />
    </>
  )
}

export default App
