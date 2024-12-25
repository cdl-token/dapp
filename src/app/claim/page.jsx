"use client";

import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useEffect, useState } from "react";
import Timer from "./_components/Timer";
import ConnectWalletButton from "@/components/buttons/ConnectWalletButton";

export default function ClaimPage() {
  // --------------For hydration error-------------------
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // ----------------------------------------------------

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
    <div className="flex w-full justify-center p-10">
      <div className="flex w-full flex-col gap-5">
        <h1 className="mb-5 text-5xl font-semibold text-white">Claim</h1>
        {isClient && (
          <div className="flex w-full rounded-3xl bg-custom-darkgray p-3">
            <div
              className="flex w-full rounded-xl bg-cover bg-center"
              style={{
                background: "url(/claim.jpeg)",
              }}
            >
              <div className="flex w-full flex-col bg-black/30 items-center justify-center gap-5 rounded-xl py-20 text-center">
                <span className="text-3xl px-2 sm:text-5xl font-semibold uppercase lg:text-6xl">
                  Prepare for the CDL Token
                  <br /> Distribution Event
                </span>
                <Timer />
                <span className="px-5 text-xl font-semibold max-w-2xl uppercase">
                  We're approaching a monumental moment in our journey, and we
                  can't wait to share this with our incredible community! The
                  CDL Token Distribution Event is right around the corner,
                  marking a significant milestone for our project.
                </span>
                <span className="px-5 text-lg font-medium max-w-2xl text-white/80">
                  Get ready to claim and trade your CDL tokens! Once the presale
                  ends, the referral and airdrop token distribution will begin,
                  opening up exciting opportunities for everyone involved. Keep
                  a close eye on the countdown—this is your chance to be part of
                  the future of finance!
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
