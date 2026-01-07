import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

const AirDrop = () => {
  const wallet = useWallet();
  const [amount, setAmount] = useState("");
  const { connection } = useConnection();

  async function sendAirDropToUser() {
    await connection.requestAirdrop(
      wallet.publicKey,
      Number(amount) * LAMPORTS_PER_SOL
    );

    alert("dropping");
  }
  return (
    <div>
      <input
        type="text"
        placeholder="quantaty"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendAirDropToUser}>Air drop</button>
    </div>
  );
};

export default AirDrop;
