import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Client from './pages/Client'
import CMS from './cmspages/CMS'
import Homepage from './pages/Homepage'
import NoPage from './pages/NoPage'
import NoAuth from './pages/NoAuth'
import LoginCMS from './cmspages/LoginCMS';
import AboutUspage from './pages/AboutUspage';
import Contactpage from './pages/Contactpage';
import TimetablesPage from './pages/TimetablesPage';
import ProgrammesPage from './pages/ProgrammesPage';
import EventsCMS from './cmspages/Eventscms';
import FormSubmissionsCMS from './cmspages/FormSubmissionsCMS';
import UsersCMS from './cmspages/UsersCMS';
import TimetablesCMS from './cmspages/TimetablesCMS';
import Eventspage from './pages/Eventspage';





function App() {
  return (
    <>
     <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Client />}>
        <Route path="/Homepage" element={<Homepage />} />
         <Route path='Contactpage' element={<Contactpage />} />
         <Route path="TimetablesPage" element={<TimetablesPage />} />
         <Route path="ProgrammesPage" element={<ProgrammesPage />} />
         <Route path="Eventspage" element={<Eventspage />} />
         <Route path="AboutUspage" element={<AboutUspage />} />
         <Route path="/NoAuth" element={<NoAuth />} />
         <Route path='Nopage' element={<NoPage />} />
         

        
      
         
        </Route>


        <Route path="/" element={<CMS />}>
          <Route index element={<LoginCMS/>} />
          <Route path='EventsCMS' element={<EventsCMS />} />
          <Route path="FormSubmissionsCMS" element={<FormSubmissionsCMS />} />
          <Route path="UsersCMS" element={<UsersCMS />} />
          <Route path='TimetablesCMS' element={<TimetablesCMS />} />
        </Route>
      </Routes>

      
    </BrowserRouter>
     


    </>
  )
}

export default App
