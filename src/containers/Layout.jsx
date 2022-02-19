import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Login from './Login';
import { authenticateData } from "../utils/authenticate";

import { setAuthentication } from "../store/slices/user";

const Layout = () => {
  const { authenticated } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Credenciales validas para la autenticación
  // const email = 'challenge@alkemy.org'
  // const password = 'react'

  const handleSubmit = (email, password) => {
    authenticateData(email, password)
      .then(token => {
        localStorage.setItem('token', token.data.token)
        dispatch(setAuthentication({ token: token.data.token, authenticated: true }))
        navigate('/dishes-finder')
      })
      .catch(error => {
        new Error(error)
      })
  }

  return (
    <>
      <Header />
      {!authenticated ?
        <Login handleSubmit={handleSubmit} /> :
        <Outlet />
      }
    </>
  )
}

export default Layout