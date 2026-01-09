import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect } from "react";

const ShowBalllance = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  async function getUserBalance() {
    const balance = await connection?.getBalance(wallet?.publicKey);

    document.getElementById("balance").innerHTML = balance / LAMPORTS_PER_SOL;
  }

  useEffect(() => {
    getUserBalance();
  }, [wallet]);

  return (
    <div>
      Ballance <span id="balance"></span> Sol
    </div>
  );
};

export default ShowBalllance;
