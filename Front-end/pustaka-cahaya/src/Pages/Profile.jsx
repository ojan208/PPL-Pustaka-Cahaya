import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Profile = () => {
    return (
        <div className="profile-container">
            <Navbar/>
            <div className="row">
                <div>Profil</div>
                <div>Alamat</div>
            </div>
            <div className="profile-form-container">
                <form onSubmit={"#"}>
                    {/* pokoknya tampilin buat si kolom kolomnya tuh udah keisi dluan */}
                    <input type="text" className="box" placeholder="Nama Lengkap" required />
                    <input type="email" className="box" placeholder="Email" required />
                    <input type="password" className="box" placeholder="Kata Sandi" required />
                    <input type="submit" value="Simpan" className="btn"/>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;