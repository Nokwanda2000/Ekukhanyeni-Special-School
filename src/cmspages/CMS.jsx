import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function CMS() {
  return (
    <div>
     <nav>
        <ul>
          <li>
            <Link to="/CMS">Home</Link>
          </li>
          <li>
            <Link to="/CMS/EventsCMS">Events</Link>
          </li>
          <li>
            <Link to="/CMS/FormSubmissionsCMS">Form Submissions</Link>
          </li>
          <li>
            <Link to="/CMS/UsersCMS">Users</Link>
          </li>
         <li>
            <Link to='/CMS/TimetablesCMS'>Timetables</Link>
         </li>
        
        </ul>
      </nav>

      <Outlet />
      
    </div>
  )
}
