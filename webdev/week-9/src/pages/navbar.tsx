import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Link to="/">home</Link>
      <Link to="/about">about</Link>
      <Link to="/blog">blog</Link>
      <Link to="/privacy">privacy</Link>
      <Link to="/contact">contact</Link>
    </div>
  );
};

export default Navbar;
