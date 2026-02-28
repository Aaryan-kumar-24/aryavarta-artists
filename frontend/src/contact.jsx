import React, { useEffect, useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    state: "",
    city: "",
    address: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location = "/";
      return;
    }

    await fetch("http://localhost:5001/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(formData)
    });

    alert("Message sent successfully!");

    // ✅ optional: clear form after submit
    setFormData({
      phone: "",
      email: "",
      state: "",
      city: "",
      address: "",
      message: ""
    });
  };

  // ✅ Inject SAME CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
body {
  background: linear-gradient(to right, #e1ece8ff, #e7ebe0ff, #eee8e3ff);
}
.art-form-wrapper {
  max-width: 800px;
  margin: 100px auto;
  background: #ffffffdd;
  border: 5px dashed #ffa07a;
  border-radius: 30px;
  padding: 25px 30px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}
.art-form-wrapper::before,
.art-form-wrapper::after {
  content: "";
  position: absolute;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, #fcd5ce, #ffb4a2);
  border-radius: 50%;
  animation: floatBlob 12s ease-in-out infinite alternate;
  opacity: 0.6;
  z-index: 0;
}
.art-form-wrapper::before {
  top: -50px;
  left: -50px;
}
.art-form-wrapper::after {
  bottom: -60px;
  right: -60px;
}
@keyframes floatBlob {
  0% { transform: scale(1) translateY(0px); }
  100% { transform: scale(1.2) translateY(-20px); }
}
h1 {
  font-family: 'Indie Flower', cursive;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 25px;
  color: #e63946;
  position: relative;
}
h1::after {
  content: "💌";
  position: absolute;
  top: 5px;
  right: 20px;
  font-size: 1.6rem;
  animation: bounce 2s infinite ease-in-out;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
form {
  z-index: 2;
  position: relative;
}
.art-input-group {
  margin-bottom: 15px;
}
.art-input-group label {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #444;
  display: block;
}
.art-input-group input,
.art-input-group textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 25px;
  padding: 10px 14px;
  border: none;
  border-radius: 15px;
  background: #fff0f6;
  font-family: 'Indie Flower', cursive;
  font-size: 1.4rem;
  box-shadow: inset 0 0 5px #f08080;
  transition: all 0.3s ease;
}
.art-input-group input:focus,
.art-input-group textarea:focus {
  outline: none;
  box-shadow: 0 0 10px #f08080;
  transform: scale(1.02);
}
.btn-art-submit {
  border: 1px solid #ddd;
  padding: 10px 60px;
  margin-left: 170px;
  border-radius: 50px;
  font-size: 1.75rem;
  font-weight: 500;
  cursor: pointer;
  background-color: white;
  color: #333;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.28);
  transition: all 0.25s ease;
}
.btn-art-submit:hover {
  background: linear-gradient(to left, #ffafcc, #e63946);
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 182, 193, 0.4);
}
.row-cols-2 {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.row-cols-2 .art-input-group {
  flex: 1 1 48%;
}
@media (max-width: 768px) {
  .row-cols-2 .art-input-group {
    flex: 1 1 100%;
  }
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
    <div className="art-form-wrapper">
      <h1>Connect with Your Artistic Soul</h1>

      <form className="fun-form" onSubmit={handleSubmit}>
        <div className="row-cols-2">

          <div className="art-input-group">
            <label>📞 Your Magical Phone Number</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
            />
          </div>

          <div className="art-input-group">
            <label>📨 Your Email Id</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. artist@email.com"
            />
          </div>

          <div className="art-input-group">
            <label>🌍 Your State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="e.g Bihar"
            />
          </div>

          <div className="art-input-group">
            <label>🏙️ Your City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g Bangalore"
            />
          </div>

          <div className="art-input-group">
            <label>📍 Your Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 1234 Creative Lane"
            />
          </div>

          <div className="art-input-group">
            <label>🖼️ Your review Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your inspiration..."
            ></textarea>
          </div>

        </div>

        <button type="submit" className="btn-art-submit">
          🎉 Send This to Us
        </button>
      </form>
    </div>
  );
};

export { Contact };