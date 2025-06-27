import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";
import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";

interface UsersDetail {
  username: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState<UsersDetail>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // reset handler
  const handleReset = async () => {
    setUserDetail({
      username: "",
      password: "",
    });
  };

  // submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/signup", userDetail);
      if (res.status === 200) {
        alert("sign-up successful!");
        navigate("/sign-in");
      }
      console.log(res.data);
    } catch (error) {
      console.error("Login failed:", error);
      alert("sign-up failed. Check console for details.");
    }
  };
  return (
    <>
      <Link to="/">Home</Link>
      <form
        method="post"
        className="flex flex-col justify-center items-center gap-2 m-10"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="username"
          value={userDetail.username}
          className="border border-slate-700 px-2 py-2 rounded"
          placeholder="enter your name"
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          value={userDetail.password}
          className="border border-slate-700 px-2 py-2 rounded"
          placeholder="enter your password"
          onChange={handleChange}
        />
        <div className="flex gap-1">
          <Button
            type="submit"
            className="border border-slate-700 px-10 py-2 rounded cursor-pointer"
          >
            Submit
          </Button>
          <Button
            type="reset"
            className="border border-slate-700 px-10 py-2 rounded cursor-pointer"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
