import { Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./footer";
import { Home } from "./home";
import { AllArtworks } from "./AllArtworks";
import Cart from "./cart";
import { Contact } from "./contact";
import Learn from "./learn";
import { AuthPage } from "./signup_login";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/AllArtworks" element={<AllArtworks />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/learn" element={<Learn/>} />
                <Route path="/" element={< AuthPage/>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;