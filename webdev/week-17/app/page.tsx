"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/v1/user/details")
      .then((response) => setData(response.data));
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <div className="flex p-5 flex-col items-center m-5 border justify-center">
        <span className="p-4 border w-fit h-fit">this is CSR</span>
        <p>{data?.name}</p>
        <p>{data?.email}</p>
      </div>

      <p>
        visit here for <Link href="/ssr">SSR</Link>{" "}
      </p>
    </div>
  );
}
