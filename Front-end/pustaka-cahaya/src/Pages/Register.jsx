import React, { useRef, useState} from "react";
import { FaTimes } from "react-icons/fa";
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navRef= useRef();

    const showNavbar=()=>{
        navRef.current.classList.toggle("login-form")
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nama, setNama] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const history = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"nama": nama, "email":email, "password":password})
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            console.log(data);
            sessionStorage.setItem('token', data.data.token); 
            setIsLoggedIn(true);
            history('/');
        } catch (error) {
            setError(error.message);
        }
    }

    return(
        <div className="register-container">
            <Navbar/>
            <div className="register-form-container">
                <form onSubmit={handleRegister}>
                    <h3>Bergabung ke Pustaka Cahaya</h3>
                    <input type="text" className="box" placeholder="Nama Lengkap" value={nama} onChange={(e) => setNama(e.target.value)} required />
                    <input type="email" className="box" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="box" placeholder="Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <div className="checkbox">  
                        <input type="checkbox" id="consent"/>
                        <label>Dengan pembuatan akun, Anda menyetujui Syarat & Ketentuan serta Kebijakan Privasi kami</label>
                    </div>
                    {/* <form> */}
                    <input type="submit" value="Daftar" className="btn"/>
                    {/* </form> */}
                </form>
                <p>Sudah memiliki akun? <a onClick={showNavbar}>Masuk</a>. </p>
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