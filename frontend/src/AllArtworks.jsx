import React, { useEffect, useState } from "react";

const AllArtworks = () => {
const [artworksData, setArtworksData] = useState([]);

useEffect(() => {
  fetch("http://localhost:5001/api/artworks")
    .then(res => res.json())
    .then(data => setArtworksData(data));
}, []);
  // ✅ PAGINATION STATE (same behavior)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(artworksData.length / itemsPerPage);

  const currentArtworks = artworksData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ CART (same logic)
const addToCart = async (art) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location = "/";
    return;
  }

  await fetch("http://localhost:5001/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token   // 🔥 IMPORTANT
    },
    body: JSON.stringify({ artworkId: art._id })
  });

  alert("Added to cart!");
};

  // ✅ FULL CSS (EXACT SAME AS YOUR HTML)
  useEffect(() => {
    const style = document.createElement("style");
style.innerHTML = `

body {
  background: linear-gradient(to right, #e1ece8ff, #e7ebe0ff, #eee8e3ff);
}

/* ===== ANIMATIONS ===== */
@keyframes slideIn {
  0% { opacity: 0; transform: translateY(-30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes bounceArt {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes pulseColor {
  0% { color: #000000e9; }
  50% { color: #00000060; }
  100% { color: #000000ff; }
}

/* ===== HEADER AREA ===== */
.a{
  display:flex;
  height:26px;
  padding-bottom:200px;
  padding-left:200px;
}

.logos{
  width:80px;
  margin-top:54px;
  margin-left:60px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}

.logo-title {
  font-size: 1rem;
  color: #fff;
  margin-top: 3px;
}

/* ===== GRID (MORE SPACING) ===== */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
}

.art-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 40px;   /* horizontal */
  row-gap: 50px;      /* 🔥 MORE vertical space */
  margin-top: 40px;
  margin-bottom:100px;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .art-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 900px) {
  .art-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 500px) {
  .art-grid { grid-template-columns: 1fr; }
}

/* REMOVE CENTER ISSUE */
.art-col {
  display: block;
}

/* ===== CARD ===== */
.art-creative-card {
  width: 100%;
  background: #ffffffdd;
  border: 2px dashed #ffa07a;
  border-radius: 20px;
  padding: 6px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.4s ease, transform 0.35s ease;
}

/* 🎨 BLOBS */
.art-creative-card::before,
.art-creative-card::after {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #fcd5ce, #ffb4a2);
  border-radius: 50%;
  opacity: 0.3;
  z-index: 0;
}

.art-creative-card::before {
  top: -40px;
  left: -40px;
}

.art-creative-card::after {
  bottom: -50px;
  right: -50px;
}

/* 🔥 DARK ZOOM HOVER */
.art-creative-card:hover {
  transform: scale(1.04);   /* 🔥 zoom instead of translate */
  box-shadow:
    0 20px 40px rgba(0,0,0,0.25),
    0 0 0 2px rgba(255,160,122,0.4),
    0 0 35px rgba(255,160,122,0.35);
}

/* ===== IMAGE ===== */
.art-image-section {
  height: 360px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.art-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
  border: 2px solid white;
}

/* ===== CONTENT ===== */
.art-info-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  z-index: 1;
}

.art-title {
  font-family: 'Indie Flower', cursive;
  font-size: 1.6rem;
  text-align: center;
  margin-top: 8px;
}

.art-description {
  font-size: 0.9rem;
  color: #555;
  font-style: italic;
  margin-bottom: 8px;
}

/* PRICE */
.art-price-bar {
  padding: 5px;
}

.art-price-amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: #888;
  position: relative;   /* 🔥 REQUIRED */
}

/* 🔥 DIMENSION LABEL */
.art-price-amount::after {
  content: '(30×40 cm)';   /* ✅ updated size */
  position: absolute;
  right: -80px;
  top: -10px;
  font-size: 0.7rem;
  color: #666;
  opacity: 0.8;
}
/* ===== BUTTONS ===== */
.art-actions {
  display: flex;
  justify-content: space-evenly;
  margin-top: auto;
  gap: 12px;
}

/* 🎨 BASE */
.btn-art-purchase,
.btn-art-cart {
  position: relative;
  border: 1px solid #ddd;
  padding: 10px 18px;
  border-radius: 50px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1;
}

/* 🔥 4 SMALL BLOBS USING BEFORE + AFTER + INNER SPANS */

/* TOP LEFT BIG SOFT */
.btn-art-purchase::before,
.btn-art-cart::before {
  content: "";
  position: absolute;
  width: 22px;
  height: 22px;
  background: #ffb4a2;
  border-radius: 50%;
  top: -6px;
  left: -6px;
  opacity: 0.25;
}

/* BOTTOM RIGHT MEDIUM */
.btn-art-purchase::after,
.btn-art-cart::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  background: #fcd5ce;
  border-radius: 50%;
  bottom: -5px;
  right: -5px;
  opacity: 0.25;
}

/* EXTRA BLOBS (2 more using spans) */
.btn-art-purchase span,
.btn-art-cart span {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

/* CENTER FLOAT */
.btn-art-purchase span:nth-child(1),
.btn-art-cart span:nth-child(1) {
  width: 10px;
  height: 10px;
  background: #ffd6a5;
  top: 40%;
  left: 65%;
  opacity: 0.3;
}

/* SIDE DOT */
.btn-art-purchase span:nth-child(2),
.btn-art-cart span:nth-child(2) {
  width: 8px;
  height: 8px;
  background: #ffe5d9;
  bottom: 30%;
  left: 15%;
  opacity: 0.35;
}

/* 🔥 HOVER */
.btn-art-purchase:hover,
.btn-art-cart:hover {
  transform: scale(1.07);
  box-shadow: 0 12px 28px rgba(0,0,0,0.18);
}

/* SUBTLE COLOR FEEL */
.btn-art-purchase:hover {
  background: #f8fff8;
}

.btn-art-cart:hover {
  background: #f5faff;
}

/* CLICK */
.btn-art-purchase:active,
.btn-art-cart:active {
  transform: scale(0.96);
}
/* ===== PAGINATION ===== */
.art-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  padding: 30px 0;
  flex-wrap: wrap;
}

.art-page-btn,
.art-nav-btn {
  padding: 10px 20px;
  border-radius: 30px;
  border: 1.5px solid #d6d6d6;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.art-page-btn.active {
  background: #fdf0cf;
}

.art-page-btn:hover,
.art-nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

/* SCROLL TEXT */
@keyframes scrollText {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
`;
  document.head.appendChild(style);
  return () => {
    document.head.removeChild(style);
  };
}, []);

  return (
    <div>

{/* TITLE */}
<div
  style={{
    display: "flex",
    alignItems: "center",   // 🔥 aligns vertically
    justifyContent: "space-between",
    padding: "40px",
    flexWrap: "wrap"
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    
    <p
      style={{
        fontSize: "2.4rem",
        fontFamily: "Times New Roman",
        margin: 0   // 🔥 remove default spacing
      }}
    >
      Art Selling
    </p>

    {/* 🔥 BETTER THAN MARQUEE */}
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: "160px",
      }}
    >
<div
  style={{
    display: "inline-block",
    animation: "scrollText 8s linear infinite",
    fontWeight: "400",
    color: "#555",
    fontSize: "0.75rem"   // ✅ reduced size
  }}
>🎨 100+ Best Artworks • Premium Collection • Explore Now •
      </div>
    </div>

  </div>
</div>

      {/* HEADING */}
      <div className="a">
        <div className="logos" style={{ animation: "bounceArt 1.8s infinite" }}>
          <div className="logo-container">
            <img src="/static/logo.jpg" alt="logo" />
            <div className="logo-title">Aryavarta Artists</div>
          </div>
        </div>

        <h2 style={{
          fontFamily: "cursive",
          fontSize: "3.4rem",
          paddingTop: "60px",
          paddingLeft: "30px",
          animation: "slideIn 1.5s"
        }}>
          <span style={{ animation: "pulseColor 3s infinite" }}>The Wall </span>
          <span style={{ animation: "pulseColor 5s infinite" }}>of Art </span>
          <span style={{ animation: "pulseColor 7s infinite" }}>Explore All Creations</span>
        </h2>
      </div>

      {/* GRID */}
      <div className="container">
        <div className="art-grid">

          {currentArtworks.map((art, index) => (
            <div key={index} className="art-col">
              <div className="art-creative-card">

                <div className="art-image-section">
                  <img src={`http://localhost:5001${art.image}`} className="art-img" alt={art.title} />
                </div>

                <div className="art-info-section">
                  <h5 className="art-title">{art.title}</h5>
                  <p className="art-description">{art.description}</p>

                  <div className="art-price-bar">
                    <span className="art-price-amount">
                      <i className="fas fa-tag"></i> Price : ₹{art.price}
                    </span>
                  </div>

                  <div className="art-actions">
                    <button className="btn-art-purchase">🎨 Buy Now</button>
                    <button className="btn-art-cart" onClick={() => addToCart(art)}>
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* PAGINATION */}
<div className="art-pagination">

  {/* PREV */}
  {currentPage > 1 && (
    <button
      className="art-nav-btn"
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      <i className="fas fa-arrow-left"></i> Prev
    </button>
  )}

  {/* PAGE RANGE LOGIC */}
  {(() => {
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    // FIX when at beginning
    if (currentPage === 1) {
      end = Math.min(3, totalPages);
    }

    // FIX when at end
    if (currentPage === totalPages) {
      start = Math.max(1, totalPages - 2);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => {
      const page = start + i;

      return (
        <button
          key={page}
          className={`art-page-btn ${currentPage === page ? "active" : ""}`}
          onClick={() => setCurrentPage(page)}
        >
          <i className={
            page === 1 ? "fas fa-palette" :
            page === 2 ? "fas fa-brush" :
            "fas fa-swatchbook"
          }></i>
          {page}
        </button>
      );
    });
  })()}

  {/* NEXT */}
  {currentPage < totalPages && (
    <button
      className="art-nav-btn"
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Next <i className="fas fa-arrow-right"></i>
    </button>
  )}

</div>

    </div>
  );
};

export { AllArtworks };