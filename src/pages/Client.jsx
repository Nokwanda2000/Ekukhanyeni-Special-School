import React from 'react'
import { Link, Outlet } from 'react-router-dom'

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
      
    </div>
  )
}
