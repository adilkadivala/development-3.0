// client component

// "use client";

// import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

// export default function Home() {
//   return (
//     <SessionProvider>
//       <RealHome />
//     </SessionProvider>
//   );
// }

// export function RealHome() {
//   const session = useSession();

//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <div>hey how are you </div>

//       {session.status === "authenticated" ? (
//         <button onClick={() => signOut()}>Sign out</button>
//       ) : (
//         <button onClick={() => signIn()}>Sign In</button>
//       )}
//     </div>
//   );
// }

// ------------------------------------------------------------- //

// server component

import { getServerSession } from "next-auth";
import { SessionProvider, signIn, signOut } from "next-auth/react";


export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>hey how are you </div>

      {JSON.stringify(session)}
    </div>
  );
}
