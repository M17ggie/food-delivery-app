import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '@pages/landing-page/Home'
import PartnerWithUs from './pages/partner-with-us/PartnerWithUs'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* partner with us */}
          <Route path="/partner-with-us" element={<PartnerWithUs />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
