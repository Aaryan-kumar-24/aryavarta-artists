import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

useEffect(() => {
  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5001/api/cart", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();

    setCart(data?.items || []);
  };

  fetchCart();
}, []);

const removeItem = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:5001/api/cart/remove/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });

  // ✅ REFRESH FROM BACKEND
  fetchCart();
};
const fetchCart = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5001/api/cart", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();
  setCart(data?.items || []);
};

useEffect(() => {
  fetchCart();
}, []);

const total = cart.reduce(
  (sum, item) =>
    sum +
    Number(
      item.artwork
        ? item.artwork.price
        : item.commission.price
    ),
  0
);

  // 🔥 EXACT SAME CSS (FULL COPY)
  useEffect(() => {
    const style = document.createElement("style");
  style.innerHTML = `
body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to right, #e1ece8, #e7ebe0, #eee8e3);
  animation: fadeInPage 1s ease forwards;
}

h1.title {
  text-align: center;
  font-size: 3rem;
  margin-top: 40px;
  color: #333;
  font-weight: bold;
  font-family: cursive;
  animation: slideDown 1s ease forwards;
}

.cart-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 25px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  animation: fadeInContainer 1s ease forwards;
}

/* ✅ EXACT CARD HOVER */
.art-card {
  display: flex;
  align-items: flex-start;
  background: linear-gradient(145deg, #fff6f6, #fdfdfd);
  border-radius: 20px;
  margin-bottom: 25px;
  padding: 15px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(50px);
  opacity: 0;
  animation: cardFadeIn 0.8s forwards;

  /* 🔥 IMPORTANT */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.art-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 30px rgba(0,0,0,0.15);
}

/* ✅ IMAGE HOVER ZOOM */
.art-img {
  width: 250px;
  height: 350px;
  border-radius: 15px;
  object-fit: cover;
  margin-right: 20px;
  transition: transform 0.5s ease;
}

.art-img:hover {
  transform: scale(1.05);
}

/* TEXT */
.art-details h4 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #000;
  font-family: cursive;
  margin-bottom: 10px;
  animation: fadeInText 0.8s ease forwards;
}

.art-description {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 15px;
  font-style: italic;
}

/* MESSAGE */
.purchase-message {
  font-size: 1rem;
  color: #2a2a2a;
  background: linear-gradient(145deg, #ffffff, #d4f8fc47);
  border-left: 4px solid #cecbcb;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-family: 'Segoe UI', sans-serif;
  opacity: 0;
  animation: messageFade 1s ease forwards;
  animation-delay: 0.3s;
}

.badge-price {
  font-size: 2.3rem;
  padding-left:120px;
  font-weight: bold;
  color: #888;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

/* ✅ BUTTONS EXACT */
.btn-art-purchase,
.btn-art-cart {
  width:160px;
  border: 1px solid #ddd;
  padding: 8px 18px;
  margin-right:40px;
  margin-left:40px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  background-color: white;
  color: #333;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.28);

  /* 🔥 EXACT TRANSITION */
  transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease;
}

/* REMOVE BUTTON */
.btn-remove {
  border-color: #ff4d4f;
  color: #ff4d4f;
}

.btn-remove:hover {
  background-color: #fff1f0;
  border-color: #ff4d4f;
  color: #a8071a;
  transform: translateY(-1px);
}

/* WISHLIST BUTTON */
.btn-wishlist {
  border-color: #1976d2;
  color: #1976d2;
}

.btn-wishlist:hover {
  background-color: #e3f2fd;
  border-color: #1976d2;
  color: #0d47a1;
  transform: translateY(-1px);
}

.card-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.total-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3436;
  text-align: right;
  margin-top: 30px;
  animation: fadeInText 1s ease forwards;
}

.action-buttons {
  display: flex;
  justify-content: space-between;   /* LEFT ↔ RIGHT */
  align-items: center;
  width: 100%;
  margin-top: 30px;
  gap: 20px;
}

/* 🔥 IMPORTANT → NO TEXT BREAK */
.btn-continue,
.btn-checkout {
  white-space: nowrap;      /* keeps text in one line */
  min-width: fit-content;   /* prevents shrink */
}

/* REMOVE SIDE MARGINS */
.btn-continue {
  margin-left: 0;
}

.btn-checkout {
  margin-right: 0;
}

/* 🔥 HOVER EFFECT (MATCHING YOUR DESIGN) */
.btn-continue:hover {
  background-color: #e8f5e9;
  border-color: #4caf50;
  color: #1b5e20;
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 12px rgba(76, 175, 80, 0.3);
}

.btn-checkout:hover {
  background-color: #fff3e0;
  border-color: #ff9800;
  color: #bf360c;
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 12px rgba(255, 152, 0, 0.3);
}

/* ANIMATIONS */
@keyframes fadeInPage { 0% { opacity: 0; } 100% { opacity: 1; } }
@keyframes slideDown { 0% { opacity: 0; transform: translateY(-50px);} 100% { opacity: 1; transform: translateY(0);} }
@keyframes fadeInContainer { 0% { opacity: 0; transform: translateY(30px);} 100% { opacity: 1; transform: translateY(0);} }
@keyframes cardFadeIn { 0% { opacity: 0; transform: translateY(50px);} 100% { opacity: 1; transform: translateY(0);} }
@keyframes fadeInText { 0% { opacity: 0; transform: translateY(20px);} 100% { opacity: 1; transform: translateY(0);} }
@keyframes messageFade { 0% { opacity: 0; transform: translateX(-30px);} 100% { opacity: 1; transform: translateX(0);} }
`;
  document.head.appendChild(style);
    return () => {
    document.head.removeChild(style);
  };
}, []);
  return (
    <div>
      <h1 className="title">🛒 My Art Cart</h1>

      <div className="cart-container">

        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            🎨 Your cart is empty. Add some creative magic!
          </p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                className="art-card"
                key={index}
                style={{ animationDelay: `${index * 0.15}s` }}
              >


{item.artwork ? (
  <img
    src={`http://localhost:5001${item.artwork.image}`}
    className="art-img"
  />
) : (
  <img
    src={`http://localhost:5001${item.commission.image}`}
    className="art-img"
  />
)}
                <div className="art-details">
<h4>
  🎨 {item.artwork ? item.artwork.title : "Custom Commission"}
</h4>

<p className="art-description">
  {item.artwork
    ? item.artwork.description
    : item.commission.custom}
</p>
{item.commission && (
  <div style={{ color: "#555", fontWeight: "bold" }}>
    Status: {item.commission.status}
  </div>
)}
                  {/* 🔥 IMPORTANT MESSAGE (YOU WERE MISSING THIS) */}
                  <div className="purchase-message">
                    🎨 This unique artwork brings creativity and inspiration into your space.
                    Owning it supports the artist and adds timeless beauty to your collection.
                    Thank you for choosing this masterpiece! 💖
                  </div>

<span className="badge-price">
  Price : ₹{item.artwork ? item.artwork.price : item.commission.price}
</span>
                  <div className="card-buttons">
                    <button
                      className="btn-art-purchase btn-remove"
                 onClick={() =>
  removeItem(item.artwork?._id || item.commission?._id)
}
                    >
                      🗑 Remove
                    </button>

                    <button className="btn-art-cart btn-wishlist">
                      ❤️ Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="total-price">
              Total: ₹{total.toLocaleString("en-IN")}
            </div>

<div className="action-buttons">
  <Link to="/AllArtworks" className="btn-art-cart btn-continue">
    <i className="fas fa-arrow-left"></i> Continue Shopping
  </Link>

  <button className="btn-art-purchase btn-checkout">
    Proceed to Checkout <i className="fas fa-arrow-right"></i>
  </button>
</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;