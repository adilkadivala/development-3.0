import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const RequestAirdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  async function requestAirDrop() {
    const pubKey = wallet.publicKey;
    const amount = document.getElementById("amount").value;
    await connection.requestAirdrop(pubKey, amount * LAMPORTS_PER_SOL);
    alert("Done");
  }
  return (
    <div>
      <input type="text" placeholder="amount" id="amount" />
      <button onClick={requestAirDrop}>Drop</button>
      {wallet.publicKey?.toJSON()}
    </div>
  );
};

export default RequestAirdrop;
