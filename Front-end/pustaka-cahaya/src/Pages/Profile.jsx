import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Profile = () => {
    return (
        <div>
            <Navbar/>
            <div className="profile-form-container">
                <form onSubmit={"#"}>
                    {/* pokoknya tampilin buat si kolom kolomnya tuh udah keisi dluan */}
                    <input type="text" className="box" placeholder="Nama Lengkap" required />
                    <input type="email" className="box" placeholder="Email" required />
                    <input type="password" className="box" placeholder="Kata Sandi" required />
                    <div className="checkbox">  
                        <input type="checkbox" id="consent"/>
                        <label>Dengan pembuatan akun, Anda menyetujui Syarat & Ketentuan serta Kebijakan Privasi kami</label>
                    </div>
                    {/* <form> */}
                    <input type="submit" value="Daftar" className="btn"/>
                    {/* </form> */}
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;