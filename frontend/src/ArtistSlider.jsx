import React from "react";
import artists from "./data/artists.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

const ArtistSlider = () => {
  return (
    <div style={{ paddingTop: "120px", position: "relative" }}>
      
      <h2
        style={{
          fontFamily: "'Indie Flower', cursive",
          fontWeight: "bold",
          fontSize: "3.5rem",
          textAlign: "center",
          marginBottom: "20px",
          color: "#e63946"
        }}
      >
        🏆 Top Artist 🌟 👩‍🎨
      </h2>

      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={3}
        spaceBetween={60}
        loop
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev"
        }}
        modules={[EffectCoverflow, Navigation]}
        style={{ paddingTop: "40px", paddingBottom: "60px" }}
        coverflowEffect={{
          rotate: 25,
          depth: 130,
          modifier: 1,
          slideShadows: false,
        }}
      >
        {artists.map((artist) => (
          <SwiperSlide key={artist.id}>
            
            <div className="artist-card-wrapper">

              {/* 🔥 BACK CARD UPDATED */}
              <div className="artist-card-bg"></div>

              <div className="artist-card">
                <div className="artist-img-wrapper">
                  <img src={artist.image} alt={artist.name} />
                </div>

                <p className="artist-name">{artist.name}</p>
              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-prev">
        <i className="fas fa-pencil-alt"></i>
      </div>

      <div className="custom-next">
        <i className="fas fa-pencil-alt"></i>
      </div>

      <style>
        {`
        body {
          background: linear-gradient(to right, #e1ece8ff, #e7ebe0ff, #eee8e3ff);
        }

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          padding:30px;
        }

        .artist-card-wrapper {
          position: relative;
          width: 280px;
          height: 360px;
        }

        /* 🔥 UPDATED BACK CARD */
        .artist-card-bg {
          position: absolute;
          width: 280px;
          height: 390px;
          
          background: rgba(255, 255, 255, 0.5); /* lighter */
          border: 2px dashed rgba(255, 160, 122, 0.4); /* softer border */
          
          border-radius: 20px;
          transform: rotate(-10deg); /* more rotation */
          
          top: -12px;
          left: 12px;
          
          opacity: 1.2; /* 🔥 reduced visibility */
          
          z-index: 0;
          transition: 0.4s ease;
        }

        .artist-card {
          position: relative;
          width: 100%;
          height: 100%;
          background: #ffffffdd;
          border: 2px dashed #ffa07a;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          z-index: 1;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .artist-card::before,
        .artist-card::after {
          position: absolute;
          font-size: 38px;
          opacity: 0.7;
          z-index: 0;
        }

        .artist-card::before {
          content: "🌸";
          top: 8px;
          left: 10px;
        }

        .artist-card::after {
          content: "🌸";
          bottom: 8px;
          right: 10px;
        }

        .artist-img-wrapper {
          width: 200px;
          height: 200px;
          margin: auto;
          margin-bottom: 15px;
        }

        .artist-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 6px solid white;
          box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        }

        .artist-name {
          font-family: 'Indie Flower', cursive;
          font-size: 1.9rem;
          color: #333;
        }

        /* HOVER */
        .artist-card-wrapper:hover .artist-card {
          transform: scale(1.06);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.2),
            0 10px 20px rgba(0, 0, 0, 0.26),
            0 0 0 2px rgba(255, 160, 122, 0.14);
        }

        .artist-card-wrapper:hover .artist-card-bg {
          transform: rotate(-13deg) scale(1.07); /* more dramatic on hover */
          opacity: 0.7;
        }

        .swiper-slide-active .artist-card {
          transform: scale(1.1);
        }

        .custom-prev,
        .custom-next {
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          font-size: 25px;
          color: #444;
          cursor: pointer;
          z-index: 10;
        }

        .custom-prev {
          left: 5%;
          transform: translateY(-50%) rotate(180deg);
        }

        .custom-next {
          right: 5%;
        }

        .custom-prev:hover,
        .custom-next:hover {
          color: #d6249f;
          transform: translateY(-50%) scale(1.3);
        }

        .custom-prev:hover {
          transform: translateY(-50%) rotate(180deg) scale(1.3);
        }
        `}
      </style>
    </div>
  );
};

export { ArtistSlider };