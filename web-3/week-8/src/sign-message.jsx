import { ed25519 } from "@noble/curves/ed25519.js";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

const SignMEssage = () => {
  const { publicKey, signMessage } = useWallet();

  async function onClick() {
    if (!publicKey) throw new Error("Wallet not connected");
    if (!signMessage)
      throw new Error("Wallet dose not suppoer wallet messaging");

    const message = document.getElementById("message").value;
    const encodeMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodeMessage);

    if (!ed25519.verify(signature, encodeMessage, publicKey.toBytes()))
      throw new Error("message signature invalid");

    alert("success");
    console.log(`Message signature : ${bs58.encode(signature)}`);
  }
  return (
    <div>
      <input type="text" id="message" placeholder="message" />
      <button onClick={onClick}>Sign message</button>
    </div>
  );
};

export default SignMEssage;
