import React, { useEffect } from "react";
import tutorials from "./data/learn.json";

const Learn = () => {

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
  50% { transform: translateY(-12px); }
}
@keyframes rotateEarth {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes pulseColor {
  0% { color: #000000e9; }
  50% { color: #555; }
  100% { color: #000000ff; }
}

/* ===== HEADINGS ===== */
.heading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 60px;
}

.heading-large {
  font-family: cursive;
  font-size: 4rem;
  animation: slideIn 1.2s ease-out;
}

.heading-small {
  font-family: cursive;
  font-size: 2.4rem;
  animation: slideIn 1.2s ease-out;
}

.sup-text {
  font-size: 0.6em;
  vertical-align: super;
  animation: pulseColor 3s infinite;
}

.icon-bounce { display: inline-block; animation: bounceArt 1.8s infinite; }
.icon-rotate { display: inline-block; animation: rotateEarth 8s linear infinite; }

/* ===== SECTION ===== */
.learn-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 60px;
  padding: 80px 40px;
}

/* ===== CARD ===== */
.flip-card {
  width: 320px;
  height: 573px;
  perspective: 1200px;
}

/* 🔥 FIX: GPU SMOOTH */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s ease-in-out; /* ✅ removed delay */
  will-change: transform;
}

/* 🔥 SMOOTH HOVER */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* FRONT */
.flip-card-front {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 25px rgba(0,0,0,0.2);
  background: black;
}

.flip-card-front video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* BACK */
.flip-card-back {
  position: absolute;
  width: 100%; /* ✅ FIXED */
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);

  background: linear-gradient(135deg, #ff6a6a, #5be562);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px;

  border: 4px solid #ffffffcc;
  border-radius: 20px;

  overflow: hidden; /* ✅ IMPORTANT */

  animation: glowBg 5s ease-in-out infinite alternate;
}

/* 🔥 FIXED EMOJIS (INSIDE ONLY) */
.flip-card-back::before,
.flip-card-back::after {
  content: '🎨 ✏️ 🧑‍🎨 🖌️ 🖼️';
  position: absolute;
  font-size: 70px;
  opacity: 0.12;
  color: #ffffff;
  white-space: nowrap;
  pointer-events: none;
}

.flip-card-back::before {
  top: 20%;
  left: -20px;
  transform: rotate(-20deg);
}

.flip-card-back::after {
  bottom: 10%;
  right: -20px;
  transform: rotate(15deg);
}

/* GLOW */
@keyframes glowBg {
  0% {
    box-shadow: 0 0 15px #ff6a88, 0 0 25px #5b86e5;
  }
  100% {
    box-shadow: 0 0 30px #fbc2eb, 0 0 50px #a18cd1;
  }
}

/* TITLE */
.art-title {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(to right, #fff, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 1;
}

/* DESCRIPTION */
.art-description {
  font-size: 1rem;
  color: #fff;
  background: rgba(255,255,255,0.12);
  padding: 14px;
  border-radius: 12px;
  line-height: 1.6;
  z-index: 1;
}

/* SPARKLE */
.sparkles {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  animation: spin 6s linear infinite;
  opacity: 0.6;
}

@keyframes spin {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}
`;

    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div>

      {/* HEADINGS */}
      <div className="heading-container">
        <div className="heading-large">
          <span className="icon-bounce">🖌️</span>
          <span className="sup-text">Dive Into</span>
          The World of Art
          <span className="icon-bounce">✍️</span>
        </div>

        <div className="heading-small">
          <span className="icon-bounce">🎨</span>
          <span className="sup-text">Learn Art &</span>
          Create Magic
          <span className="icon-rotate">🌟</span>
        </div>
      </div>

      {/* CARDS */}
      <div className="learn-section">
        {tutorials.map((item, index) => (
          <div className="flip-card" key={index}>
            <div className="flip-card-inner">

              <div className="flip-card-front">
                <video autoPlay muted loop playsInline>
                  <source src={`/static/${item.video}`} type="video/mp4" />
                </video>
              </div>

              <div className="flip-card-back">
                <div className="sparkles">🌟</div>

                <div className="art-title">🎨 {item.title}</div>

                <div className="art-description">
                  {item.description}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
<iframe
  src="https://www.wikipedia.org/"
  style={{ height: "1800px", width: "1500px" }}
  title="wikipedia"
/>
    </div>
  );
};

export default Learn;