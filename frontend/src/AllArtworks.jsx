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
  10% { color: #000000dd; }
  20% { color: #000000d3; }
  30% { color: #000000b0; }
  40% { color: #00000086; }
  50% { color: #00000060; }
  60% { color: #0000007c; }
  70% { color: #00000096; }
  80% { color: #000000c1; }
  90% { color: #000000f0; }
  100% { color: #000000ff; }
}

/* ===== HEADER AREA ===== */
.a{
  display:flex;
  height:26px;
  padding-bottom:200px;
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

/* ===== GRID ===== */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
}

.art-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin-top: 40px;
  margin-bottom:100px;
}

@media (min-width: 1200px) {
  .art-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.art-col {
  display: flex;
  justify-content: center;
}

/* ===== CARD ===== */
.art-creative-card {
  width: 310px;
  height: 620px;
  background: white;
  border-radius: 24px;
  border: 8px solid white ;
  overflow: hidden;
  box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.12);
  transition: 0.4s;
}

.art-creative-card:hover {
  transform: scale(1.03);
  box-shadow: 0 20px 40px rgba(0,0,0,0.76);
}

.art-image-section {
  height: 370px;
  overflow: hidden;
}

.art-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 22px;
}

.art-info-section {
  height: 230px;   /* 🔥 FIXED CONTENT AREA */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.art-title {
  font-family: cursive;
  font-size: 1.8rem;
  margin-top: 10px;

  text-align: center;   /* ✅ ADD THIS */
}

.art-description {
  font-size: 0.9rem;
  color: #444;
  font-style: italic;

  height: 60px;              /* 🔥 FIXED HEIGHT */
  overflow: hidden;

  display: -webkit-box;
  -webkit-line-clamp: 3;     /* max 3 lines */
  -webkit-box-orient: vertical;
}

.art-price-bar {
  padding: 10px;
}

.art-price-amount {
  position: relative;

  top:-10px;
  margin-bottom:0px;
  font-size: 1.6rem;
  font-weight: bold;
  color: #888;
}

.art-price-amount::before {
  content: '(30x24)cm';
  position: absolute;
  left: 200px;
  top:-2    px;
  font-size: 0.65rem;
  color: #6c6c6c;
  animation: blinkNote 2s infinite;
}

@keyframes blinkNote {
  0%,100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* ===== BUTTONS ===== */
.art-actions {
  display: flex;
  justify-content: space-evenly;
  margin-top: auto;   /* 🔥 pushes to bottom */
}

.btn-art-purchase,
.btn-art-cart {
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-radius: 50px;
  font-size: 0.75rem;
  background: white;
  cursor: pointer;
  transition: 0.3s;
}

.btn-art-purchase:hover {
  background-color: #e8f5e9;
}

.btn-art-cart:hover {
  background-color: #e3f2fd;
}
/* ===== EXACT PAGINATION ===== */
.art-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  padding: 30px 0;
  flex-wrap: wrap;
  font-family: 'Segoe UI', sans-serif;
}

/* PAGE BUTTON */
.art-page-btn {
  padding: 10px 20px;
  border-radius: 30px;
  border: 1.5px solid #d6d6d6;
  background: linear-gradient(145deg, #ffffff, #f6f6f6);
  font-weight: 600;
  font-size: 0.95rem;
  color: #444;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}



.art-page-btn:hover {
  transform: translateY(-2px) scale(1.05);

  box-shadow: 0 6px 16px rgba(132,132,132,0.4);
}

.art-page-btn:hover::after {
  opacity: 1;
}

/* ACTIVE */
.art-page-btn.active {
  background: linear-gradient(145deg, #fdf0cf, #f5c9c4);
  border-color: #ffddd3;
  color: #222;
  animation: pulseActive 1.5s infinite;
}

@keyframes pulseActive {
  0%,100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* PREV / NEXT */
.art-nav-btn {
  padding: 10px 22px;
  border-radius: 30px;
  border: 1.5px solid #d6d6d6;
  background: linear-gradient(145deg, #ffffff, #f6f6f6);
  font-weight: 600;
  font-size: 0.95rem;
  color: #444;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: 0.3s;
}

/* HOVER */
.art-nav-btn:hover {
  background: linear-gradient(145deg, #f8f8f8, #ececec);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.art-nav-btn:hover i {
  animation: iconSlide 0.4s;
}

@keyframes iconSlide {
  0% { transform: translateX(0); }
  50% { transform: translateX(4px); }
  100% { transform: translateX(0); }
}
@keyframes scrollText {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
/* ICON COLOR FIX */
.art-page-btn i,
.art-nav-btn i {
  color: inherit;
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
            <div className="logo-title">Aryavarta Artseller</div>
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