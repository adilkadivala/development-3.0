// wallet adapter imports

import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export function TokenLounchPad() {
  const wallet = useWallet();
  async function createToken() {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const keypair = Keypair.generate();

    const transection = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: payer.publickey,
        newAccountPubkey: Keypair.publickey,
        space: MINT_SIZE,
        lamports,
        programId,
      }),

      createInitializeMint2Instruction(
        keypair.publickey,
        decimals,
        mintAuthority,
        freezeAuthority,
        programId
      )
    );

    transection.partialSign(keypair);
    await wallet.signTransaction(transection);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        flexDirection: "column",
      }}
    >
      <h1>Sol token louchpad</h1>
      <input
        type="text"
        placeholder="Name"
        style={{
          padding: "10px",
          fontSize: "14px",
          borderRadius: "2px",
          border: "1px solic",
        }}
      />
      <br />
      <input
        type="text"
        style={{
          padding: "10px",
          fontSize: "14px",
          borderRadius: "2px",
          border: "1px solic",
        }}
        placeholder="Symbole"
      />
      <br />
      <input
        type="text"
        style={{
          padding: "10px",
          fontSize: "14px",
          borderRadius: "2px",
          border: "1px solic",
        }}
        placeholder="Image Url"
      />
      <br />
      <input
        type="text"
        style={{
          padding: "10px",
          fontSize: "14px",
          borderRadius: "2px",
          border: "1px solic",
        }}
        placeholder="Initial Supply"
      />
      <button
        style={{
          cursor: "pointer",
          padding: "10px",
        }}
        onClick={createToken}
      >
        Create Token
      </button>
    </div>
  );
}
