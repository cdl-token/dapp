"use client";

import { cn } from "@/lib/utils";
import { createChart, ColorType } from "lightweight-charts";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LightGraph = ({ coinData }) => {
  const chartContainerRef = useRef(null);
  const [selectedCoin, setSelectedCoin] = useState("BTC"); // Default to BTC

  const transformData = (data) =>
    data.map((item) => ({
      time: item.time, // UNIX timestamp
      value: item.price, // Replace `price` with the correct key from the API response
    }));
  const colors = {
    BTC: { line: "#ff9900", top: "#ff990099", bottom: "#ff990010" },
    ETH: { line: "#627eea", top: "#627eea99", bottom: "#627eea10" },
    SOL: { line: "#8a5dd1", top: "#8a5dd199", bottom: "#8a5dd110" },
    BNB: { line: "#f3ba2f", top: "#f3ba2f99", bottom: "#f3ba2f10" },
  };
  useEffect(() => {
    if (!chartContainerRef.current || !coinData[selectedCoin]) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "white",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: {
        visible: true,
        borderColor: "#2b2b43",
      },
      timeScale: {
        visible: true,
        borderColor: "#2b2b43",
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
    });

    chart.timeScale().fitContent();

    const seriesData = transformData(coinData[selectedCoin]);
    const series = chart.addAreaSeries({
      lineColor: colors[selectedCoin].line,
      topColor: colors[selectedCoin].top,
      bottomColor: colors[selectedCoin].bottom,
    });
    series.setData(seriesData);

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [coinData, selectedCoin]);

  return (
    <div className="relative w-full h-full">
      <div className="flex w-full flex-col md:flex-row items-center mb-5 gap-5 md:items-start justify-between">
        <div className="flex w-fit justify-start gap-1 rounded bg-[#1f1f1f] p-1">
          {["BTC", "ETH", "SOL", "BNB"].map((coin) => (
            <button
              key={coin}
              onClick={() => setSelectedCoin(coin)}
              className={cn(
                "flex items-center gap-1 rounded px-4 py-2",
                selectedCoin === coin ? "bg-[#3b3b3b]" : "bg-[#1f1f1f]",
              )}
            >
              <Image
                src={`/coinsvgs/${coin === "BTC" ? "bitcoin" : coin === "ETH" ? "ether" : coin === "SOL" ? "solana" : "binance"}.svg`}
                alt={coin}
                width={20}
                height={20}
              />
            </button>
          ))}
        </div>
        <div className="flex flex-col text-end">
          <span className="text-base font-bold">{selectedCoin} Price</span>
          <span
            className={cn(
              "text-2xl font-bold",
              selectedCoin === "BTC"
                ? "text-[#ff9900]"
                : selectedCoin === "ETH"
                  ? "text-[#627eea]"
                  : selectedCoin === "SOL"
                    ? "text-[#8a5dd1]"
                    : "text-[#f3ba2f]",
            )}
          >
            ${coinData[selectedCoin][10].price.toFixed(2)}
          </span>
        </div>
      </div>
      <div
        className="flex h-full max-h-[520px] w-full items-center justify-center"
        ref={chartContainerRef}
      />
      <div className="absolute bottom-[30px] left-1.5 z-20 h-10 w-10 rounded-full bg-black">
        <Image src="/logo.svg" width={40} height={40} alt="Logo" />
      </div>
    </div>
  );
};

export default LightGraph;
