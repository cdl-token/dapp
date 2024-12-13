import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrendingCard = () => {
  const trendingTokens = [
    {
      id: 1,
      icon: "/usdt.svg",
      title: "Tether",
      symbol: "usdt",
      percentage: 0.04,
    },
    {
      id: 2,
      icon: "/uniswap.svg",
      title: "Uniswap",
      symbol: "uni",
      percentage: 2.3,
    },
    {
      id: 3,
      icon: "/wazir.svg",
      title: "Wazirx",
      symbol: "wrx",
      percentage: -0.06,
    },
  ];
  return (
    <div className="rounded-[24px] bg-custom-darkgray px-4 py-3 flex flex-col">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-[26px] pb-2">🔥</span>
          <span className="text-[22px] font-neue">Trending</span>
        </div>
        <Link className="text-custom-green font-neue text-sm" href="#">
          See all
        </Link>
      </div>
      <div className="flex flex-col gap-1.5 pt-5 pb-8">
        {trendingTokens.map((token, index) => (
          <div
            key={index}
            className="rounded-full bg-custom-gray2 w-full flex px-4 py-3 items-center"
          >
            <div className="flex items-center gap-2 w-full">
              <span>{token.id}</span>
              <Image
                src={token.icon}
                className="pt-1"
                width={20}
                height={18}
                alt="usdt"
              />
              <div className="flex items-baseline gap-1">
                <span className="">{token.title}</span>
                <span className="text-custom-gray text-sm uppercase">
                  {token.symbol}
                </span>
              </div>
            </div>
            <span
              className={cn(
                "font-apfel",
                token.percentage > 0 ? "text-custom-green2" : "text-custom-red"
              )}
            >
              {token.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCard;
