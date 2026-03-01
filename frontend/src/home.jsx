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
              <Link to="/artworks">
                <button className="btn btn-primary me-4">New Offers</button>
              </Link>
              <Link to="/artworks">
                <button className="btn btn-warning me-4">Explore</button>
              </Link>
              <Link to="/artworks">
                <button className="btn btn-danger me-4">Best works</button>
              </Link>
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
              <Link to="/artworks">
                <button className="btn btn-primary me-4">Buying</button>
              </Link>
              <Link to="/cart">
                <button className="btn btn-success me-4">Selling</button>
              </Link>
              <Link to="/learn">
                <button className="btn btn-danger me-4">Learning</button>
              </Link>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="/images/c3.jpg"
              height="400px"
              className="d-block w-100"
              alt="slide3"
            />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>

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

      <div className="commission-fun-form-wrapper">
        <form className="fun-form" onSubmit={handleSubmit}>
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

          {/* Checkbox */}
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

          {/* Submit */}
          <div className="text-center mt-3">
            <button type="submit" className="submit-btn">
              🚀 Send to Artist!
            </button>
          </div>
        </form>


        <style>
          {`
          .commission-fun-form-wrapper {
            max-width: 750px;
            margin: 40px auto;
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
    padding-top: 120px;
    padding-bottom: 20px;
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
      </div></>
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
  color: #333;
  font-family: cursive;
}

/* CONTAINER */
.container {
  max-width: 1400px;        /* 🔥 increase width so 3 cards fit */
  margin: 40px auto;
  padding: 25px;

  display: grid;            /* 🔥 ADD GRID */
  grid-template-columns: repeat(2, 1fr);  /* 🔥 3 CARDS */
  gap: 25px;
  border-radius: 25px;
}
  .card {
  width: 100%;   /* 🔥 IMPORTANT */
}
  @media (max-width: 1100px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .container {
    grid-template-columns: 1fr;
  }
}
/* CARD */
.card {
  display: flex;
  flex-direction: row;   /* 🔥 FORCE HORIZONTAL */
  align-items: stretch;  /* 🔥 SAME HEIGHT */
  gap: 20px;

  background: linear-gradient(145deg, #fff6f6, #fdfdfd);
  border-radius: 20px;
  margin-bottom: 25px;
  padding: 15px;

  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 20px 30px rgba(0,0,0,0.15);
}

/* IMAGE (FIXED SIZE → NEVER SHRINK) */
.card img {
  width: 250px;
  height: 350px;
  object-fit: cover;

  border-radius: 15px;
  flex-shrink: 0;   /* 🔥 IMPORTANT → stops shrinking */

  transition: 0.4s;
}

.card img:hover {
  transform: scale(1.05);
}

/* RIGHT SIDE CONTENT */
.details {
  flex: 1;                /* 🔥 TAKE REMAINING SPACE */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* TEXT */
.details h4 {
  font-size: 1.8rem;
  font-family: cursive;
  margin-bottom: 8px;
}

.desc {
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 8px;
}

/* STATUS */
.status {
  font-weight: bold;
  margin-bottom: 8px;
}

.status.pending { color: #856404;  }
.status.accepted { color: #155724; }

/* PRICE */
.price {
  font-size: 1.6rem;
  font-weight: bold;
  color: #888;
  margin-bottom: 10px;
}

/* MESSAGE */
.message {
  font-size: 0.9rem;
  background: #f5f5f5;
  padding: 10px;
  border-left: 4px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
}

/* BUTTONS */
.buttons {
  display: flex;
  gap: 20px;

  justify-content: space-between;
}

/* BUTTON STYLE */
.btn {
  border: 1px solid #ddd;
  
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: white;
  color: #333;
  box-shadow: 0 1px 3px rgba(0,0,0,0.28);
  transition: 0.25s;
}

/* ACCEPT */
.accept {
  border-color: #4caf50;
  color: #4caf50;
}

.accept:hover {
  background-color: #e8f5e9;
  color: #1b5e20;
  transform: translateY(-2px);
}

/* REJECT */
.reject {
  border-color: #f44336;
  color: #f44336;
}

.reject:hover {
  background-color: #fff1f0;
  color: #a8071a;
  transform: translateY(-2px);
}

/* ❌ PREVENT BREAK ON SMALL SCREENS */
@media (max-width: 768px) {
  .card {
    flex-direction: column; /* only mobile */
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

        {requests.length === 0 ? (
          <p style={{ textAlign: "center" }}>No requests yet 🎯</p>
        ) : (
          requests
            .filter(r => r.status !== "rejected")
            .map((item, index) => (
              <div className="card" key={index}>

                {/* LEFT IMAGE */}
                <img
                  src={`http://localhost:5001${item.image}`}
                  alt=""
                />

                {/* RIGHT CONTENT */}
                <div className="details">

                  <div>
                    <h4>🧑 {item.user?.username || "Client"}</h4>

                    <p className="desc">🎨 {item.medium}</p>
                    <p className="desc">{item.custom}</p>

                    <div className={`status ${item.status}`}>
                      Status: {item.status}
                    </div>

                    <div className="price">
                      ₹{item.price}
                    </div>

                    <div className="message">
                      🎨 This custom artwork reflects the buyer’s imagination.
                      Accept to bring it to life or reject if needed.
                    </div>
                  </div>

                  {/* BUTTONS */}
                  {item.status === "pending" && (
                    <div className="buttons">
                      <button
                        className="btn accept"
                        onClick={() => updateStatus(item._id, "accepted")}
                      >
                        ✅ Accept
                      </button>

                      <button
                        className="btn reject"
                        onClick={() => updateStatus(item._id, "rejected")}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ))
        )}

      </div>
    </div>
  );
};

export {ArtistDashboard};

const NotificationBar = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ DELETE FUNCTION
  const deleteNotification = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5001/api/notifications/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    // 🔥 instant UI update
    setNotes(prev => prev.filter(n => n._id !== id));
  };

  // ✅ WATCH LOGIN STATE
  useEffect(() => {
    const checkUser = () => {
      const u = JSON.parse(localStorage.getItem("user"));
      setUser(u);
    };

    checkUser();
    window.addEventListener("storage", checkUser);

    return () => window.removeEventListener("storage", checkUser);
  }, []);

  // ✅ FETCH NOTIFICATIONS
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

  if (!user) return null;

  return (
    <div className="notif-wrapper">
{user?.role !== "seller" && (
  <h2 className="notif-heading">🔔 Your Notifications</h2>
)}

      <div className="notif-grid">
        {notes.map((n, i) => (
          <div key={i} className="notif-card">

            {/* ❌ DELETE BUTTON */}
            <button
              className="delete-btn"
              onClick={() => deleteNotification(n._id)}
            >
              ✖
            </button>

            {/* IMAGE */}
            <img
              src={
                n.commissionData?.image
                  ? `http://localhost:5001${n.commissionData.image}`
                  : "/images/c1.jpg"
              }
              className="notif-img"
            />

            {/* CONTENT */}
            <div className="notif-body">
              <h4 className="notif-title">{n.message}</h4>

              <p className="medium">🎨 {n.commissionData?.medium}</p>
              <p className="notif-desc">{n.commissionData?.custom}</p>

              <div className="notif-footer">
                <span className="price">₹{n.commissionData?.price}</span>

                <span className={`status ${n.commissionData?.status}`}>
                  {n.commissionData?.status}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      <style>{`
        .notif-wrapper {
          padding: 30px 20px;
        }

        .notif-heading {
          text-align: center;
          font-size: 2.3rem;
          font-family: cursive;
          margin-bottom: 25px;
        }

        .notif-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 25px;
        }

        .notif-card {
          width: 400px;
          background: white;
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          transition: 0.35s;
          position: relative; /* 🔥 REQUIRED */
        }

        .notif-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 18px 35px rgba(0,0,0,0.2);
        }

        /* ❌ DELETE BUTTON */
        .delete-btn {
          position: absolute;
          top: 10px;
          right: 12px;
          border: none;
          background: rgba(251, 239, 239, 0.6);
          color: white;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: 0.3s;
        }

        .delete-btn:hover {
          background: #ff4d4d;
          transform: scale(1.1);
        }

        /* IMAGE */
        .notif-img {
          width: 100%;
          height: 450px;
          object-fit: cover;
          border-radius: 15px;
        }

        /* CONTENT */
        .notif-body {
          padding: 8px 5px;
        }

        .notif-title {
          font-family: cursive;
          font-size: 1.1rem;
          margin-bottom: 5px;
        }

        .medium {
          font-size: 0.85rem;
          margin-bottom: 3px;
          color: #555;
        }

        .notif-desc {
          font-size: 0.8rem;
          color: #666;
          height: 18px;
          overflow: hidden;
        }

        .notif-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
        }

        .price {
          font-size: 1.1rem;
          font-weight: bold;
          color: #777;
        }

        .status {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: bold;
        }

        .status.accepted {
          color: #2ec151;
        }

        .status.rejected {
          color: #bf2f2f;
        }
      `}</style>
    </div>
  );
};

export default NotificationBar;
