import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Logout from "../pages/logout";
import NotFound from "../pages/not-found";

const Paths = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Paths;
