
"use client";

import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import Button from "./Button";
import { useActionState } from "react";

export default function ConnectWalletButton({ lang }) {
  const { open } = useWeb3Modal();
   const { address, chainId, isConnected } = useWeb3ModalAccount();
  return (
    <>
    {isConnected ?

(<w3m-button/>)

      :
          (<Button
    onClick={()=>open()}
      title={
        lang === "ru"
          ? "Подключить кошелек"
          : lang === "es"
          ? "Conectar billetera"
          : lang === "fr"
          ? "Connecter le portefeuille"
          : "Connect Wallet"
      }
      className="hover:bg-primary2 bg-primary text-lg font-semibold text-black"
    />)
    
  }
  </>

  );
}
