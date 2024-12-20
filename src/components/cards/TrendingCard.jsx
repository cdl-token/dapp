"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrendingCard = ({ data }) => {
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
        {data.map((token, index) => (
          <div
            key={token.id}
            className="rounded-full bg-custom-gray2 w-full flex px-4 py-3 items-center"
          >
            <div className="flex items-center gap-2 w-full">
              <span>{index + 1}</span>
              <Image
                src={token.image} // Updated to use the correct prop for the image
                className="pt-1"
                width={20}
                height={18}
                alt={token.symbol}
              />
              <div className="flex items-baseline gap-1">
                <span className="">{token.name}</span>
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
