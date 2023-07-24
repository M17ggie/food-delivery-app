import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@pages/landing-page/Home'
import PartnerWithUs from '@pages/partner-with-us/PartnerWithUs'
import RegisterRestaurant from '@pages/register-restaurant/RegisterRestaurant'
import UnregisteredRestaurantProtect from '@routes/UnregisteredRestaurantProtect'
import { ToastContainer } from 'react-toastify'
import AdminDashboard from '@pages/admin-dashboard/AdminDashboard'
import AdminOnly from '@routes/AdminOnly'

function App() {

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
