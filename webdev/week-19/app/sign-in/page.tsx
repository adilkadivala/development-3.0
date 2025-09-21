"use client";

import { useState } from "react";

export default function Signin() {
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <a
          href="#"
          className="block max-w-sm p-6"
        >
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">Sign in</div>
            </div>
            <div className="pt-2">
              <input
                type="text"
                value={userDetail.email}
                className="border"
                placeholder="harkirat@gmail.com"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, email: e.target.value });
                }}
              />
              <input
                type="password"
                                className="border"

                placeholder="123456"
                onChange={(e) => {
                  setUserDetail({ ...userDetail, password: e.target.value });
                }}
              />
              <button
                type="button"
                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Sign in
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
