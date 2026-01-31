import React from 'react'
import Home from "./pages/Home"
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Allbooks from './pages/Allbooks'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
const App = () => {
  return (
    <div >
      <Router>
         <Navbar/>
         <Routes>
             <Route exact path='/' element={<Home/>}></Route>
             <Route path='/all-books' element={<Allbooks/>}></Route>
             <Route path='/SignUp' element={<SignUp/>}></Route>
             <Route path='/LogIn' element={<LogIn/>}></Route>
             <Route path='/cart' element={<Cart/>}></Route>
             <Route path='/profile' element={<Profile/>}></Route>
             <Route path='/view-book-details/:id' element={<ViewBookDetails/>}></Route>
         </Routes>
         <Footer/> 
      </Router>
    </div>
  )
}

export default App
