import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AddAddress = () => {
    return(
        <div className="add-address-container">
            <Navbar/>
        
        <div className="add-address-form-container">
            <form onSubmit={"/"}>
                <br/>
                <h2><label>Label Alamat</label></h2>
                <input type="text" className="box" placeholder="Rumah/Kantor/Kos/dll" required />
                <br/>
                <h2><label>Nama Penerima</label></h2>
                <input type="text" className="box" placeholder="Nama" required />
                <br/>
                <h2><label>No. Telepon</label></h2>
                <input type="text" className="box" placeholder="+62XXXXXXXXXX" required />
                <br/>
                <h2><label>Provinsi</label></h2>
                <input type="text" className="box" placeholder="Provinsi" required />
                <h2><label>Kota/Kabupaten</label></h2>
                <input type="text" className="box" placeholder="Kota/Kabupaten" required />
                <h2><label>Kecamatan</label></h2>
                <input type="text" className="box" placeholder="Kecamatan" required />
                <h2><label>Kelurahan</label></h2>
                <input type="text" className="box" placeholder="Kelurahan" required />
                <h2><label>Kode Pos</label></h2>
                <input type="text" className="box" placeholder="Kode Pos" required />
                <button className="btn">Simpan</button>
            </form>
        </div>
            <Footer/>
        </div>
    )
}

export default AddAddress;