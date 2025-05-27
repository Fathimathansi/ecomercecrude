import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Hello from './Hello.jsx'
import New from './New.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './Components/Footer/Footer.jsx'
import Login from './Pages/Login/Login.jsx'
import Routers from './Routers.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Hello/> */}
    {/* <New name="fathima"/> */}
    {/* <Navbar/> */}
    {/* <Footer/> */}
    {/* <Login/> */}
    <Routers/>


  </StrictMode>,
)
