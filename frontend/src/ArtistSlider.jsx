import React from "react";
import artists from "./data/artists.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

const ArtistSlider = () => {
  return (
    <div style={{ paddingTop: "120px ", position: "relative" }}>
      
      {/* Heading */}
      <h2
        style={{
          fontFamily: "cursive",
          fontWeight: "bold",
          fontSize: "3.5rem",
          textAlign: "center",
          marginBottom: "20px"
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
        style={{ paddingTop: "40px", paddingBottom: "60px", overflow: "hidden" }}
        coverflowEffect={{
          rotate: 25,
          stretch: 0,
          depth: 130,
          modifier: 1,
          slideShadows: false,
        }}
      >
        {artists.map((artist) => (
          <SwiperSlide key={artist.id} style={{ overflow: "hidden" }}>
            <div className="artist-card">
              <img src={artist.image} alt={artist.name} />
              <p className="artist-name">{artist.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✏️ Custom Pencil Navigation */}
      <div className="custom-prev">
        <i className="fas fa-pencil-alt"></i>
      </div>

      <div className="custom-next">
        <i className="fas fa-pencil-alt"></i>
      </div>

      <style>
        {`
        .swiper {
          overflow: hidden !important;
        }

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible !important;
        }

        .artist-card {
          width: 18rem;
          padding: 25px;
          margin:20px;
          border-radius: 22px;
          text-align: center;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          box-shadow: 0px 10px 18px rgba(0, 0, 0, 0.2);
          transition: all 0.35s ease;
        }

        .artist-card:hover {
          transform: scale(1.088);
        }

        .swiper-slide-active .artist-card {
          transform: scale(1.12);
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0px 18px 35px rgba(0, 0, 0, 0.35);
        }

        .artist-card img {
          height: 220px;
          width: 220px;
          object-fit: cover;
          border-radius: 50%;
          margin: auto;
          transition: 0.3s ease;
          box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.5);
        }
.slider-container {
  width: 90vw;
  max-width: 90%;
  overflow: hidden;
}
        .swiper-slide-active .artist-card img {
          box-shadow: 0px 0px 25px rgba(255, 255, 255, 0.7),
                      0px 6px 12px rgba(0, 0, 0, 0.25);
        }

        .artist-name {
          margin-top: 18px;
          font-size: 2rem;
          font-family: cursive;
          color: black;
        }

        /* ✏️ Pencil Navigation */
        .custom-prev,
        .custom-next {
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          font-size: 25px;
          color: #444;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
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