import "./App.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import RequestAirdrop from "./request-airdrop";
import ShowBalllance from "./show-ballance";
import SendToken from "./send-token";
import SignMEssage from "./sign-message";
import TokenLaunchPad from "./token-launchpad";

function App() {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div>
            <WalletMultiButton />
            <WalletDisconnectButton />
            <RequestAirdrop />
            <ShowBalllance />
            <SignMEssage />
            <SendToken />
            <TokenLaunchPad />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
