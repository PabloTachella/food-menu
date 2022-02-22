import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import Header from '../components/Header';
import Login from './Login';
import { authenticateData } from "../utils/authenticate";

import { setAuthentication } from "../store/slices/user";

const Layout = () => {
  const { authenticated } = useSelector(state => state.user)
  const [authenticating, setAuthenticating] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let token

  // Credenciales validas para la autenticación
  // const email = 'challenge@alkemy.org'
  // const password = 'react'

  if (!authenticated) {
    token = localStorage.getItem('token')
  }
  if (token) {
    dispatch(setAuthentication({ token: token, authenticated: true}))
  }

  const handleSubmit = (email, password, resetForm) => {
    setAuthenticating(true)
    authenticateData(email, password)
      .then(token => {
        localStorage.setItem('token', token.data.token)
        dispatch(setAuthentication({ token: token.data.token, authenticated: true }))
        navigate('/home')
        setAuthenticating(false)
      })
      .catch(error => {
        new Error(error)
        setAuthenticating(false)
        resetForm()
        Swal.fire({
          icon: 'error',
          title: 'Authentication failure...',
          text: 'Enter a valid email and password!'
        })
      })
  }

  return (
    <>
      <Header />
      {!authenticated ?
        <Login handleSubmit={handleSubmit} authenticating={authenticating} /> :
        <Outlet />
      }
    </>
  )
}

export default Layout