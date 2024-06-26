import * as React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const BookCard = ({ imageSrc, author, title, price, originalPrice }) => (
  <div className="flex flex-col pb-4 mt-3.5 text-sm font-light rounded-lg border border-black border-solid text-neutral-400">
    <img loading="lazy" src={imageSrc} alt={`Cover of ${title} by ${author}`} className="self-center aspect-[0.94] w-[200px]" />
    <div className="flex flex-col items-start pr-14 pl-5 mt-3.5 max-md:pr-5">
      <div>{author}</div>
      <div className="mt-4 text-xl text-black">{title}</div>
      <div className="mt-2 text-xl font-semibold text-orange-400">{price}</div>
      {originalPrice && <div className="mt-2.5 italic line-through">{originalPrice}</div>}
    </div>
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="mt-12 text-3xl font-extrabold text-orange-400 max-md:mt-10 max-md:max-w-full">
    {title}
  </h2>
);

function Home() {
  return (
    <div className="App">
        <Navbar/>

      <main className="flex flex-col self-center px-5 mt-5 max-w-full w-[1207px] max-md:mt-10">
        <SectionTitle title="Pilihan Staff Kami" />
        <div className="flex gap-5 justify-between items-start px-0.5 mt-5 max-md:flex-wrap">
          <div className="flex flex-col justify-center self-stretch rounded-3xl bg-zinc-300">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/52a9dd571f0c3425b94a421cdab7256c6e92dee89d7b51a19ab29b22751dfe12?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&" alt="Staff Pick Featured Book" className="w-80" />
          </div>
          <BookCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/7ddbada5e2f04a068cf8c5e7da6d7fe0e312604178271d3a8c929eeb328b5872?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
            author="Pidi Baiq"
            title="Ancika"
            price="Rp 98.000"
          />
          <BookCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d7d82259e3504fdda56178031d55fc645af9a9ee1de89d09793d90732001c184?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
            author="Andrea Hirata"
            title="Laskar Pelangi"
            price="Rp 75.000"
            originalPrice="Rp 90.000"
          />
          <BookCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c2b1a21056fc692a07633aec4323a9d46108d5087845828d2dba2a943d933825?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
            author="Leila S. Chudori"
            title="Laut Bercerita"
            price="Rp 75.000"
          />
          <BookCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/bcc5e437a72d3794e877c43e35b8e30d5e8b180128cb1dc6e435925a6518d0e8?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
            author="Andrea Hirata"
            title="Guru Aini"
            price="Rp 75.000"
            originalPrice="Rp. 90.000"
          />
        </div>

        <SectionTitle title="Promo Hari Ini" />
        <div className="flex gap-5 justify-between items-start px-0.5 mt-5 max-md:flex-wrap">
          <div className="flex flex-col justify-center self-stretch rounded-3xl bg-zinc-300">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/79b6d313fa7d972cdbbbba375e6d659f26097c35024aeb9c258683ad25f58f5d?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&" alt="Today's Promo Featured Book" className="w-80" />
          </div>
          <BookCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/dde8ce067baa7d5c212e017eead5ea83c2bb17e796d9f7b2e663c0b2c58aea91?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
            author="Tere Liye"
            title="Si Anak Kuat"
            price="Rp 70.200"
            originalPrice="Rp 78.000"
          />
          <BookCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/bbbf7cb32bc496b4f16bb5f1a0959c144c72f23b97c96ce0c7d916809b77ac8c?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
            author="Penulis"
            title="Pukul Setengah Lima"
            price="Rp 66.750"
            originalPrice="Rp 80.000"
          />
          <BookCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ae32d370eff71e599c90cf318fdea5fc7566db6551611a65dbddfae4b6a2e79f?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
            author="Penulis"
            title="Thank You Salma"
            price="Rp 75.000"
            originalPrice="Rp 90.000"
          />
          <BookCard
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c9dbfef93f4c266c1d044aa7d034b7e5b7abdf83307d2cb1eecafee570c67290?apiKey=38ea4bf1a9f1434eab3d3c090cff6303&"
            author="Tere Liye"
            title="Tentang Kamu"
            price="Rp 75.000"
            originalPrice="Rp 85.000"
          />
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Home;