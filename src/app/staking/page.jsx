"use client";

import ConnectWalletButton from "@/components/buttons/ConnectWalletButton";
import VaultSection from "./_components/VaultSection";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
// import VsCard from "./_components/VsCard";

export default function StakingPage() {
  const { address, chainId, isConnected } = useWeb3ModalAccount(); //TODO::Add Condition Here

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
    <div className="flex w-full flex-col justify-center py-10 px-5">
      <VaultSection />
      {/* <VsCard /> */}
    </div>
  );
}
