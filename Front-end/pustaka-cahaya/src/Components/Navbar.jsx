import { Link } from 'react-router-dom';
import React, { useRef, useState } from "react";
import { FaSearch, FaHeart, FaUser, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
// import { login } from '../auth';

const Navbar = () => {
    const navRef= useRef();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const showNavbar=()=>{
        navRef.current.classList.toggle("login-form")
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email":email, "password":password }),
            });
        
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
        
            const data = await response.json();
            console.log(data);
            sessionStorage.setItem('token', data.data.token); // Store the token in session storage
            setIsLoggedIn(true);
            showNavbar();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    const Menu = ['Profile', 'Logout']

    const [open, setOpen] = useState(false);

    const menuRef = useRef();
    const userRef = useRef();

    window.addEventListener("click", (e) => {
        if(e.target !== menuRef.current && e.target !== userRef.current){
            setOpen(false);
        }
    });
    return(
        <div>
            <header className="header">
                <div className="header_one">
                    <Link to="/" className='logo'>
                        <img loading="lazy"
                            src="./logo.png"
                            alt="Pustaka Cahaya"
                            className="image"/></Link>
                    <form className="search-form">
                        <input type="search" id="search-box" placeholder="Cari Produk, Judul Buku, Penulis"/>
                        <label htmlFor=""><FaSearch/></label>
                    </form>
                    <div className="icons">
                        <div id="search-btn"><FaSearch/></div>
                        <a href="/wishlist"><FaHeart/></a>
                        <a href="/cart"><FaCartShopping/></a>
                        {
                            sessionStorage.getItem("token") ? 
                            //ini ditampilin setelah login
                            <div id="login-btn>" className="user-btn" onClick={() =>setOpen(!open)} ref={userRef}><FaUser/>
                            {open && (        
                                <div className="bg-white p-4 w-52 shadow-lg absolute -left-14 top-24"
                                     ref={menuRef}>
                                    <ul>
                                    {Menu.map((menu) => (
                                        <li onClick={() => setOpen(false)}
                                            classname="p-2 text-lg cursor-pointer rounded hover:bg-inherit" 
                                            key={menu}>{menu}</li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div> : 
                            //ini ditampilin sebelum login 
                            <div id="login-btn" className="masuk-btn" onClick={showNavbar}>Masuk</div>
                        }
                    </div>
                </div>
            </header>

            <div className="login-form-container" ref={(navRef)}>
                <div id="close-login-btn" onClick={showNavbar}><FaTimes/></div>
                <form onSubmit={handleLogin}>
                    <h3>Masuk ke Pustaka Cahaya</h3>
                    <input type="email" className="box" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="box" placeholder="Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <input type="submit" value="Masuk" className="btn"/>
                    <p><Link to="/forgot-password">Lupa Kata Sandi</Link>.</p>
                    <p>Belum memiliki akun? <Link to="/register">Buat akun</Link>. </p>
                </form>
            </div>
        </div>
    )
}
export default Navbar