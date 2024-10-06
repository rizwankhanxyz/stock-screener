import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

function RegisterLogin() {
  return (
    <div style={{display:'flex'}}>
        <Register/> 
        <Login/>

    </div>
  )
}

export default RegisterLogin