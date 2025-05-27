import React from 'react'
import{BrowserRouter,Routes,Route}from"react-router-dom"
import Navbar from './Components/Navbar/Navbar'
import Login from './Pages/Login/Login'
import Footer from './Components/Footer/Footer'
import Signup from './Pages/Signup/Signup'
import Password from './Pages/Password/Password'
import Reset from './Pages/Password/Reset'
import ContactUs from './Pages/ContactUs/ContactUs'
import Home from './Pages/Home/Home'
import AboutUs from './Pages/AboutUs/AboutUs'
import LandingPage from './Pages/Login/Landingpage'
import Termsofcondition from './Pages/Termsofcondition/Termsofcondition'
import ProductDetails from './Pages/Home/ProductDetails'

function Routers() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
       
      <Route path='/'
      element={
        <>
        <Navbar/>
        <LandingPage/>
        <Footer/>
        </>
      }>
       </Route>

        <Route path='/login' 
        element={
            <>
            <Navbar/>
            <Login/>
            <Footer/>
            </>
        }
        >

        </Route>

        <Route path='/signup'
        element={
          <>
          <Navbar/>
          <Signup/>
          <Footer/>
          
          </>
        }>
            
        </Route>
        <Route path='/password'
        element={
          <>
          <Navbar/>
          <Password/>
          <Footer/>
          </>
        }>

        </Route>
        <Route path='/reset'
        element={
          <>
          <Navbar/>
          <Reset/>
          <Footer/>
          </>
        }>

        </Route>
        <Route path='/contactus'
        element={
          <>
          <Navbar/>
          <ContactUs/>
          <Footer/>
          </>
        }>

        </Route>

        <Route path='/home'
        element={
          <>
       
          <Home/>
          <Footer/>
          </>
        }>
       </Route>

        <Route path='/aboutus'
        element={
          <>
          <Navbar/>
          <AboutUs/>
          <Footer/>
          </>
        }>

        </Route>



         <Route path='/termsofcondition'
        element={
          <>
          <Navbar/>
          <Termsofcondition/>
          <Footer/>
          </>
        }>

        </Route>


        
         <Route path='/productdetails/:id'
        element={
          <>
          <Navbar/>
          <ProductDetails/>
          <Footer/>
          </>
        }>

        </Route>
       
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routers
