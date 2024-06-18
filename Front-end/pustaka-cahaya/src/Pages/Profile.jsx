import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Profile = () => {
    return (
        <div>
            <Navbar/>
            <div className="profile-form-container">
                <form onSubmit={handle}>
                    {/* pokoknya tampilin buat si kolom kolomnya tuh udah keisi dluan */}
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
            <Footer/>
        </div>
    );
}

export default Profile;