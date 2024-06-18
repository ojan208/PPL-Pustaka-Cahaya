import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";

const Profile = () => {
    const [tab, setTab] = useState(false);

    const handleSubmit =(e,type)=>{
        // e.preventDefault()
        if(type === 'Profil'){
            //isi brow
        }
        else{
            //ni buat yg alamat
        }
    }
    const [toggle, setToggle] = useState(1)

    function updateToggle(id){
        setToggle(id)
    }
    return (
        <div className="App">
            <Navbar/>
            <div className="row">
                <ul>
                <li className={tab === false?'activeColor':'pointer'} onClick={()=>updateToggle(1)||setTab(false)}>Profil</li>
                <li className={tab === true?'activeColor':'pointer'} onClick={()=>updateToggle(2)||setTab(true)}>Alamat</li>
                </ul>
            </div>
            <div className={toggle === 1 ? "show-content":"content"}>
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
                    <h2><label>No. Telepon</label></h2>
                    <input type="text" className="box" placeholder="+62XXXXXXXXXX" required />
                    <br/>
                    <h2><label>Pekerjaan/Profesi</label></h2>
                    <input type="text" className="box" placeholder="Pekerjaan/Profesi" required />
                    <h2><label>Kata Sandi</label></h2>
                    <input type="password" className="box" placeholder="Kata Sandi" required />
                    <button className="btn">Simpan</button>
                </form>
                </div>
            </div>
            <div className={toggle === 2 ? "show-content":"content"}>
                <div className="address-form-container">
                    <form>
                        <Link to="/add-address"><button className="btn">Tambah Alamat</button></Link>
                    </form>
                    <table>
                        <thead>
                            <th>Label Alamat</th>
                            <th>Nama Penerima</th>
                            <th>No. Handphone</th>
                            <th>Alamat Lengkap</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rumah</td>
                                <td>Nama Penerima</td>
                                <td>08XXXXXXXXXX</td>
                                <td>Jalan Raya No. X Kel. A, Kec. B, Kota C, Prov. D, 12345</td>
                            </tr>
                            <tr>
                                <td>Rumah</td>
                                <td>Nama Penerima</td>
                                <td>08XXXXXXXXXX</td>
                                <td>Jalan Raya No. X Kel. A, Kec. B, Kota C, Prov. D, 12345</td>
                            </tr>
                            <tr>
                                <td>Rumah</td>
                                <td>Nama Penerima</td>
                                <td>08XXXXXXXXXX</td>
                                <td>Jalan Raya No. X Kel. A, Kec. B, Kota C, Prov. D, 12345</td>
                            </tr>
                            {/* bikin kondisi if else kalo tabel kosong */}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;