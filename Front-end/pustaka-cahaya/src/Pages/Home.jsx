import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import { Autoplay } from "swiper/modules";

const Home = (props) => {
    const swiperOptionsOne={
        breakpoints: {
            0:{
                slidesPerView:1,
            },
            768:{
                slidesPerView:2,
            },
            1024:{
                slidesPerView:3,
            }
        },
        loop:true,
    };
    return(
        <div className="home-container">
            <Navbar/>
            <section className="home" id="home">
                <div className="row">
                    <div className="content">
                        <h3>New Arrival</h3>
                        <p>Kumpulan buku-buku yang baru diterbitkan.</p>
                        <a href="/products" className="btn">Beli Sekarang</a>
                    </div>
                    
                    <div className="swiper">
                        <h3>Best Seller</h3>
                        <Swiper 
                            watchSlidesProgress={true}
                            slidesPerView={5}
                            autoplay={{
                                delay:9500,
                                disableOnInteraction:false,
                            }}
                            pagination={{clickable:true}}
                            modules={[Autoplay]}
                            className="book-list"
                            {...swiperOptionsOne}>
                            <a href="\#" className='swiper-slide'>
                            <SwiperSlide>
                            <a href="\#" className='swiper-slide'>
                            <SwiperSlide><img src="./images/Laut-Bercerita.jpg" alt="laut-bercerita"></img></SwiperSlide>
                            </a>
                            </SwiperSlide>
                            </a>
                            <a href="\#" className='swiper-slide'>
                            <SwiperSlide><img src="./images/Laut-Bercerita.jpg" alt="laut-bercerita"></img></SwiperSlide>
                            </a>
                            <a href="\#" className='swiper-slide'>
                            <SwiperSlide><img src="./images/fucek.jpg" alt="fucek"></img></SwiperSlide>
                            </a>
                        </Swiper>
                    </div>

                    <div className="swiper">
                        <h3>Promo Hari Ini</h3>
                        <Swiper 
                            watchSlidesProgress={true}
                            slidesPerView={5}
                            autoplay={{
                                delay:9500,
                                disableOnInteraction:false,
                            }}
                            pagination={{clickable:true}}
                            modules={[Autoplay]}
                            className="book-list"
                            {...swiperOptionsOne}>
                            <a href="\#" className='swiper-slide'>
                            <SwiperSlide><img src="./images/sagaras.jpeg" alt="sagaras"></img></SwiperSlide>
                            </a>
                            <a href="\#" className='swiper-slide'>
                            <SwiperSlide><img src="./images/Laut-Bercerita.jpg" alt="laut-bercerita"></img></SwiperSlide>
                            </a>
                            <a href="\#" className='swiper-slide'>
                            <SwiperSlide><img src="./images/fucek.jpg" alt="fucek"></img></SwiperSlide>
                            </a>
                        </Swiper>
                    </div>

                    <div className="swiper">
                        <h3>Fantasi Terbaik</h3>
                        <Swiper 
                            watchSlidesProgress={true}
                            slidesPerView={5}
                            autoplay={{
                                delay:9500,
                                disableOnInteraction:false,
                            }}
                            pagination={{clickable:true}}
                            modules={[Autoplay]}
                            className="book-list"
                            {...swiperOptionsOne}>
                            <a href="\#" className='swiper-slide'>
                            <SwiperSlide><img src="./images/sagaras.jpeg" alt="sagaras"></img></SwiperSlide>
                            </a>
                            <a href="\#" className='swiper-slide'>
                            <SwiperSlide><img src="./images/Laut-Bercerita.jpg" alt="laut-bercerita"></img></SwiperSlide>
                            </a>
                            <a href="\#" className='swiper-slide'>
                            <SwiperSlide><img src="./images/fucek.jpg" alt="fucek"></img></SwiperSlide>
                            </a>
                        </Swiper>
                    </div>
                    <Footer/>
                </div>
            </section>
        </div>
    )
}

export default Home