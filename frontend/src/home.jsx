  import React, { useEffect, useState , useRef } from "react";   
  import { Link } from "react-router-dom";

  import { ArtistSlider } from "./ArtistSlider";
  import { TopArtworks } from "./TopArtworks";
  const Home = () => {
    const [role, setRole] = useState("");

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      setRole(user?.role);
    }, []);

    return (
      <>
        <CarouselComponent />
        <TopArtworks />
        <ArtistSlider />

        {/* 👇 SHOW BASED ON ROLE */}
        {role === "buyer" && <CommissionForm />}
        {role === "seller" && <ArtistDashboard />}
  <NotificationBar />
      </>
    );
  };

  export {Home} ;

  const CarouselComponent = () => {

    useEffect(() => {
      // Initialize Bootstrap carousel manually
      const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return (
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide col-12"
        data-bs-ride="carousel"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
          ></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active" data-bs-interval="2000">
            <img
              src="/images/c2.jpg"
              height="400px"
              className="d-block w-100"
              alt="slide1"
            />
            <div className="carousel-caption g-4 d-none d-md-block">

            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="/images/c1.jpg"
              height="400px"
              className="d-block w-100"
              alt="slide2"
            />
            <div className="carousel-caption g-5 d-none d-md-block">

            </div>
          </div>

          {/* Slide 3 */}

        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    );
  };

  export { CarouselComponent};

const CommissionForm = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const res = await fetch("http://localhost:5001/api/auth/artists");
      const data = await res.json();
      setArtists(data);
    };

    fetchArtists();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    phone: "",
    email: user?.email || "",
    medium: "",
    price: "",
    artist: "",
    custom: "",
    image: null,
    agree: false,
  });

  // ✅ file reset ref
  const fileRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formDataObj = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    await fetch("http://localhost:5001/api/commission", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formDataObj,
    });

    alert("Commission sent!");

    // ✅ RESET STATE
    setFormData({
      phone: "",
      email: user?.email || "",
      medium: "",
      price: "",
      artist: "",
      custom: "",
      image: null,
      agree: false,
    });

    // ✅ RESET FILE INPUT
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <>

      <h2 className="doodle-heading">
        <span className="emoji">🎨</span>
        <span className="text t1">Let’s</span>
        <span className="text t2">Doodle</span>
        <span className="text t3">Up</span>
        <span className="text t4">Your</span>
        <span className="text t5">Dreams!</span>
        <span className="emoji">💭✨</span>
      </h2>

      {/* CENTER WRAPPER */}
      <div className="commission-main-layout">

        {/* ORIGINAL FORM (UNCHANGED) */}
        <div className="commission-fun-form-wrapper">
          <form className="fun-form" onSubmit={handleSubmit}>
          
            {/* ALL YOUR ORIGINAL FORM CONTENT REMAINS SAME */}

            <h2 className="text-center fun-title">
              🎨 Let’s Paint Your Imagination! ✨
            </h2>

            {/* Section 1 */}
            <div className="form-section bounce">
              <div className="field-with-icon">
                <label>📞 Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  required
                  placeholder="Enter your number 🎯"
                  onChange={handleChange}
                />
              </div>

              <div className="field-with-icon">
                <label>📧 Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  placeholder="Magical email here ✉️"
                />
              </div>
            </div>

            {/* Section 2 */}
            <div className="form-section flip">
              <div className="field-with-icon">
                <label>🖌️ Art Medium</label>
                <select
                  name="medium"
                  value={formData.medium}
                  required
                  onChange={handleChange}
                >
                  <option value="">Pick your potion...</option>
                  <option>Charcoal</option>
                  <option>Oil Painting</option>
                  <option>Graphite</option>
                  <option>Water Color</option>
                  <option>Pencil Sketch</option>
                  <option>Any Medium</option>
                </select>
              </div>

              <div className="field-with-icon">
                <label>💰 Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  required
                  placeholder="₹ How much magic?"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Section 3 */}
            <div className="form-section paint-fall">
              <div className="field-with-icon">
                <label>🖼️ Reference Image</label>
                <input
                  type="file"
                  name="image"
                  ref={fileRef}
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="field-with-icon">
                <label>🎨 Artist Name</label>
                <select
                  name="artist"
                  value={formData.artist}
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Artist 🎨</option>
                  {artists.map((artist) => (
                    <option key={artist._id} value={artist._id}>
                      {artist.name || artist.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section 4 */}
            <div className="form-section fade-in">
              <div className="field-with-icon">
                <label>✨ Customization Details</label>
                <textarea
                  name="custom"
                  value={formData.custom}
                  rows="3"
                  required
                  placeholder="Describe the magic 🧙‍♂️..."
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="form-check mt-2">
              <input
                className="cheks"
                type="checkbox"
                name="agree"
                checked={formData.agree}
                required
                onChange={handleChange}
              />
              <label>🪄 I want to book this enchanted art!</label>
            </div>

            <div className="text-center mt-3">
              <button type="submit" className="submit-btn">
                🚀 Send to Artist!
              </button>
            </div>

          </form>
        </div>

        {/* IMAGE */}
        <div className="commission-image">
          <img src="/static/commision.jpg" alt="Commission Art"/>
        </div>

      </div>

      {/* ✅ IMPORTANT: STYLE TAG RESTORED */}
      <style>
        {`
.commission-main-layout{
display:flex;
justify-content:center;
align-items:center;
gap:10px;
flex-wrap:wrap;
max-width:1300px;
margin:auto;
}

.commission-image{
flex:1;
text-align:center;
}

.commission-image img{
width:100%;
max-width:520px;
border-radius:25px;
}

@keyframes floatArt{
0%{transform:translateY(0px);}
50%{transform:translateY(-15px);}
100%{transform:translateY(0px);}
}

          .commission-fun-form-wrapper {
            max-width: 750px;
            margin: 110px;
            padding: 20px;
            background: linear-gradient(to right, #fff5f7, #e0f7fa);
            border: 4px dotted #ffb6b9;
            border-radius: 25px;
            box-shadow: 0 12px 25px rgba(0,0,0,0.1);
            animation: entryZoom 0.8s ease;
          }

          .fun-title {
            font-family: 'Comic Sans MS', cursive;
            font-size: 1.8rem;
            color: #d6249f;
            margin-bottom: 25px;
            animation: colorFlow 3s ease-in-out infinite alternate;
          }

          .fun-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .form-section {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 1rem;
            padding: 10px;
            background: #fff9f2;
            border-radius: 15px;
            border: 2px dashed #ffe6fa;
            box-shadow: inset 0 0 10px #fff0f5;
          }

          .field-with-icon {
            flex: 1 1 45%;
            display: flex;
            flex-direction: column;
          }

          /* 🔥 FIX 1: ADD SPACE BETWEEN LABEL & INPUT */
          .field-with-icon label {
            margin-bottom: 10px;
            font-weight: 500;
          }

          /* 🔥 FIX 2: REMOVE BLACK BORDER */
          input, select, textarea {
            padding: 12px 16px;
            font-size: 1rem;
            background: white;
            border: none;   /* ❌ removed black border */
            border-radius: 12px;
            box-shadow: inset 0 0 5px rgba(35, 35, 35, 0.24);
            transition: 0.4s ease;
            outline: none;
          }

          input:hover, select:hover, textarea:hover {
            box-shadow: 0 0 8px #ff8fab;
            transform: scale(1.02);
          }

          input:focus, select:focus, textarea:focus {
            border: none;   /* keep clean */
            box-shadow: 0 0 12px #ffd3e2, 0 0 15px #ff8fab;
            transform: scale(1.03);
          }

          textarea {
            resize: none;
          }

          .submit-btn {
            border: 1px solid #ddd;
            padding: 10px 22px;
            border-radius: 50px;
            font-size: 1.4rem;
            cursor: pointer;
            background-color: white;
            color: #333;
            box-shadow: 0 1px 3px rgba(0,0,0,0.28);
            transition: all 0.25s ease;
          }

          .submit-btn:hover {
            background-color: #cdf4d0ff;
            border-color: #4CAF50;
            color: #2e7d32;
            transform: scale(1.15);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          }

          .cheks {
            height:25px;
            width:25px;
            margin-left:350px;
          }

          @keyframes entryZoom {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes colorFlow {
            0% { color: #ff4e50; }
            50% { color: #f9d423; }
            100% { color: #6a82fb; }
          }

          .bounce { animation: bounceIn 1s; }
          .flip { animation: flipIn 1s; }
          .paint-fall { animation: paintSplash 1.5s ease; }
          .fade-in { animation: fadeIn 1.3s ease; }
          .doodle-heading {
    font-family: cursive;
    font-weight: bold;
    font-size: 3.5rem;
    color: #333;
    display: flex;
    padding-top: 80px;
    padding-bottom: 1px;
    align-items: center;
    justify-content: center;
    gap: 12px;
    animation: slideIn 1.5s ease-out;
  }

  /* Emoji bounce */
  .doodle-heading .emoji {
    display: inline-block;
    animation: bounceArt 1.8s infinite;
  }

  /* Text animation (same pulse style) */
  .text {
    animation: pulseColor 3s infinite;
  }

  .t2 { animation-duration: 5s; }
  .t3 { animation-duration: 4s; }
  .t4 { animation-duration: 6s; }
  .t5 { animation-duration: 8s; }

  /* Animations copied EXACT */
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
    25% { color: #555; }
    50% { color: #999; }
    75% { color: #555; }
    100% { color: #000; }
  }

          @keyframes bounceIn {
            0% { transform: translateY(-30px); opacity: 0; }
            100% { transform: translateY(0); }
          }

          @keyframes flipIn {
            0% { transform: rotateY(90deg); opacity: 0; }
            100% { transform: rotateY(0); opacity: 1; }
          }

          @keyframes paintSplash {
            0% { transform: translateY(-100px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
`}
      </style>
    </>
  );
};

export { CommissionForm };


const ArtistDashboard = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5001/api/commission", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5001/api/commission/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ status })
    });

    fetchRequests();
  };

  useEffect(() => {
    const style = document.createElement("style");

    style.innerHTML = `
body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to right, #e1ece8, #e7ebe0, #eee8e3);
}

/* TITLE */
.title {
  text-align: center;
  font-size: 3rem;
  margin-top: 40px;
  font-family: cursive;
}

/* GRID */
.container {
  max-width: 1400px;
  margin: 40px auto;
  padding: 25px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

/* CARD */
.card {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 20px;

  background: #ffffffdd;
  border-radius: 20px;
  padding: 15px;

  border: 2px dashed #ffb6c1; /* 🌸 LIGHT PINK BORDER */

  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: 0.35s;
  overflow: hidden;
}

/* 🎨 BLOBS */
.card::before,
.card::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  z-index: 0;
}

/* TOP LEFT */
.card::before {
  width: 140px;
  height: 140px;
  top: -50px;
  left: -50px;
  background: radial-gradient(circle, #ffc0cb, #ffdde1);
  opacity: 0.35;
}

/* BOTTOM RIGHT */
.card::after {
  width: 120px;
  height: 120px;
  bottom: -40px;
  right: -40px;
  background: radial-gradient(circle, #ffd6e0, #ffe6eb);
  opacity: 0.4;
}

.card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 35px rgba(0,0,0,0.18);
}

/* IMAGE */
.card img {
  width: 250px;
  height: 350px;
  object-fit: cover;
  border-radius: 15px;
  flex-shrink: 0;
  z-index: 1;
}

/* DETAILS */
.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
}

.details h4 {
  font-size: 1.6rem;
  font-family: cursive;
}

.desc {
  font-size: 0.95rem;
  color: #555;
}

.status {
  font-weight: bold;
}
.status.pending { color: #856404; }
.status.accepted { color: #2ec151; }

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #888;
}

.message {
  font-size: 0.9rem;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
}

/* BUTTONS */
.buttons {
  display: flex;
  gap: 15px;
}

.btn {
  border: 1px solid #ddd;
  padding: 8px 14px;
  border-radius: 50px;
  background: white;
  cursor: pointer;
  transition: 0.3s;
}

.accept { color: #4caf50; }
.reject { color: #f44336; }

.btn:hover {
  transform: translateY(-2px);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .card {
    flex-direction: column;
  }

  .card img {
    width: 100%;
    height: 300px;
  }
}
    `;

    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div>
      <h1 className="title">🎨 Commission Requests</h1>

      <div className="container">
        {requests
          .filter(r => r.status !== "rejected")
          .map((item, index) => (
            <div className="card" key={index}>

              <img src={`http://localhost:5001${item.image}`} alt="" />

              <div className="details">
                <div>
                  <h4>🧑 {item.user?.username || "Client"}</h4>
                  <p className="desc">🎨 {item.medium}</p>
                  <p className="desc">{item.custom}</p>

                  <div className={`status ${item.status}`}>
                    Status: {item.status}
                  </div>

                  <div className="price">₹{item.price}</div>

                  <div className="message">
                    🎨 This custom artwork reflects imagination.
                  </div>
                </div>

                {item.status === "pending" && (
                  <div className="buttons">
                    <button className="btn accept" onClick={() => updateStatus(item._id, "accepted")}>
                      ✅ Accept
                    </button>
                    <button className="btn reject" onClick={() => updateStatus(item._id, "rejected")}>
                      ❌ Reject
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))}
      </div>
    </div>
  );
};

export { ArtistDashboard };
const NotificationBar = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  const deleteNotification = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5001/api/notifications/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    setNotes(prev => prev.filter(n => n._id !== id));
  };

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchNotes = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5001/api/notifications", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const data = await res.json();
      setNotes(data);
    };

    fetchNotes();
    const interval = setInterval(fetchNotes, 5000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const style = document.createElement("style");

    style.innerHTML = `
.notif-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

.notif-card {
  position: relative;
  width: 400px;
  background: #ffffffdd;
  border-radius: 20px;
  padding: 12px;

  border: 2px dashed #ffb6c1;
  overflow: hidden;

  transition: 0.35s;
}

/* BLOBS */
.notif-card::before,
.notif-card::after {
  content: "";
  position: absolute;
  border-radius: 50%;
}

.notif-card::before {
  width: 120px;
  height: 120px;
  top: -40px;
  left: -40px;
  background: #ffc0cb;
  opacity: 0.3;
}

.notif-card::after {
  width: 100px;
  height: 100px;
  bottom: -30px;
  right: -30px;
  background: #ffd6e0;
  opacity: 0.35;
}

.notif-card:hover {
  transform: scale(1.03);
}

.notif-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 15px;
  z-index: 1;
}

.notif-body {
  padding: 8px;
  z-index: 1;
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}
`;

    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (!user) return null;

  return (
    <div className="notif-wrapper">

      {user?.role !== "seller" && (
<h2 className="notif-heading" style={{ textAlign: "center" }}>
  🔔 Your Notifications
</h2>
      )}

      <div className="notif-grid">
        {notes.map((n, i) => (
          <div key={i} className="notif-card">

            <button className="delete-btn" onClick={() => deleteNotification(n._id)}>
              ✖
            </button>

            <img
              src={`http://localhost:5001${n.commissionData?.image}`}
              className="notif-img"
              alt=""
            />

            <div className="notif-body">
              <h4>{n.message}</h4>
              <p>🎨 {n.commissionData?.medium}</p>
              <p>{n.commissionData?.custom}</p>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>₹{n.commissionData?.price}</span>
                <span>{n.commissionData?.status}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export { NotificationBar };
