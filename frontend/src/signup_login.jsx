import React, { useState, useEffect } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // 🎨 Inject Artistic CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    
    body {
      background: linear-gradient(to right, #e1ece8, #e7ebe0, #eee8e3);
      font-family: 'Poppins', sans-serif;
    }

    .auth-wrapper {
      max-width: 420px;
      margin: 80px auto;
      background: #ffffffdd;
      backdrop-filter: blur(20px);
      border-radius: 25px;
      padding: 30px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.2);
      position: relative;
      overflow: hidden;
      animation: fadeIn 0.8s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-30px);}
      to { opacity: 1; transform: translateY(0);}
    }

    /* floating blobs */
    .auth-wrapper::before,
    .auth-wrapper::after {
      content: "";
      position: absolute;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, #fcd5ce, #ffb4a2);
      border-radius: 50%;
      opacity: 0.5;
      z-index: 0;
      animation: floatBlob 10s infinite alternate;
    }

    .auth-wrapper::before {
      top: -40px;
      left: -40px;
    }

    .auth-wrapper::after {
      bottom: -40px;
      right: -40px;
    }

    @keyframes floatBlob {
      0% { transform: scale(1) translateY(0);}
      100% { transform: scale(1.2) translateY(-20px);}
    }

    h2 {
      text-align: center;
      font-family: 'Indie Flower', cursive;
      font-size: 2rem;
      color: #e63946;
      margin-bottom: 20px;
      position: relative;
      z-index: 2;
    }

    .input-group {
      margin-bottom: 15px;
      position: relative;
      z-index: 2;
    }

    .input-group label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #333;
    }

.input-group input,
.input-group select {
  width: 100%;
  padding: 12px;

  /* 🔥 FORCE ALL CORNERS */
  border-radius: 12px !important;

  /* Optional (extra safe explicit corners) */
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  border: none;
  background: #fff0f6;
  font-size: 1rem;

  /* 🧠 Fix weird browser styles */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  transition: 0.3s;
}

    .input-group input:focus,
    .input-group select:focus {
      outline: none;
      box-shadow: 0 0 10px #f08080;
      transform: scale(1.02);
    }

    .btn-auth {
      width: 60%;
      padding: 12px;
      margin-top: 15px;
      margin-left: 65px;
      border-radius: 50px;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      background: white;
      box-shadow: 0 3px 8px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
      z-index: 2;
      position: relative;
    }

    .btn-auth:hover {
      background: linear-gradient(to left, #ffafcc, #e63946);
      transform: scale(1.05);
      color: white;
    }

    .toggle-text {
      text-align: center;
      margin-top: 15px;
      font-size: 14px;
      z-index: 2;
      position: relative;
    }

    .toggle-text span {
      color: #0077ff;
      cursor: pointer;
      font-weight: bold;
    }

    `;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  // 🧠 Handlers (connect to backend later)
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const username = e.target[0].value;
    const password = e.target[1].value;

    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    console.log("STATUS:", res.status);

    const data = await res.json();
    console.log("DATA:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
window.dispatchEvent(new Event("storage"));  // 🔥 FORCE UPDATE
      alert("Login success");
      window.location.href = "/home";
    } else {
      alert("Login failed");
    }
  } catch (err) {
    console.error("FETCH ERROR:", err);
    alert("Cannot connect to backend ❌");
  }
};
const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const username = e.target[0].value;
    const email = e.target[1].value;
    const phone = e.target[2].value;
    const password = e.target[3].value;
    const role = e.target[5].value;

    const res = await fetch("http://localhost:5001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, phone, password, role })
    });

    console.log("STATUS:", res.status);

    const data = await res.json();
    console.log("DATA:", data);

    alert("Signup success");
    setIsLogin(true);
  } catch (err) {
    console.error("ERROR:", err);
    alert("Backend not reachable ❌");
  }
};
  return (
    <div className="auth-wrapper">
      {isLogin ? (
        <>
          <h2>🎨 Welcome Back Artist</h2>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input type="text" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" required />
            </div>

            <button className="btn-auth">Login</button>
          </form>

          <div className="toggle-text">
            Don't have an account?{" "}
            <span onClick={() => setIsLogin(false)}>Signup here</span>
          </div>
        </>
      ) : (
        <>
          <h2>🖌️ Join the Art World</h2>

          <form onSubmit={handleSignup}>
            <div className="input-group">
              <label>Username</label>
              <input type="text" required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" required />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input type="text" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" required />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" required />
            </div>

            <div className="input-group">
              <label>I want to</label>
              <select required>
                <option value="buyer">Buy Art</option>
                <option value="seller">Sell Art</option>
              </select>
            </div>

            <button className="btn-auth">Signup</button>
          </form>

          <div className="toggle-text">
            Already have an account?{" "}
            <span onClick={() => setIsLogin(true)}>Login here</span>
          </div>
        </>
      )}
    </div>
  );
};

export { AuthPage};