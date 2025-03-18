import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import Client from './pages/Client';
import CMS from './cmspages/CMS';
import Homepage from './pages/Homepage';
import NoPage from './pages/NoPage';
import NoAuth from './pages/NoAuth';
import LoginCMS from './cmspages/LoginCMS';
import AboutUspage from './pages/AboutUspage';
import Contactpage from './pages/Contactpage';
import TimetablesPage from './pages/TimetablesPage';
import ProgrammesPage from './pages/ProgrammesPage';
import EventsCMS from './cmspages/Eventscms';
import UsersCMS from './cmspages/UsersCMS';
import TimetablesCMS from './cmspages/TimetablesCMS';
import Eventspage from './pages/Eventspage';
import SponsorBanner from './components/SponsorBanner';
import FormSubmissionsCMS from './cmspages/FormSubmissionsCMS';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Client />}>
            <Route index element={<Homepage />} />
            <Route path='Contactpage' element={<Contactpage />} />
            <Route path="TimetablesPage" element={<TimetablesPage />} />
            <Route path="ProgrammesPage" element={<ProgrammesPage />} />
            <Route path="Eventspage" element={<Eventspage />} />
            <Route path="AboutUspage" element={<AboutUspage />} />
            <Route path="/NoAuth" element={<NoAuth />} />
            <Route path='*' element={<NoPage />} />
          </Route>

          {/* CMS Routes - Authentication is handled within the CMS component */}
          <Route path="/CMS" element={<CMS />}>
            <Route index element={<LoginCMS />} />
            <Route path='EventsCMS' element={<EventsCMS />} />
            <Route path="UsersCMS" element={<UsersCMS />} />
            <Route path='TimetablesCMS' element={<TimetablesCMS />} />
            <Route path='FormSubmissionsCMS' element={<FormSubmissionsCMS />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
