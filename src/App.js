import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Wish from './pages/Wish';
import Login from './pages/Login';
import ProductScreen from './pages/ProductScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Shipping from './components/Shipping';
import SignUp from './pages/SignUp';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import OrderDetails from './components/OrderDetails';
import Account from './components/Account';
import UserProfile from './components/UserProfile';



function App() {
  return (
    <Router>
      <ToastContainer position='bottom-center' limit={3} />
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:slug' element={<ProductScreen />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wish' element={<Wish />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/order/:id' element={<OrderDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/account' element={<Account />} />
          <Route path='/profile' element={<UserProfile />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
