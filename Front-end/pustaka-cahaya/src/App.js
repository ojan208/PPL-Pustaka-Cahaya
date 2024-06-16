import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Book from './Pages/Book';
import Register from './Pages/Register';
 
function App() {
  return (
    // <BrowserRouter>
        <div className="App">
          <Routes>
              <Route exact path="/" element={<Home/>}></Route>
              <Route path="/cart" element={<Cart/>}></Route>
              <Route path="/products" element={<Book/>}></Route>
              <Route path="/register" element={<Register/>}>
                <Route path=":productId" element={<Book/>}/>
              </Route>
          </Routes>
      </div>
    // </BrowserRouter>
  );
}

export default App;
