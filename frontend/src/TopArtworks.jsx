import React, { useEffect } from "react";
import artworks from "./data/artworks.json";

const TopArtworks = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
body {
  background: linear-gradient(to right, #e1ece8ff, #e7ebe0ff, #eee8e3ff);
}

/* ✅ GRID → EXACTLY 4 CARDS */
.art-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 0 20px;
}

/* 🎨 CARD */
.art-card {
  width: 100%;
  background: #ffffffdd;
  border: 2px dashed #ffa07a;
  border-radius: 20px;
  padding: 8px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;

  /* 🔥 IMPORTANT */
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

/* blobs */
.art-card::before,
.art-card::after {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #fcd5ce, #ffb4a2);
  border-radius: 50%;
  opacity: 0.3;
  z-index: 0;
}

.art-card::before {
  top: -40px;
  left: -40px;
}

.art-card::after {
  bottom: -50px;
  right: -50px;
}

/* 🔥 NEW HOVER (ZOOM + DEEP SHADOW) */
.art-card:hover {
  transform: scale(1.06);   /* 🔥 zoom effect */
  
  box-shadow: 
    0 25px 50px rgba(0,0,0,0.25),   /* main deep shadow */
    0 10px 20px rgba(0,0,0,0.15),   /* soft layer */
    0 0 0 2px rgba(255,160,122,0.25); /* subtle glow border */
}

/* IMAGE */
.art-img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 14px;
  border: 6px solid white;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
}

/* CONTENT */
.art-title {
  font-family: 'Indie Flower', cursive;
  font-size: 1.7rem;
  color: #333;
  margin-bottom: 5px;
  z-index: 1;
  position: relative;

  text-align: center;   /* ✅ ADD THIS */
}

.art-desc {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 8px;
  z-index: 1;
  position: relative;
}

/* PRICE */
.price-row {
  display: flex;
  justify-content: center;   /* ✅ center price */
  align-items: center;
  gap: 8px;
  z-index: 1;
  position: relative;
  font-size:2rem;
}

.old {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
}

.new {
  font-weight: bold;
  font-size: 1.3rem;
  color: #e63946;
}

/* HEADING */
.heading {
  font-family: 'Indie Flower', cursive;
  text-align: center;
  font-size: 3rem;
  margin-top: 120px;
  margin-bottom: 40px;
  color: #e63946;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .art-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .art-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .art-grid {
    grid-template-columns: 1fr;
  }
}
`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div>

      <h1 className="heading">🎨 Top Artworks</h1>

      <div className="art-grid">
        {artworks.map((art) => (
          <div className="art-card" key={art.id}>

            <img src={art.image} className="art-img" alt={art.title} />

            <h3 className="art-title">{art.title}</h3>

            <p className="art-desc">{art.description}</p>
<div className="price-row">
 <i 
  className="fas fa-tag" 
  style={{ color: "#ffb6c1", fontSize: "20px" }}
></i>
  <span className="new">Price :   <span className="old">₹{art.oldPrice}</span> ₹{art.price}</span>
</div>

          </div>
        ))}
      </div>

    </div>
  );
};

export { TopArtworks };