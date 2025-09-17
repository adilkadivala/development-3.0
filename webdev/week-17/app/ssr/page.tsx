import axios from "axios";

export default async function Home() {
  const response = await axios.get(
    "https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details"
  );

  const data = response.data;

  return (
    <div className="flex p-5 flex-col items-center m-5 border justify-center">
      <span className="p-4 border w-fit h-fit">this is SSR</span>
      <p>{data?.name}</p>
      <p>{data?.email}</p>
    </div>
  );
}
