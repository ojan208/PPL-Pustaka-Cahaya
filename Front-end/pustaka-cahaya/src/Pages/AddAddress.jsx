import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AddAddress = () => {
    return(
        <div className="add-address-container">
            <Navbar/>
        
        <div className="add-address-form-container">
            <form>
                <br/>
                <h2><label>Label Alamat</label></h2>
                <input type="text" className="box" placeholder="Rumah/Kantor/Kos/dll"  />
                <br/>
                <h2><label>Nama Penerima</label></h2>
                <input type="text" className="box" placeholder="Nama"  />
                <br/>
                <h2><label>No. Handphone</label></h2>
                <input type="text" className="box" placeholder="+62XXXXXXXXXX"  />
                <br/>
                <h2><label>Provinsi</label></h2>
                <input type="text" className="box" placeholder="Provinsi"  />
                <h2><label>Kota/Kabupaten</label></h2>
                <input type="text" className="box" placeholder="Kota/Kabupaten"  />
                <h2><label>Kecamatan</label></h2>
                <input type="text" className="box" placeholder="Kecamatan"  />
                <h2><label>Kelurahan</label></h2>
                <input type="text" className="box" placeholder="Kelurahan"  />
                <h2><label>Kode Pos</label></h2>
                <input type="text" className="box" placeholder="Kode Pos"  />
                <ul>
                <li><button type="button" className="green-btn"><a href="/profile">Kembali</a></button></li>
                <li><button type="submit" className="red-btn">Simpan</button></li>
                </ul>
            </form>
        </div>
            <Footer/>
        </div>
    )
}

export default AddAddress;