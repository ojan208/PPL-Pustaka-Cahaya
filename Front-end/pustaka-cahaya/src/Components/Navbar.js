import React, {useRef} from "react";
import { FaSearch, FaHeart, FaUser, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {

    const navRef= useRef();

    const showNavbar=()=>{
        navRef.current.classList.toggle("login-form")
    }

    return(
        <div>
            <header className="header">
                <div className="header_one">
                    <a href='\#' className='logo'>
                        <img loading="lazy"
                            src="./logo.png"
                            alt="Pustaka Cahaya"
                            className="image"/></a>
                    <form className="search-form">
                        <input type="search" id="search-box" placeholder="Cari Produk, Judul Buku, Penulis"/>
                        <label htmlFor=""><FaSearch/></label>
                    </form>
                    <div className="icons">
                        <div id="search-btn"><FaSearch/></div>
                        <a href="/#"><FaHeart/></a>
                        <a href="/#"><FaCartShopping/></a>
                        <div id="login-btn>" className="user-btn" onClick={showNavbar}><FaUser/></div>
                    </div>
                </div>
            </header>

            <div className="login-form-container" ref={(navRef)}>
                <div id="close-login-btn" onClick={showNavbar}><FaTimes/></div>
                <form action="#">
                    <h3>Masuk ke Pustaka Cahaya</h3>
                    <input type="email" className="box" placeholder="Email" />
                    <input type="password" className="box" placeholder="Kata Sandi"/>

                    <input type="submit" value="Sign In" className="btn"/>
                    <p><a href="\">Lupa Kata Sandi</a>.</p>
                    <p>Belum memiliki akun? <a href="\">Buat akun</a>. </p>
                </form>
            </div>
        </div>
    )
}
export default Navbar