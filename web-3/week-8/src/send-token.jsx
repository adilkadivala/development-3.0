import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
const SendToken = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function signTransection() {
    let to = document.getElementById("to").value;
    let amount = document.getElementById("amount").value;

    const transection = new Transaction();
    transection.add(
      SystemProgram.transfer({
        fromPubkey: wallet?.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transection, connection);
    alert("transection completd");
  }

  return (
    <div>
      <input type="text" id="to" placeholder="to" />
      <input type="text" id="amount" placeholder="amount" />
      <button onClick={signTransection}>Send token</button>
    </div>
  );
};

export default SendToken;
