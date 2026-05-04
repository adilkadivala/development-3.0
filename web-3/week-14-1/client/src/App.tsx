import "./App.css";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import axios from "axios";

// mainnet
const connection = new Connection(
  "https://solana-mainnet.g.alchemy.com/v2/IIEYb6mph0TrlBBVH7Ge2",
);

const fromPubKey = new PublicKey(
  "DRP1jHQuU8VbU2drYvM4vid74ReiHq9zn1kxh73VN4LP",
);

function App() {
  
  async function sendSol() {
    const ix = SystemProgram.transfer({
      fromPubkey: fromPubKey,
      toPubkey: new PublicKey("noXUqZzvpUqQ8X41oacTHL4FmDgSJ2yttiMRUPkURSR"),
      lamports: 0.001 * LAMPORTS_PER_SOL,
    });

    const tx = new Transaction().add(ix);

    //recent block hash

    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = fromPubKey;

    const serializedTX = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    await axios.post("/api/v1/sign-tranaction", {
      messsage: serializedTX,
      retry: false,
    });

    console.log(serializedTX);
  }

  return (
    <div>
      <input type="text" placeholder="amount" />
      <input type="text" placeholder="address" />
      <button onClick={sendSol}>submit</button>
    </div>
  );
}

export default App;
