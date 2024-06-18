import { Link } from 'react-router-dom';
import React, { useRef, useState,useEffect } from "react";
import { FaSearch, FaHeart, FaUser, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
// import { login } from '../auth';

const Navbar = () => {
    const navRef = useRef();
    const menuRef = useRef();
    const userRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const showNavbar = () => {
        navRef.current.classList.toggle("login-form");
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
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            sessionStorage.setItem('token', data.data.token); // Store the token in session storage
            setIsLoggedIn(true); // Update login status
            showNavbar();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false); // Update login status
    }

    const Menus = ['Profile', 'Logout'];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target) && userRef.current && !userRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

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
                            <div className="relative">
                                <img src="../user-icon.png" id="login-btn>" className="user-btn" onClick={()=>setOpen(!open)} ref={userRef}/> 
                                {open && (        
                                    <div 
                                        ref={menuRef}>
                                        <div className='dropDownProfile'>
                                        <ul className='flex flex-col gap-4 list'>
                                            <li><a href="/profile">Profile</a></li>
                                            <li><a href="#">Logout </a></li>
                                        </ul>
                                    </div>
                                    </div>
                                    )}
                            </div>
                            : 
                            // ini ditampilin sebelum login 
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