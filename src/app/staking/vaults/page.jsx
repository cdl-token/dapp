"use client"
import React from "react";
import CoinCard from "../_components/CoinCard";

export default function AllVaultsPage({ params }) {
  const { lang } = params;
  return (
    <div className="flex flex-col gap-5 p-5 text-center w-full items-center">
      <h1 className="text-4xl uppercase font-neue font-bold">
        <span className="text-primary">Expand</span> your earnings <br />
        With secured vaults
      </h1>
      <span className="max-w-xl font-apfel">
        Explore our vaults for stable growth options with competitive APYs and
        $CDL rewards. Choose the perfect vault for your strategy and enhance
        your portfolio today.
      </span>
      <h2 className="text-3xl uppercase font-bold font-neue">Available vaults</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 w-full">
        <CoinCard
          lang={lang}
          imgUrl="/coins/eth.svg"
          symbol="weth"
          name="WETH"
          apy={8.4}
          tvl="139.7K"
          provider="$CDL"
          trustScore={8.3}
          indicator="83"
        />
        <CoinCard
          lang={lang}
          imgUrl="/logo.svg"
          symbol="CDL"
          name="$CDL"
          apy={5.4}
          tvl="59.7K"
          provider="$CDL"
          trustScore={8.3}
          indicator="83"
        />
        <CoinCard
          lang={lang}
          imgUrl="/coins/btc.svg"
          symbol="wbtc"
          name="WBTC"
          apy={16.01}
          tvl="949.7K"
          provider="$CDL"
          trustScore={8.7}
          indicator="87"
        />
        <CoinCard
          lang={lang}
          imgUrl="/coins/usdc.svg"
          symbol="usdc"
          name="USDC"
          apy={6.14}
          tvl="119.7K"
          provider="$CDL"
          trustScore={9.1}
          indicator="91"
        />
        <CoinCard
          lang={lang}
          imgUrl="/coins/bnb.svg"
          symbol="wbnb"
          name="WBNB"
          apy={5.6}
          tvl="39.3K"
          provider="$CDL"
          trustScore={7.3}
          indicator="87"
        />
        <CoinCard
          lang={lang}
          imgUrl="/coins/usdt.svg"
          symbol="usdt"
          name="USDT"
          apy={6.01}
          tvl="49.7K"
          provider="$CDL"
          trustScore={8.1}
          indicator="81"
        />
      </div>
    </div>
  );
}
