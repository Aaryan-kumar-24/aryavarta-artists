import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerRef = useRef(null);

  // ✅ NEW STATE
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const revealFooter = () => {
      if (!footerRef.current) return;

      const footerPos = footerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (footerPos < windowHeight - 50) {
        setVisible(true); // ✅ trigger React render
      }
    };

    window.addEventListener("scroll", revealFooter);
    revealFooter();

    return () => window.removeEventListener("scroll", revealFooter);
  }, []);

  const styles = {
    footer: {
      background: "linear-gradient(135deg, #e7e7e7ff, #d8d8d8ff)",
      color: "#333",
      padding: "50px 0 20px 0",
      marginTop : "100px",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
      opacity: visible ? 1 : 0,               // ✅ FIXED
      transform: visible ? "translateY(0)" : "translateY(40px)", // ✅ FIXED
      transition: "all 1s ease",
    },

    container: {
      width: "90%",
      margin: "auto",
    },

    footerColumns: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "25px",
    },

    footerColumn: {
      flex: 1,
      minWidth: "220px",
      borderRadius: "15px",
      padding: "20px",
      backdropFilter: "blur(6px)",
    },

    heading: {
      fontWeight: "700",
      marginBottom: "15px",
      color: "#222",
    },

    link: {
      color: "#444",
      textDecoration: "none",
      display: "block",
      marginBottom: "8px",
    },

    socialIcon: {
      fontSize: "1.3rem",
      marginRight: "10px",
      borderRadius: "50%",
      padding: "8px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#444",
    },

    bottom: {
      borderTop: "1px solid #bbb",
      marginTop: "30px",
      paddingTop: "12px",
      textAlign: "center",
      fontSize: "14px",
      color: "#555",
    },
  };

  return (
    <footer ref={footerRef} style={styles.footer}>
      {/* Floating Shapes */}
      <div
        style={{
          position: "absolute",
          width: "150px",
          height: "150px",
          top: "-40px",
          left: "-40px",
          background: "rgba(255, 215, 0, 0.25)",
          borderRadius: "50%",
          animation: "floatShape 8s infinite ease-in-out alternate",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          bottom: "-50px",
          right: "-50px",
          background: "rgba(0, 191, 255, 0.25)",
          borderRadius: "50%",
          animation: "floatShape 8s infinite ease-in-out alternate",
        }}
      />

      <div style={styles.container}>
        <div style={styles.footerColumns}>
          <div style={styles.footerColumn}>
            <h5 style={styles.heading}>📝 About Us</h5>
            <p>
              We connect artists & buyers worldwide. Discover art, share
              creativity, and bring beauty into your life.
            </p>
          </div>

          <div style={styles.footerColumn}>
            <h5 style={styles.heading}>📌 Quick Links</h5>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/learn" style={styles.link}>Learn</Link>
            <Link to="/allartworks" style={styles.link}>All Artworks</Link>
            <Link to="/contact" style={styles.link}>Contact Us</Link>
            <Link to="/cart" style={styles.link}>Cart</Link>
          </div>

          <div style={styles.footerColumn}>
            <h5 style={styles.heading}>📞 Contact</h5>
            <p><i className="fas fa-map-marker-alt me-2"></i> Bangalore</p>
            <p><i className="fas fa-phone me-2"></i> 9310625964</p>
            <p><i className="fas fa-envelope me-2"></i> amankumarjanuary@gmail.com</p>
          </div>

          <div style={styles.footerColumn}>
            <h5 style={styles.heading}>🌐 Follow Us</h5>
            <div style={{ marginTop: "10px" }}>
              <a href="#" style={styles.socialIcon}><i className="fab fa-facebook-f"></i></a>
              <a href="#" style={styles.socialIcon}><i className="fab fa-instagram"></i></a>
              <a href="#" style={styles.socialIcon}><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          © 2025 Aryavarta Artist. All rights reserved.
        </div>
      </div>

      <style>
        {`
          @keyframes floatShape {
            0% { transform: translateY(0); }
            100% { transform: translateY(20px); }
          }
        `}
      </style>
    </footer>
  );
};

export { Footer };