import React, {useRef} from "react";
import { FaTimes } from "react-icons/fa";
import Navbar from '../Components/Navbar';

const Register = () => {
    const navRef= useRef();

    const showNavbar=()=>{
        navRef.current.classList.toggle("login-form")
    }

    return(
        <div className="register-container">
            <Navbar/>
            <div className="register-form-container">
                <form action="#">
                    <h3>Bergabung ke Pustaka Cahaya</h3>
                    <input type="text" className="box" placeholder="Nama Lengkap" />
                    <input type="email" className="box" placeholder="Email" />
                    <input type="password" className="box" placeholder="Kata Sandi"/>
                </form>
                <div className="checkbox">
                    <input type="checkbox" id="consent"/>
                    <label>Dengan pembuatan akun, Anda menyetujui Syarat & Ketentuan serta Kebijakan Privasi kami</label>
                </div>
                <form>
                    <input type="submit" value="Daftar" className="btn"/>
                    <p>Sudah memiliki akun? <a onClick={showNavbar}>Masuk</a>. </p>
                </form>
            </div>

            <div className="login-form-container" ref={(navRef)}>
                <div id="close-login-btn" onClick={showNavbar}><FaTimes/></div>
                <form action="#">
                    <h3>Masuk ke Pustaka Cahaya</h3>
                    <input type="email" className="box" placeholder="Email" />
                    <input type="password" className="box" placeholder="Kata Sandi"/>

                    <input type="submit" value="Masuk" className="btn"/>
                    <p><a href="/forgot-password">Lupa Kata Sandi</a>.</p>
                    <p>Belum memiliki akun? <a href="/register" onClick={showNavbar}>Buat akun</a>. </p>
                </form>
            </div>
        </div>
    )
}

export default Register;