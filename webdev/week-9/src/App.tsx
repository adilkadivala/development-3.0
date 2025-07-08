import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Privacy from "./pages/privacy";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import NotFound from "./pages/404";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to="/">home</Link>
          <Link to="/about">about</Link>
          <Link to="/blog">blog</Link>
          <Link to="/privacy">privacy</Link>
          <Link to="/contact">contact</Link>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
