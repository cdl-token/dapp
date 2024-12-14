"use client";

import { useWeb3Modal } from "@web3modal/ethers5/react";
import Button from "./Button";

export default function ConnectWalletButton({ lang }) {
  return (
    <Button
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
    />
  );
}
