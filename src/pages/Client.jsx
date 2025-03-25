import React from 'react';
import ClientFooter from '../components/ClientFooter';
import { Outlet } from 'react-router-dom';
import StrollToTop from '../components/StrollToTop';
import SponsorBanner from '../components/SponsorBanner';
import Navbar from './Navbar'; // Import the Navbar component

export default function Client() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Use the Navbar Component */}
      <Navbar />
      <Outlet />
      <SponsorBanner />
      <ClientFooter />
      <StrollToTop />

    </div>
  );
}


