"use client";

import TopCoinsCaraousel from "@/components/slider/TopCoinsCaraousel";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import PortfolioCard from "@/components/cards/PortfolioCard";
import RecentlyAdded from "@/components/cards/RecentlyAdded";
import TrendingCard from "@/components/cards/TrendingCard";
import LightGraph from "@/components/graph/LightGraph";

const DashboardSection = ({ data }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount(); //TODO::Add Condition Here

  if (!isConnected) {
    return <p>Please connect wallet</p>;
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
