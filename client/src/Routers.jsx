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
import LandingPage from './Pages/Login/LandingPage'
import Termsofcondition from './Pages/Termsofcondition/Termsofcondition'
import ProductDetails from './Pages/Home/ProductDetails'
import IntroPage from './Pages/Login/IntroPage'


import AdminDashboard from './Pages/Admin/AdminDashboard'
import Loginpage from './Pages/Seller/Loginpage'
import Signupage from './Pages/Seller/Signupage'
import Forgetpage from './Pages/Seller/Forgetpage'
import Resetpage from './Pages/Seller/Resetpage'
import Orderlist from './Pages/Seller/Orderlist'
import SellerDashboard from './Pages/Seller/Sellerdashboard'
import ProductList from './Pages/Seller/ProductList'
import Adminlogin from './Pages/Admin/Adminlogin'
import TotalUsers from './Pages/Admin/TotalUsers'
import TotalProducts from './Pages/Admin/TotalProducts'
import TotalSellers from './Pages/Admin/TotalSellers'
import AddProduct from './Pages/Seller/AddProduct'
import UpdateProduct from './Pages/Seller/updateProduct'
import AddtoCart from './Pages/Home/AddtoCart'
import BuyOne from './Pages/Home/BuyOne'
import Homepage from './Pages/Home/Homepage'
import BuyNow from './Pages/Home/BuyNow'
import UserProfile from './Components/Navbar/UserProfile'
import UpdateUserProfile from './Components/Navbar/UpdateUserProfile'
import SellerProfile from './Pages/Seller/SellerProfile'
import UpdateSellerProfile from './Pages/Seller/UpdateSellerProfile'
import AdminNav from './Components/Navbar/AdminNav'
import SellerNav from './Components/Navbar/SellerNav'

import LoginNav from './Components/Navbar/LoginNav'
import NewRegistration from './Pages/Admin/NewRegistration'
import FrontNav from './Components/Navbar/FrontNav'
import HomeNav from './Components/Navbar/HomeNav'
import Orders from './Pages/Login/Orders'




function Routers() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          
      <Route path='/'
      element={
        <>
      
        <IntroPage/>
      
        </>
      }>
       </Route>
       
      <Route path='/landing'
      element={
        <>
        <FrontNav/>
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
          <FrontNav/>
          <ContactUs/>
          <Footer/>
          </>
        }>

        </Route>

        <Route path='/home/:category'
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
          <FrontNav/>
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

        



         <Route path='/admindashboard'
        element={
          <>
          <AdminNav/>
          <AdminDashboard/>
          <Footer/>
          </>
        }>

        </Route>

        
        <Route path='/loginpage' 
        element={
            <>
            <Navbar/>
            <Loginpage/>
            <Footer/>
            </>
        }
        >

        </Route>

        
        <Route path='/signupage' 
        element={
            <>
            <SellerNav/>
            <Signupage/>
            <Footer/>
            </>
        }
        >

        </Route>

        <Route path='/forgetpage' 
        element={
            <>
            <Navbar/>
            <Forgetpage/>
            <Footer/>
            </>
        }
        >

        </Route>

  <Route path='/resetpage' 
        element={
            <>
            <Navbar/>
            <Resetpage/>
            <Footer/>
            </>
        }
        >

        </Route>

        
  <Route path='/orderlist' 
        element={
            <>
            <SellerNav/>
            <Orderlist/>
            <Footer/>
            </>
        }
        >

        </Route>



              
  <Route path='/sellerdashboard' 
        element={
            <>
            <SellerNav/>
            <SellerDashboard/>
            <Footer/>
            </>
        }
        >

        </Route>

                   
  <Route path='/productlist' 
        element={
            <>
            <SellerNav/>
            <ProductList/>
            <Footer/>
            </>
        }
        >

        </Route>

 <Route path='/adminlogin' 
        element={
            <>
          <LoginNav/>
            <Adminlogin/>
            <Footer/>
            </>
        }
        >

        </Route>
        <Route path='/totalsellers' 
        element={
            <>
            <AdminNav/>
            <TotalSellers/>
            <Footer/>
            </>
        }
        >

        </Route>
        <Route path='/totalproducts' 
        element={
            <>
            <AdminNav/>
            <TotalProducts/>
            <Footer/>
            </>
        }
        >

        </Route>
        <Route path='/totalusers' 
        element={
            <>
            <AdminNav/>
            <TotalUsers/>
            <Footer/>
            </>
        }
        >

        </Route>

 <Route path='/addproduct' 
        element={
            <>
             <SellerNav/>
            <AddProduct/>
             <Footer/>
            </>
        }
        >

        </Route>


         <Route path='/updateproduct/:id' 
        element={
            <>

            <UpdateProduct/>

            </>
        }
        >

        </Route>

        <Route path='/addtocart/:id' 
        element={
            <>
            <Navbar/>
            <AddtoCart/>
            <Footer/>

            </>
        }
        >

        </Route>




        
        <Route path='/buyone/:id' 
        element={
            <>
            <Navbar/>
            <BuyOne/>
            <Footer/>

            </>
        }
        >

        </Route>


          
        <Route path='/homepage' 
        element={
            <>
            <HomeNav/>
            <Homepage/>
            <Footer/>

            </>
        }
        >

        </Route>


        <Route path='/buynow' 
        element={
            <>
            <Navbar/>
            <BuyNow/>
            <Footer/>

            </>
        }
        >

        </Route>


         <Route path='/userprofile' 
        element={
            <>
            <Navbar/>
            <UserProfile/>
            <Footer/>

            </>
        }
        >

        </Route>


        <Route path='/updateuserprofile/:id' 
        element={
            <>
            <Navbar/>
            <UpdateUserProfile/>
            <Footer/>

            </>
        }
        >

        </Route>



          <Route path='/sellerprofile' 
        element={
            <>
            <SellerNav/>
            <SellerProfile/>
            <Footer/>

            </>
        }
        >

        </Route>

        
        <Route path='/updatesellerprofile/:id' 
        element={
            <>
            <SellerNav/>
            <UpdateSellerProfile/>
            <Footer/>

            </>
        }
        >

        </Route>


         <Route path='/newregistration' 
        element={
            <>
            <AdminNav/>
            <NewRegistration/>
            <Footer/>

            </>
        }
        >

        </Route>

         <Route path='/orders' 
        element={
            <>
            <HomeNav/>
            <Orders/>
            <Footer/>

            </>
        }
        >

        </Route>




        



       
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routers
