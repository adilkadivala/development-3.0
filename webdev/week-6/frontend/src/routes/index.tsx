import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Home from "../pages/home";
import NotFound from "../pages/not-found";

const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Paths;
