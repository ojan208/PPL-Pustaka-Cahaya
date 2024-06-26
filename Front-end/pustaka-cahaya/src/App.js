import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Wishlist from './Pages/Wishlist';
import AddAddress from './Pages/AddAddress';
import BookDetail from './Pages/BookDetail';
import Payment from './Pages/Payment';
 
function App() {
  return (
    // <BrowserRouter>
        <div className="App">
          <Routes>
              <Route exact path="/" element={<Home/>}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
              <Route path="/wishlist" element={<Wishlist/>}></Route>
              <Route path="/cart" element={<Cart/>}></Route>
              <Route path="/add-address" element={<AddAddress/>}></Route>
              {/* <Route path="/products" element={<Book/>}></Route> */}
              <Route path="/book-detail" element={<BookDetail/>}></Route>
              <Route path='/payment' element={<Payment/>}></Route>
              <Route path="/register" element={<Register/>}>
                {/* <Route path=":productId" element={<Book/>}/> */}
              </Route>
          </Routes>
      </div>
    // </BrowserRouter>
  );
}

export default App;
