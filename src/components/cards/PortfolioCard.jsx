"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const PortfolioCard = ({ data }) => {
  return (
    <div className="flex flex-col min-w-[258px] w-full sm:w-fit bg-[#8D33E5] text-white rounded-[24px]">
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold font-neue">My Portfolio</span>
        {threeDots}
      </div>
      <div className="flex flex-col border-t-2 border-black">
        {data?.map((token) => (
          <div
            key={token.id}
            className="flex items-center gap-3 border-b-[0.5px] border-black px-4 py-3"
          >
            <div className="flex items-center justify-center min-h-[48px] min-w-[48px] h-[48px] w-[48px] rounded-full bg-black">
              <Image
                src={token?.image}
                width={17}
                height={22.5}
                alt={token?.name}
              />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <span className="text-[19px] font-semibold text-[#E1E1E1]">
                {token?.name}
              </span>
              <span className="uppercase">{token?.symbol}</span>
            </div>
            <div className="flex flex-col justify-between items-center">
              <span className="text-[19px] font-bold text-[#E1E1E1]">
                {token?.percentage}%
              </span>
              <span
                className={cn(
                  "bg-black px-2 py-0.5 rounded-full text-xs",
                  token?.plusPercentage > 0
                    ? "text-[#1DD6B4]"
                    : "text-[#F46D22]"
                )}
              >
                {token?.plusPercentage > 0
                  ? "+" + token?.plusPercentage
                  : token?.plusPercentage}
                %
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const threeDots = (
  <svg
    width="20"
    height="6"
    viewBox="0 0 20 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="2.22222" cy="3.00005" r="2.22222" fill="white" />
    <circle cx="9.99999" cy="3.00005" r="2.22222" fill="white" />
    <circle cx="17.7778" cy="3.00005" r="2.22222" fill="white" />
  </svg>
);

export default PortfolioCard;
