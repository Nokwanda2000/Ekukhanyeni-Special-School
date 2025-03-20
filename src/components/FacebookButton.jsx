import React from 'react'


export default function FacebookButton({ profileUrl}) {
  const handleClick = () => {
    window.open(profileUrl, "_blank")
  }

  return (
    <button
    onClick={handleClick}
    style={{
      cursor: "pointer",
      borderRadius:"50%"
    }}
    >
      <img src='../assets/Facebook.png' ></img>
    </button>
  )
}
