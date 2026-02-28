import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
const [user, setUser] = useState(null);
const [title, setTitle] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [file, setFile] = useState(null);
const handleUpload = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  if (!file) {
    alert("Please select image");
    return;
  }
if (!title || !price || !description) {
  alert("Please fill all fields");
  return;
}
  const formData = new FormData();
  formData.append("title", title);
formData.append("price", Number(price));
  formData.append("description", description);
  formData.append("image", file);

  try {
const res = await fetch("http://localhost:5001/api/artworks/upload", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + token
  },
  body: formData
});

if (!res.ok) {
  const error = await res.text();
  console.error(error);
  alert("Upload failed ❌");
  return;
}

const data = await res.json();
console.log(data);
alert("Artwork uploaded 🎉");

setTitle("");
setPrice("");
setDescription("");
setFile(null);



    setShowUpload(false);

  } catch (err) {
    console.error(err);
    alert("Upload failed ❌");
  }
};
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  setUser(storedUser);
}, []);
  const [open, setOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const messages = [
    "Search your art   ",
    "Find masterpieces   ",
    "Explore charcoal sketches  ",
  ];
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  alert("Logged out");
  window.location.href = "/";
};
  const [placeholder, setPlaceholder] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [hovered, setHovered] = useState(null);

  const inputRef = useRef(null);

  // ✨ Typing animation
  useEffect(() => {
    const currentMessage = messages[msgIndex];

    const timeout = setTimeout(() => {
      if (typing) {
        if (charIndex < currentMessage.length) {
          setCharIndex(charIndex + 1);
          setPlaceholder(
            currentMessage.substring(0, charIndex + 1) +
              (charIndex % 2 === 0 ? "|" : "")
          );
        } else setTyping(false);
      } else {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
        } else {
          setTyping(true);
          setMsgIndex((msgIndex + 1) % messages.length);
        }
      }
    }, typing ? 120 : 60);

    return () => clearTimeout(timeout);
  }, [charIndex, typing, msgIndex]);

  const linkStyle = { textDecoration: "none", color: "inherit" };

const styles = {
  navbar: {
    height: "70px",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",

    /* 🎨 soft artistic base */
    background: "#ffffffee",
    borderRadius: "0 0 30px 30px",

    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    position: "relative",
    overflow: "hidden",
  },

  /* ✨ refined artistic buttons */
  btn: (id) => ({
    background:
      hovered === id
        ? "linear-gradient(135deg, #ffd6e0, #ffe5ec)"
        : "#fff5f7",

    padding: "5px 16px",
    borderRadius: "16px",
    color: "#333",

    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",

    cursor: "pointer",

    border: "2px dashed rgba(255,182,193,0.25)",

    transition: "all 0.25s ease",

    transform: hovered === id ? "translateY(-2px) scale(1.03)" : "none",

    boxShadow:
      hovered === id
        ? "0 8px 20px rgba(255,182,193,0.35)"
        : "0 2px 6px rgba(0,0,0,0.05)",
  }),

  searchWrapper: {
    width: "25%",
    position: "relative",
  },

  /* 🎯 soft artistic input */
  searchInput: {
    marginTop: "6px",
    width: "100%",
    borderRadius: "16px",
    border: "1px solid rgba(255, 0, 38, 0.25)",
    padding: "9px 14px",
    paddingRight: "40px",
    fontSize: "14px",

    background: "#fff5f7",

    boxShadow: "inset 0 0 6px rgba(255,182,193,0.25)",

    outline: "none",
    transition: "all 0.25s ease",
  },

  searchBtn: {
    position: "absolute",
    right: "8px",
    top: "26%",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#e63946",
  },
};

  const navItems = [
    { id: "home", to: "/home", icon: "fa-house", label: "Home" },
    { id: "art", to: "/AllArtworks", icon: "fa-image", label: "All Artworks" },
    { id: "learn", to: "/learn", icon: "fa-paintbrush", label: "Learn Art" },
    { id: "cart", to: "/cart", icon: "fa-cart-shopping", label: "Cart" },
    { id: "contact", to: "/contact", icon: "fa-comments", label: "Contact Us" },
    { id: "profile", to: "/profile", icon: "fa-user", label: "Profile" },
  ];

  return (
    <>
      {/* HEADER */}
      <nav style={styles.navbar}>
<div className="container-fluid d-flex align-items-center justify-content-between flex-wrap">

          {navItems.slice(0, 3).map((item) => (
            <Link key={item.id} to={item.to}
              style={{ ...linkStyle, ...styles.btn(item.id) }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <i className={`fa-solid ${item.icon}`}></i>
              {item.label}
            </Link>
          ))}

          {/* SEARCH */}
          <form className="mx-2" style={styles.searchWrapper}>
            <input
              ref={inputRef}
              type="search"
              placeholder={placeholder}
              style={styles.searchInput}
            />
            <button style={styles.searchBtn}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          {navItems.slice(3).map((item) =>
            item.id === "profile" ? (
              <button
                key={item.id}
                style={styles.btn(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setOpen(true)}
              >
                <i className={`fa-solid ${item.icon}`}></i>
                {item.label}
              </button>
            ) : (
              <Link key={item.id} to={item.to}
                style={{ ...linkStyle, ...styles.btn(item.id) }}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <i className={`fa-solid ${item.icon}`}></i>
                {item.label}
              </Link>
            )
          )}
        </div>
      </nav>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 40
          }}
        />
      )}

      {/* 🎨 ARTISTIC SIDEBAR */}
      <div
        className="artist-panel"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)"
        }}
      >
        <h5 style={{ textAlign: "center", marginTop: "20px" }}>🎨 Your Profile</h5>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <img
            src="/static/budha.jpg"
            style={{ width: 200, height: 200, borderRadius: "50%" }}
          />
         <h4>{user?.username || "Guest User"}</h4>
        </div>

        {/* INFO */}
        <div style={{ marginTop: "20px" }}>
<div className="profile-card">
  <div>Email: {user?.email || "Not available"}</div>
</div>

<div className="profile-card">
  <div>Phone: {user?.phone || "Not available"}</div>
</div>
        </div>

        {/* BUTTONS */}
        <div
          style={{
            marginTop: "45px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
            fontSize: "1.4rem"
          }}
        >
<button
  style={{ ...styles.btn("logout"), width: "80%", justifyContent: "center" }}
  onClick={handleLogout}
  onMouseEnter={() => setHovered("logout")}
  onMouseLeave={() => setHovered(null)}
>
  🚪 Logout
</button>

{user?.role === "seller" && (
  <button
    style={{ ...styles.btn("upload"), width: "80%", justifyContent: "center" }}
    onMouseEnter={() => setHovered("upload")}
    onMouseLeave={() => setHovered(null)}
    onClick={() => setShowUpload(true)}
  >
    ⬆ Upload Artwork
  </button>
)}
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div
          onClick={() => setShowUpload(false)}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 200
          }}
        >
          <div onClick={(e) => e.stopPropagation()} className="glass-box">
            <h3>🎨 Upload Artwork</h3>

<input
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<input
  type="number"
  placeholder="Price"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>

<textarea
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

<input
  type="file"
  onChange={(e) => setFile(e.target.files[0])}
/>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
<button
  style={{
    marginLeft: "110px",
    padding: "10px 32px",
    border: "none",
    borderRadius: "25px",
    fontSize: "1.3rem",
    background: "#a8e6cf",
    color: "#1b4332",
    cursor: "pointer",
    transition: "all 0.25s ease"
  }}

  // 🔥 ADD THIS
  onClick={handleUpload}

  onMouseEnter={(e) => {
    e.target.style.background = "#95d5b2";
    e.target.style.transform = "translateY(-2px)";
    e.target.style.boxShadow = "0 6px 15px rgba(0,0,0,0.15)";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "#a8e6cf";
    e.target.style.transform = "none";
    e.target.style.boxShadow = "none";
  }}
  onMouseDown={(e) => {
    e.target.style.transform = "scale(0.96)";
  }}
  onMouseUp={(e) => {
    e.target.style.transform = "translateY(-2px)";
  }}
>
  Upload
</button>
            </div>
          </div>
        </div>
      )}

      {/* CSS */}
      <style>{`
      /* 🌸 soft floating colors (not too loud) */
nav::before,
nav::after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, #d1f9fa, #f3e8a7);
  border-radius: 50%;
  animation: floatBlob 2s ease-in-out infinite alternate;
  opacity: 0.4;
  z-index: 0;
}

nav::before {
  top: -60px;
  left: -60px;
}

nav::after {
  bottom: -60px;
  right: -60px;
}

@keyframes floatBlob {
  0% { transform: scale(1); }
  100% { transform: scale(1.15) translateY(-20px); }
}

/* ✨ input focus */
input[type="search"]:focus {
  box-shadow: 0 0 12px rgba(255,182,193,0.5);
  transform: scale(1.02);
}
        .artist-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 370px;
          height: 100%;
          background: linear-gradient(to bottom, #fff5f7, #e0f7fa);
          padding: 20px;
          transition: 0.5s;
          z-index: 50;
          overflow: hidden;
        }

        .artist-panel::before,
        .artist-panel::after {
          content: "";
          position: absolute;
          width: 150px;
          height: 150px;
         background: radial-gradient(circle, #dbeafe, #fbcfe8);
          border-radius: 50%;
          animation: floatBlob 3s infinite alternate;
          opacity: 0.5;
        }

        .artist-panel::before { top: -40px; left: -40px; }
        .artist-panel::after { bottom: -40px; right: -40px; }

        @keyframes floatBlob {
          from { transform: scale(1); }
          to { transform: scale(1.2) translateY(-30px); }
        }

        .profile-card {
          background: white;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 15px;
        }

        .glass-box {
          width: 420px;
          padding: 25px;
          border-radius: 20px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.3);
        }

.glass-box input,
.glass-box textarea {
  width: 100%;
  margin-bottom: 12px;
  padding: 12px 16px;
  font-size: 1rem;

  /* 🔥 glass effect */
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);

  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 12px;

  /* subtle inner depth */
  box-shadow: inset 0 0 6px rgba(0,0,0,0.1);

  color: #333;
  outline: none;
  transition: all 0.35s ease;
}

/* ✨ hover (soft glow + lift) */
.glass-box input:hover,
.glass-box textarea:hover {
  box-shadow: 
    0 0 10px rgba(255, 143, 171, 0.4),
    inset 0 0 6px rgba(0,0,0,0.1);

  transform: scale(1.02);
}

/* 🔥 focus glow (same pink aesthetic) */
.glass-box input:focus,
.glass-box textarea:focus {
  border: 1px solid rgba(255, 143, 171, 0.6);

  box-shadow: 
    0 0 12px #ffd3e2,
    0 0 18px #ff8fab,
    inset 0 0 6px rgba(0,0,0,0.1);

  transform: scale(1.03);
}
      `}</style>
    </>
  );
};

export { Header };