import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import { getAuth } from 'firebase/auth';
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
import EventsCMS from './cmspages/EventsCMS';
import UsersCMS from './cmspages/UsersCMS';
import TimetablesCMS from './cmspages/TimetablesCMS';
import Eventspage from './pages/Eventspage';
import SponsorBanner from './components/SponsorBanner';
import FormSubmissionsCMS from './cmspages/FormSubmissionsCMS';
import { onAuthStateChanged } from 'firebase/auth';

// Protected route component
const ProtectedRoute = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/CMS" replace />;
  }

  // Render the outlet (child routes) if authenticated
  return <Outlet />;
};



export default function App() {
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("You are logged in!");
      }
    });

    return () => unsubscribe();
  }, []);

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

          {/* CMS Routes with Authentication */}
          <Route path="/CMS" element={<CMS />}>
            <Route index element={<LoginCMS />} />
            
            {/* Protected CMS Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='EventsCMS' element={<EventsCMS />} />
              <Route path="UsersCMS" element={<UsersCMS />} />
              <Route path='TimetablesCMS' element={<TimetablesCMS />} />
              <Route path='FormSubmissionsCMS' element={<FormSubmissionsCMS />} />
            </Route>
            
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
