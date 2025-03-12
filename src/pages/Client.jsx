import React from 'react'
import ClientFooter from '../components/ClientFooter'
import { Link, Outlet } from 'react-router-dom'
import StrollToTop from '../components/StrollToTop'
// import FormSubmissionsDashboard from '../cmspages/FormSubmissionsCMS'



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
      {/* <FormSubmissionsDashboard/> */}

      <Outlet />
      <SponsorBanner />
    <ClientFooter />
    <StrollToTop />
    
    
    </div>
  )
}
