import PortfolioCard from "@/components/cards/PortfolioCard";
import RecentlyAdded from "@/components/cards/RecentlyAdded";
import TrendingCard from "@/components/cards/TrendingCard";
import TopCoinsCaraousel from "@/components/slider/TopCoinsCaraousel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col pl-3 pr-5 pb-10">
      <span className="text-custom-gray font-neue">
        Today's prices by Crypto Data Live Token
      </span>
      <div className="grid lg:grid-cols-2 py-5 gap-3 w-full">
        <TrendingCard />
        <RecentlyAdded />
      </div>
      <div className="flex gap-3 py-5">
        <PortfolioCard />
        <div className="w-full bg-blue-200/5 rounded-3xl text-xl font-bold uppercase p-5 flex items-center justify-center">
          CHART HERE
        </div>
      </div>
      <div className="flex flex-col gap-5 overflow-hidden">
        <span className="text-2xl font-apfel">Top coins</span>
        <TopCoinsCaraousel />
      </div>
    </div>
  );
}
