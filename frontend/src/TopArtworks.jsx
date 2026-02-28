import React from "react";
import artworks from "./data/artworks.json";

const TopArtworks = () => {
  return (
    <div style={{ paddingBottom: "100px" }}>
      
      {/* 🔥 HEADING (same as yours) */}
      <h2
        style={{
          fontFamily: "cursive",
          fontWeight: "bold",
          fontSize: "3.4rem",
          color: "#333",
          display: "flex",
          paddingTop: "160px",
          paddingBottom: "60px",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          animation: "slideIn 1.5s ease-out"
        }}
      >
        <span style={{ animation: "bounceArt 1.8s infinite" }}>🖌️</span>
        <span style={{ animation: "pulseColor 3s infinite" }}> Top </span>
        <span style={{ animation: "pulseColor 5s infinite" }}> Art </span>
        <span style={{ animation: "pulseColor 7s infinite" }}> Works </span>
        <span style={{ animation: "bounceArt 1.8s infinite" }}>🎨🖼️</span>
      </h2>

      {/* 🔥 CARDS */}
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-4 g-4">

          {artworks.map((art) => (
            <div className="col" key={art.id}>
              <div className="card h-100 shadow-card">

                <img
                  src={art.image}
                  className="card-img-top"
                  style={{
                    height: "400px",
                    objectFit: "cover",
                    border: "10px solid white"
                  }}
                  alt={art.title}
                />

                <div className="card-body bg-light">
                  <h5 className="card-title">{art.title}</h5>

                  <p className="card-text">{art.description}</p>

                  <div className="d-flex align-items-center gap-2">
                    <p className="mb-0 fw-semibold text-dark">Price:</p>

                    <h6 className="mb-0 text-muted text-decoration-line-through">
                      ₹{art.oldPrice}
                    </h6>

                    <p className="mb-0 fw-bold fs-5">
                      ₹{art.price}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* 🔥 SAME CSS */}
      <style>
        {`
        .shadow-card {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 16px !important;
        }

        .shadow-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.65);
        }

        /* animations same as yours */
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounceArt {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes pulseColor {
          0% { color: #000000e9; }
          50% { color: #00000060; }
          100% { color: #000000ff; }
        }
        `}
      </style>

    </div>
  );
};

export  {TopArtworks};