"use client";

import TopCoinsCaraousel from "@/components/slider/TopCoinsCaraousel";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import PortfolioCard from "@/components/cards/PortfolioCard";
import RecentlyAdded from "@/components/cards/RecentlyAdded";
import TrendingCard from "@/components/cards/TrendingCard";
import LightGraph from "@/components/graph/LightGraph";
import ConnectWalletButton from "../buttons/ConnectWalletButton";

const DashboardSection = ({ data }) => {
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
    <>
      <span className="text-custom-gray font-neue">
        Today's prices by Crypto Data Live Token
      </span>
      <div className="grid lg:grid-cols-2 py-5 gap-3 w-full">
        <TrendingCard data={data.trending} />
        <RecentlyAdded data={data.recentlyAdded} />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 py-5">
        <PortfolioCard data={data.portfolio} />
        <div className="w-full bg-blue-200/5 rounded-3xl text-xl font-bold uppercase p-5 flex items-center justify-center">
          {/* <MainPageGraph data={data.graph} /> */}
          <LightGraph coinData={data.formattedData} />
        </div>
      </div>
      <div className="flex flex-col gap-5 overflow-hidden">
        <span className="text-2xl font-apfel">Top coins</span>
        <TopCoinsCaraousel data={data.topCoins} />
      </div>
    </>
  );
};

export default DashboardSection;
