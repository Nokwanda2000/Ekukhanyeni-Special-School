import React from 'react'
import ClientFooter from '../components/ClientFooter'
import { Link, Outlet } from 'react-router-dom'
<<<<<<< HEAD
import SponsorBanner from '../components/SponsorBanner'
=======
import StrollToTop from '../components/StrollToTop'
>>>>>>> d5b2b9ed2f487b812c69cccd5365b8b021159d13

export default function Client() {
  return (
    <div>
    <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/AboutUspage">About Us</Link>
          </li>
          <li>
            <Link to="/Contactpage">Contact</Link>
          </li>
          <li>
            <Link to="/TimetablesPage">Timetables</Link>
          </li>
           <li>
            <Link to="/ProgrammesPage">Programmes</Link>
            </li>
             <li>
              <Link to="/Eventspage">Events</Link>
               </li>
  
        </ul>
      </nav>

      <Outlet />
      <SponsorBanner />
    <ClientFooter />
    <StrollToTop />
    </div>
  )
}
