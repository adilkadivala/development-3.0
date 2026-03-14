import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import "./App.css";
import { createPublicClient } from "viem";
// import { mainnet } from "viem/chains";

import { http, createConfig, WagmiProvider, useConnect } from "wagmi";
import { base, mainnet, optimism } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
});
const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <SendETH />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function WalletConnector() {
  const { connect, connectors } = useConnect();
  return connectors.map((connector) => (
    <button
      disabled={!connector.ready}
      key={connector.uid}
      onClick={() => connect({ connector })}
    >
      {connector.name}
      {!connector.ready && " (unsupported)"}
    </button>
  ));
}

function SendETH() {
  return (
    <div>
      <input type="text" placeholder="Address..." id="" />
      <button>Send 0.1 ETH</button>
    </div>
  );
}
// async function getter() {
//   const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
//   const response = await data.json();
//   return response;
// }

// const client = createPublicClient({
//   chain: mainnet,
//   transport: http("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"),
// });

// function App() {

// async function getBalance() {
//   const res = await client.getBalance({
//     address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
//   });
//   console.log(`Balance: ${res} wei`);
// }

// return (
//   <QueryClientProvider client={queryClient}>
//     <button onClick={getBalance}>get balance </button>
//     <Posts />
//   </QueryClientProvider>
// );

// }

// export default App;

// function Posts() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["posts"],
//     queryFn: getter,
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error occurred: {error.message}</div>;

//   console.log(data);
//   return (
//     <div className="App">
//       {data.map((post) => (
//         <div
//           key={post.id}
//           style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
//         >
//           <h3>{post.title}</h3>
//           <p>{post.body}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
