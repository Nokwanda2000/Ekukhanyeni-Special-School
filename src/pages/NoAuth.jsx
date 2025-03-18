import React from 'react'
import { Link } from 'react-router-dom'

export default function NoAuth() {
  return (
    <div style={{textAlign:"center", padding:"10%"}}>
       <h1 style={{ color: "#3B82F6", fontWeight:"bold", fontSize:"500%"}}>401:</h1>
       
       <h2>You are not authorized to access this page.</h2>

       <button style={{ backgroundColor: "#3B82F6", color: "white", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer", fontSize: "14px", margin: "5%",  }}><Link to={"/"}>Home</Link></button>
    </div>
  )
}
