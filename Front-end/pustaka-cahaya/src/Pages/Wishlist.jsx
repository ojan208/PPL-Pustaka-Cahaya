import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Wishlist = () => {
    return(
        <div className="App">
            <Navbar/>
        
        <div className="address-form-container">
            <form>
                <a href="/products"><button className="btn" type="button">Tambah Wishlist</button></a>
            </form>
            <table>
                <thead>
                    <th>Hapus</th>
                    <th>Nama Item</th>
                    <th>Harga</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Hapus</td>
                        <td>Laskar Pelangi <br/>Ebook <br/>0gr</td>
                        <td>Rp. 75.000,00</td>
                    </tr>
                    <tr>
                        <td>Hapus</td>
                        <td>Ily <br/>Buku Fisik <br/>140gr</td>
                        <td>Rp. 108.000,00</td>
                    </tr>
                    <tr>
                        <td>Hapus</td>
                        <td>Pulang <br/>Ebook <br/>0gr</td>
                        <td>Rp. 75.000,00</td>
                    </tr>
                    {/* bikin kondisi if else kalo tabel kosong */}
                </tbody>
            </table>
        </div>
        <Footer/>
        </div>
    )
}

export default Wishlist;