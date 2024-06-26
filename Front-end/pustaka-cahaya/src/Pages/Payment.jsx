import * as React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const BookItem = ({ imageSrc, title, format, quantity, price, subtotal }) => (
  <div className="flex gap-5 self-end mt-2 mr-10 max-w-full w-[966px] max-md:flex-wrap max-md:mr-2.5">
    <div className="flex-auto max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[26%] max-md:ml-0 max-md:w-full">
          <div className="shrink-0 mx-auto bg-zinc-300 h-[152px] w-[118px] max-md:mt-7">
            <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[74%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto text-black max-md:mt-10">
            <h3 className="text-4xl">{title}</h3>
            <p className="mt-4 text-2xl text-neutral-400">
              {format} | {quantity}
            </p>
            <p className="mt-5 text-3xl">{price}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex-auto my-auto text-4xl text-right text-orange-400">{subtotal}</div>
  </div>
);

const ShippingMethod = ({ method, price, onChangeMethod }) => (
  <div className="mt-9 mr-8 text-2xl text-black max-md:mr-2.5 max-md:max-w-full">
    {method} - {price}
    <br/>
    <button onClick={onChangeMethod} className="btn">
      Pilih Metode Lain
    </button>
  </div>
);

function PaymentMethod({ icon, name }) {
    return (
      <div className="flex gap-5 mt-14 max-md:flex-wrap max-md:mt-10">
        <img loading="lazy" src={icon} alt={`${name} icon`} className="shrink-0 max-w-full aspect-[3.23] w-[118px]" />
        <div className="flex-auto my-auto">{name}</div>
      </div>
    );
  }

function Payment() {
  const bookItems = [
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c1ddd7821bb13bb3053ca341555782ab481c33cb57aa45621205b37f52996d6?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&", title: "Nama Buku", format: "Nama Format", quantity: "Jumlah barang", price: "Rpxx.xxx,xx", subtotal: "Subtotal" },
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/bd4726c2dfe430a1e7d8278cc08d65a1640f665c58869a501450ac351defb372?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&", title: "Nama Buku", format: "Nama Format", quantity: "Jumlah barang", price: "Rpxx.xxx,xx", subtotal: "Subtotal" },
    { imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/557c00e32325c7246b37f7010f904ebceb0c6572d1e32917dc1fdffb08547452?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&", title: "Nama Buku", format: "Nama Format", quantity: "Jumlah barang", price: "Rpxx.xxx,xx", subtotal: "Subtotal" },
  ];

  return (
    <div className="App">
      <Navbar/>
      <main className="flex flex-col px-16 mt-14 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <h1 className="text-4xl font-bold text-black max-md:max-w-full">Checkout</h1>
        <div className="mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <section className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow py-16 pr-8 pl-20 w-full text-3xl bg-white shadow-sm rounded-[35px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-wrap max-md:max-w-full">
                  <h2 className="flex-auto text-black-400">Alamat Tujuan Pengiriman</h2>
                  <button className="btn">Ubah Detail</button>
                </div>
                <h3 className="mt-9 font-medium text-black max-md:max-w-full">Rumah</h3>
                <p className="mt-5 text-2xl text-black max-md:max-w-full">
                  Nama Lengkap | +628XXXXXXXXXX <br /> Jl. Alamat Lengkap Tujuan Pengiriman
                </p>
              </div>
              
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
              
              <div className="flex flex-col items-end px-8 mt-20 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-5 mt-11 mr-9 max-w-full text-2xl  max-md:flex-wrap max-md:mt-10 max-md:mr-2.5">
                    <h3 className="flex-auto text-black">Metode Pengiriman</h3>
                  </div>
                  <ShippingMethod
                    method="JNE - (Reguler - Dalam Kota)"
                    price="Rpx.xxxx,xx"
                    onChangeMethod={() => {}}
                  />
                </div>
            </section>
            <section className="flex flex-col w-[30%] ml-30 max-md:w-full">
            <h2 className="text-3xl">Metode Pembayaran</h2>
            <PaymentMethod icon="https://cdn.builder.io/api/v1/image/assets/TEMP/a381a0b3a741a2c9b659f10f1aa506349ec7ff26a5b2f64905116f78313edf3a?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&" name="BCA Virtual Account" />
            <button className="btn">
                Pilih Metode Lain
            </button>
            <aside className="flex flex-col mt-10 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col pt-10 pb-5 w-full text-4xl bg-white shadow-sm rounded-[35px] max-md:mt-10 max-md:max-w-full">
                <h2 className="flex-auto text-3xl text-black-400">Rincian Belanja</h2>
                <div className="flex flex-col items-start px-5 mt-10 max-md:px-5 max-md:max-w-full">
                  <h3 className="text-3xl text-black">Ringkasan Pembayaran</h3>
                  <p className="mt-5 ml-2.5 text-orange-400">Rpxxx.xxx,xx</p>
                  <button className="btn">
                    Bayar
                  </button>
                </div>
              </div>
            </aside>
            </section>
            
          </div>
        </div>
      </main>
      <Footer/>
</div>
);
}

export default Payment;
