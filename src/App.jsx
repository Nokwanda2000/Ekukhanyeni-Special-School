import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Client from './pages/Client'
import CMS from './cmspages/CMS'
import Homepage from './pages/Homepage'
import NoPage from './pages/NoPage'
import NoAuth from './pages/NoAuth'
import Loginpage from './cmspages/Loginpage';
import AboutUspage from './pages/AboutUspage';
import Contactpage from './pages/Contactpage';
import TimetablesPage from './pages/TimetablesPage';
import ProgrammesPage from './pages/ProgrammesPage';
import Eventspage from './pages/Eventspage';
import FormSubmissionsPage from './cmspages/FormSubmissionsPage';
import UsersPage from './cmspages/UsersPage';
import ClientNavbar from './components/ClientNavbar';
import CMSnavbar from './components/CMSnavbar';
import ClientFooter from './components/ClientFooter';
import CMSfooter from './components/CMSfooter';
import StrollToTop from './components/StrollToTop';
import FacebookButton from './components/FacebookButton';




function App() {
  return (
    <>
     <BrowserRouter>
     <ClientNavbar />
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
          <Route index element={<Loginpage />} />
          <Route path='Eventspage' element={<Eventspage />} />
          <Route path="FormSubmissionsPage" element={<FormSubmissionsPage />} />
          <Route path="UsersPage" element={<UsersPage />} />
          <Route path='Timetables' element={<Timetables />} />
        </Route>
      </Routes>

      <ClientFooter />
    </BrowserRouter>
     


    </>
  )
}

export default App
