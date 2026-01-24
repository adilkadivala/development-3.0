import {
  createInitializeMint2Instruction,
  createMint,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

const TokenLaunchPad = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  async function createToken() {
    const name = document.getElementById("name").value;
    const symbol = document.getElementById("symbol").value;
    const img_url = document.getElementById("img_url").value;
    const initial_supply = document.getElementById("initial_supply").value;

    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const keypair = Keypair.generate();

    const transection = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(
        keypair.publicKey,
        6, //decimals
        wallet?.publicKey, // mint authority
        wallet?.publicKey, // freeze authority
        TOKEN_PROGRAM_ID //programId
      )
    );

    const recentBlockHash = await connection.getLatestBlockhash();
    transection.recentBlockhash = recentBlockHash.blockhash;
    transection.feePayer = wallet?.publicKey;

    transection.partialSign(keypair);
    let response = await 
    wallet.sendTransaction(transection, connection);
    console.log("response", response);
  }
  return (
    <div
      style={{
        border: "1px solid white",
      }}
    >
      <h1>TokenLaunchPad</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input type="text" id="name" placeholder="name" />
        <input type="text" id="symbol" placeholder="symbol" />
        <input type="text" id="img_url" placeholder="img url" />
        <input type="text" id="initial_supply" placeholder="initial supply" />
        <button onClick={createToken}>create a token</button>
      </div>
    </div>
  );
};

export default TokenLaunchPad;
