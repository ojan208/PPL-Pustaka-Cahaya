import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const BookCard = ({ author, title, price, discountPrice, originalPrice }) => (
  <div className="flex flex-col pb-4 text-sm font-light bg-white rounded-lg border border-black border-solid text-neutral-400">
    <div className="shrink-0 rounded-lg bg-zinc-300 h-[213px]" />
    <div className="flex flex-col items-start pr-14 pl-5 mt-3.5 max-md:pr-5">
      <div>{author}</div>
      <div className="mt-4 text-xl text-black">{title}</div>
      {discountPrice ? (
        <>
          <div className="mt-3 text-xl font-semibold text-orange-400">{discountPrice}</div>
          {/* <div className="mt-2.5 italic line-through">{originalPrice}</div> */}
        </>
      ) : (
        <div className="mt-3 font-semibold text-orange-400">{price}</div>
      )}
    </div>
  </div>
);

const BookSection = ({ title, books }) => (
  <section className="flex flex-col pt-10 pb-3.5 pl-12 mt-14 w-full bg-yellow-100 rounded-xl max-md:pl-5 max-md:mt-10 max-md:max-w-full">
    <div className="flex gap-5 font-bold max-md:flex-wrap max-md:max-w-full">
      <h2 className="flex-auto text-2xl tracking-wide text-black">{title}</h2>
      <div className="flex-auto text-xl tracking-wide text-center text-orange-400 max-md:max-w-full">
        Lihat Semua
      </div>
    </div>
    <div className="flex gap-5 mt-8 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
      {books.map((book, index) => (
        <BookCard key={index} {...book} />
      ))}
      <div className="flex flex-col pb-4 bg-white rounded-lg border border-black border-solid">
        <div className="flex flex-col items-start px-10 pt-20 pb-12 text-2xl font-extrabold text-orange-400 whitespace-nowrap rounded-lg bg-zinc-300 max-md:px-5">
          <div className="justify-center items-center px-6 mt-7 bg-white shadow-sm h-[60px] rounded-[100px] w-[60px] max-md:px-5">
            &gt;
          </div>
        </div>
        <div className="flex flex-col px-5 mt-3.5 text-sm font-light text-neutral-400">
          <div>Penulis</div>
          <div className="mt-4 text-xl text-black">Judul Buku</div>
          <div className="mt-3 text-xl font-semibold text-orange-400">Harga Diskon</div>
          <div className="mt-2.5 italic">Harga asli</div>
        </div>
      </div>
    </div>
  </section>
);

const Review = ({ user, content }) => (
  <article className="flex gap-2 items-start px-5 mt-9 text-2xl font-bold tracking-wide text-orange-400 max-md:flex-wrap">
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8cef80d2fb87c02ee9892c95b16f52e5182eb50b5b70b0f063afdd94bb8b3944?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&" alt={`${user}'s avatar`} className="shrink-0 aspect-square w-[71px]" />
    <div className="flex-auto mt-5 max-md:max-w-full">
      <span className="font-light">from </span>{user}<br />
      <span className="font-light">{content}</span>
      <span className="text-orange-400">Baca selengkapnya</span>
      <br />
    </div>
  </article>
);

const handleSubmit =(e,type)=>{
    // e.preventDefault()
    if(type === 'Deskripsi'){
        //isi brow
    }
    else{
        //ni buat yg Detail
    }
}

const BookDetail = () => {
  const authorBooks = [
    { author: "Penulis", title: "Judul Buku", price: "Harga" },
    { author: "Penulis", title: "Judul Buku", discountPrice: "Harga Diskon", originalPrice: "Harga asli" },
    { author: "Penulis", title: "Judul Buku", price: "Harga" },
    { author: "Penulis", title: "Judul Buku", discountPrice: "Harga Diskon", originalPrice: "Harga asli" },
    { author: "Penulis", title: "Judul Buku", discountPrice: "Harga Diskon", originalPrice: "Harga asli" },
  ];

  const recommendedBooks = [
    { author: "Penulis", title: "Judul Buku", price: "Harga" },
    { author: "Penulis", title: "Judul Buku", discountPrice: "Harga Diskon", originalPrice: "Harga asli" },
    { author: "Penulis", title: "Judul Buku", price: "Harga" },
    { author: "Penulis", title: "Judul Buku", discountPrice: "Harga Diskon", originalPrice: "Harga asli" },
    { author: "Penulis", title: "Judul Buku", discountPrice: "Harga Diskon", originalPrice: "Harga asli" },
  ];
  
  const [tab, setTab] = useState(false);
  const [toggle, setToggle] = useState(1)

    function updateToggle(id){
        setToggle(id)
    }
  return (
    <div className="App">
        <Navbar/>
    {/* <main className="flex flex-col"> */}
      <div className="px-5 max-md:max-w-full container">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center mt-3.5 w-full bg-zinc-300 max-md:mt-10 max-md:max-w-full">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac7b5fa82bbf368ff09f2b35cee9779a58ea03909dae8618b6dd356aa1aaa033?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&" alt="Book cover" className="w-full aspect-[0.71] max-md:max-w-full" />
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[49%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-5 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 justify-between items-start self-end max-w-full w-[639px] max-md:flex-wrap">
                <div className="flex flex-col self-start">
                  <h1 className="text-2xl text-neutral-400">Leila S. Chudori</h1>
                  <h2 className="mt-9 text-4xl text-black">Namaku Alam</h2>
                </div>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8850dbe7de74a418caf4bcd391a8a505fabd1dd1d385378afcf21b64084837d3?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&" alt="" className="shrink-0 self-end mt-14 w-10 aspect-square max-md:mt-10" />
              </div>
              <div className="row">
                <ul>
                <li className={tab === false?'activeColor':'pointer'} onClick={()=>updateToggle(1)||setTab(false)}>Deskripsi</li>
                <li className={tab === true?'activeColor':'pointer'} onClick={()=>updateToggle(2)||setTab(true)}>Detail</li>
                </ul>
            </div>
            <div className={toggle === 1 ? "show-content":"content"}>
                <div className="description-container">
                    <h2><label>Sinopsis</label></h2>
                    <p>Inilah yang kubayangkan detik-detik terakhir Bapak:
                    <br/>
                    18 Mei 1970.
                    <br/>
                    Hari gelap. Langit berwarna hitam dengan garis ungu. Bulan bersembunyi di balik ranting pohon randu. Sekumpulan burung nasar bertengger di pagar kawat. Mereka mencium aroma manusia yang nyaris jadi mayat bercampur bau mesiu. Terdengar lolongan anjing berkepanjangan. Empat orang berbaris rapi, masing-masing berdiri dengan senapan yang diarahkan kepada Bapak. Hanya satu senapan berisi peluru mematikan. Selebihnya, peluru karet. Tak satu pun di antara keempat lelaki itu tahu siapa yang kelak menghentikan hidup Bapak.
                    <br/>
                    _
                    <br/>
                    Pada usianya yang ke-33 tahun, Segara Alam menjenguk kembali masa kecilnya hingga dewasa. Semua peristiwa tertanam dengan kuat. Karena memiliki photographic memory, Alam ingat pertama kali dia ditodong senapan oleh seorang lelaki dewasa ketika masih berusia tiga tahun; pertama kali sepupunya mencercanya sebagai anak ‘pengkhianat negara’; pertama kali Alam berkelahi dengan seorang anak pengusaha besar yang menguasai sekolah; dan pertama kali dia jatuh cinta.</p>
                </div>
            </div>
            <div className={toggle === 2 ? "show-content":"content"}>
                <div className="description-container">
                    Judul: Namaku Alam
                    <br/>
                    Nama pengarang: Leila S. Chudori
                    <br/>
                    Jumlah Halaman: 443 halaman
                    <br/>
                    Tanggal Terbit: 20 September 2023
                    <br/>
                    ISBN: 9786231340825
                    <br/>
                    Nama Penerbit: Kepustakaan Populer Gramedia
                    
                </div>
            </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col max-md:mt-10">
              <button className="flex gap-3 justify-end px-14 py-5 text-3xl tracking-widest text-center text-white whitespace-nowrap bg-orange-400 rounded-xl shadow-sm max-md:px-3">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8646aee42aa89eb765297c6a1ccdce9708c9c734a3f70b61a308129453ad854d?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&" alt="" className="shrink-0 aspect-square w-[43px]" />
                <span className="flex-auto my-auto">Preview</span>
              </button>
              <div className="flex flex-col py-5 pr-5 pl-2.5 mt-3.5 bg-white rounded-xl shadow-sm">
                <h3 className="text-2xl tracking-wider text-black">Beli</h3>
                <p className="mt-6 text-base tracking-wider text-neutral-400">Pilih Format Buku yang Tersedia</p>
                <div className="flex flex-col py-2.5 mt-4 ml-2.5 w-full rounded-xl border border-orange-400 border-solid">
                  <div className="text-xl tracking-wider text-black">BUKU FISIK</div>
                  <div className="mt-2 text-base tracking-wider text-neutral-400">Mulai dari</div>
                  <div className="mt-2 text-2xl tracking-wider text-orange-400">Rp 90.000</div>
                  <div className="flex gap-2.5">
                    <div className="flex-auto text-xl tracking-wider text-neutral-400 line-through">Rp 120.000</div>
                    <div className="justify-center self-start p-1 text-base tracking-wider text-red-600 whitespace-nowrap bg-rose-300 rounded">25%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <section className="flex gap-5 self-start px-5 mt-36 text-2xl font-bold max-md:flex-wrap max-md:mt-10">
        <div className="flex-auto tracking-wide text-black max-md:max-w-full">
          <h2>Penilaian dan Ulasan</h2>
          <p>
            4.15 <span className="text-base">xxx.xxx penilaian </span>
            <span className="text-base">· </span>
            <span className="text-base">xxx.xxx ulasan</span>
          </p>
        </div>
        <div className="flex-auto self-end mt-16 text-center text-orange-400 max-md:mt-10">Lihat semua &gt; </div>
      </section>
      <Review
        user="User X"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et lorem odio. Aenean metus massa, sollicitudin quis risus at, ullamcorper sodales est. Nunc nec commodo diam, id placerat ex. Etiam mi dolor, sollicitudin eu feugiat et, condimentum vitae neque. Cras tempus ligula a erat faucibus ultricies. Sed faucibus consequat ipsum at dapibus. Fusce tincidunt metus a metus blandit, vitae commodo..."
      />
      <Review
        user="User X"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et lorem odio. Aenean metus massa, sollicitudin quis risus at, ullamcorper sodales est. Nunc nec commodo diam, id placerat ex. Etiam mi dolor, sollicitudin eu feugiat et, condimentum vitae neque. Cras tempus ligula a erat faucibus ultricies. Sed faucibus consequat ipsum at dapibus. Fusce tincidunt metus a metus blandit, vitae commodo..."
      />
      <BookSection title="Lebih Banyak dari Penulis" books={authorBooks} />
      <BookSection title="Rekomendasi Untukmu" books={recommendedBooks} /> */}
    {/* </main> */}
    <Footer/>
    </div>
  );
}

export default BookDetail;