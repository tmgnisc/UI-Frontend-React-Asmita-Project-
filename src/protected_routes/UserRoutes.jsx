
// import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'

import { useState, useEffect } from "react"
import axios from 'axios'

 
const UserRoutes = () => {
    const user=JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate
  return user !== null?  <Outlet/> : navigate('/login')
}
 
 
export default UserRoutes
 