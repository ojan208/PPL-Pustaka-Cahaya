import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Cart = () => {
    return(
        <div className="App">
            <Navbar/>
        
        <div className="address-form-container">
            <form>
                <a href="/products"><button type="button" className="btn">Tambah Keranjang</button></a>
            </form>
            <table>
                <thead>
                    <th>Hapus</th>
                    <th>Nama Item</th>
                    <th>Jumlah</th>
                    <th>Harga</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Hapus</td>
                        <td>Laskar Pelangi <br/>Ebook <br/>0gr</td>
                        <td>1</td>
                        <td>Rp. 75.000,00</td>
                    </tr>
                    <tr>
                        <td>Hapus</td>
                        <td>Ily <br/>Buku Fisik <br/>140gr</td>
                        <td>2</td>
                        <td>Rp. 108.000,00</td>
                    </tr>
                    <tr>
                        <td>Hapus</td>
                        <td>Pulang <br/>Ebook <br/>0gr</td>
                        <td>1</td>
                        <td>Rp. 75.000,00</td>
                    </tr>
                    {/* bikin kondisi if else kalo tabel kosong */}
                </tbody>
            </table>
            <div className="subtotal">
                <p>Subtotal: Rp. 258.000,00</p>
            <a href="/payment"><div className="btn">Pembayaran</div></a>
            </div>
            
        </div>
        <Footer/>
        </div>
    )
}

export default Cart;