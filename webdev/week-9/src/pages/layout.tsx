import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

const Layout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        height: "100vh",
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
