import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../containers/Home'
import Login from '../containers/Login'
import DishDetail from '../containers/DishDetail'
import DishesFinder from '../containers/DishesFinder'
import NotFound from '../containers/NotFound'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dish-detail' element={<DishDetail />} />
      <Route path='/dishes-finder' element={<DishesFinder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)
export default App
