"use client";

import axios from "axios";
import { useState } from "react";

export default function Signin() {
  const [userDetail, setUserDetail] = useState({
    username: "",
    password: "",
  });

  function handleSumbit() {
    console.log(userDetail);
    axios.post("/api/v1/sign-up", userDetail);
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6">
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">Sign up</div>
            </div>
            <div className="pt-2">
              <input
                placeholder="harkirat@gmail.com"
                type="text"
                className="border"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, username: e.target.value });
                }}
              />
              <input
                type={"password"}
                placeholder="123456"
                className="border"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, password: e.target.value });
                }}
              />
              <button
                type="button"
                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={handleSumbit}
              >
                Sign up
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
