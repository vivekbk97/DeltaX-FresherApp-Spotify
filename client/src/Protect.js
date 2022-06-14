import React from 'react'
import { Navigate } from 'react-router-dom'

const Protect = ({ Page }) => {
  const login = JSON.parse(localStorage.getItem('user'))
  return <div>{!login ? <Navigate to='/' /> : <Page />}</div>
}

export default Protect
