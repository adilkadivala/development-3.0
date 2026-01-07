import { useState } from "react";
import "./App.css";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, Connection, clusterApiUrl } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Wallet, HDNodeWallet } from "ethers";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  return (
    <>
      <input type="text" value={mnemonic}></input>
      <button
        onClick={async function () {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>
      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} />
    </>
  );
}

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  async function addWallet() {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    // 👉 fetch balance
    const lamports = await connection.getBalance(keypair.publicKey);
    const sol = lamports / 1_000_000_000;

    setWallets([
      ...wallets,
      {
        publicKey: keypair.publicKey.toBase58(),
        balance: sol,
      },
    ]);

    setCurrentIndex(currentIndex + 1);
  }

  return (
    <div>
      <button onClick={addWallet}>Add Solana Wallet</button>

      {wallets.map((w, i) => (
        <div key={i}>
          <p>Address: {w.publicKey}</p>
          <p>Balance: {w.balance} SOL</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  return (
    <div>
      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          setAddresses([...addresses, wallet.address]);
        }}
      >
        Add ETH wallet
      </button>

      {addresses.map((p) => (
        <div>Eth - {p}</div>
      ))}
    </div>
  );
};

export default App;
