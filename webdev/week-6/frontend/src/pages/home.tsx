import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";

interface UsersDetail {
  username: string;
  password: string;
}

const Home = () => {
  const [userinfo, setuserInfo] = useState<UsersDetail>({
    username: "",
    password: "",
  });

  const getUserDetail = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/me", {
        headers: {
          token: token,
        },
      });

      if (response.status === 200) {
        setuserInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  // logout

  function handleLogout() {
    localStorage.removeItem("token");
  }
  useEffect(() => {
    handleLogout;
  }, [userinfo]);

  return (
    <>
      <div>
        <h5>user information</h5>
        <p>
          {" "}
          username is <span className="font-bold">
            {userinfo.username}
          </span>{" "}
        </p>
        <p>
          {" "}
          password is <span className="font-bold">
            {userinfo.password}
          </span>{" "}
        </p>
      </div>

      <ul>
        <li>
          <Link to="sign-in">Sign-in</Link>
        </li>
        <li>
          <Link to="sign-up">Sign-up</Link>
        </li>
        <li>
          <Button
            className="border border-rose-300 px-3 py-1 rounded cursor-pointer"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </li>
      </ul>
    </>
  );
};

export default Home;
