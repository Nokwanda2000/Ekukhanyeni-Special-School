import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Client from './pages/Client'
import CMS from './cmspages/CMS'


function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Client />}>
        
         
        </Route>


        <Route path="/" element={<CMS />}>
          <Route index element={<Home />} />
        
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
     


    </>
  )
}

export default App
