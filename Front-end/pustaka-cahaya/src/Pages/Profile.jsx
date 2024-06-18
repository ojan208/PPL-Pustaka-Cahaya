import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { TbRuler } from "react-icons/tb";
import { useState } from "react";

const Profile = () => {
    const [tab, setTab] = useState(false);

    const handleSubmit =(e,type)=>{
        // e.preventDefault()
        if(type == 'Profil'){
            //isi brow
        }
        else{
            //ni buat yg alamat
        }
    }
    return (
        <div className="profile-container">
            <Navbar/>
            <div className="row">
                <div className={tab == false?'activeColor':'pointer'} onClick={()=>setTab(false)}>Profil</div>
                <div className={tab == true?'activeColor':'pointer'} onClick={()=>setTab(true)}>Alamat</div>
            </div>
            <div className="profile-form-container">
                <form onSubmit={(e)=>handleSubmit(e,tab?'Profile':'Alamat')} id='Profil'>
                    {/* pokoknya tampilin buat si kolom kolomnya tuh udah keisi dluan */}
                    <br/>
                    <h2><label>Nama Lengkap</label></h2>
                    <input type="text" className="box" placeholder="Nama Lengkap" required />
                    <br/>
                    <h2><label>Email</label></h2>
                    <input type="email" className="box" placeholder="Email" required />
                    <br/>
                    <h2><label>Jenis Kelamin</label></h2>
                    <div className="radio">
                    <input type="radio" id="lelaki" name="Jenis Kelamin"/>
                    <label for="lelaki">Laki-laki</label>
                    <input type="radio" id="perempuan" name="Jenis Kelamin"/>
                    <label for="perempuan">Perempuan</label>
                    </div>
                    <br/>
                    <h2><label>No. Telepom</label></h2>
                    <input type="text" className="box" placeholder="+62XXXXXXXXXX" required />
                    <br/>
                    <br/>
                    <h2><label>Pekerjaan/Profesi</label></h2>
                    <input type="text" className="box" placeholder="Pekerjaan/Profesi" required />
                    <h2><label>Kata Sandi</label></h2>
                    <input type="password" className="box" placeholder="Kata Sandi" required />
                    <button className="btn">Simpan</button>
                </form>
                
                {/* bro ini tolonk dibikin pas pindah tab tuh si alamat ya form alamat, klo si profil ya form profil. makaseh */}
                
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;