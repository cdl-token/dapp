"use client";

import ConnectWalletButton from "@/components/buttons/ConnectWalletButton";
import BridgeCard from "./_components/BridgeCard";
import BridgeInfo from "./_components/BridgeInfo";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

export default function BridgePage({ params }) {
  const { lang } = params;
  const { address, chainId, isConnected } = useWeb3ModalAccount(); 

  if (!isConnected) {
    return (
      <div className="flex h-[320px] w-full flex-col items-center border-white/10 border justify-end gap-5 rounded-xl bg-[#15161766] px-10 py-16">
        <span className="w-full text-4xl font-semibold">
          Connect your wallet to get started
        </span>
        <ConnectWalletButton />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center p-4">
      <div className="flex w-full flex-col gap-5">
        <h1 className="mb-5 text-5xl font-semibold text-white">Bridge</h1>
        <div className="grid grid-cols-3 gap-6">
          <BridgeCard lang={lang} />
          <BridgeInfo lang={lang} />
        </div>
      </div>
    </div>
  );
}
