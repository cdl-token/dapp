"use client";

import { usePathname } from "next/navigation";
import MobileSidebar from "../sidebar/MobileSidebar";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";

const Topbar = () => {
  const currentDate = new Date();
  const pathname = usePathname();
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const titleGenerator = () => {
    if (pathname === "/") {
      return "Dashboard";
    } else if (pathname === "/portfolio") {
      return "Portfolio";
    } else if (pathname === "/staking") {
      return "Staking";
    } else if (pathname === "/vote") {
      return "Vote";
    } else if (pathname === "/bridge") {
      return "Bridge";
    } else if (pathname === "/claim") {
      return "Claim";
    }
  };

  return (
    <>
      <div className="flex justify-between md:max-w-[calc(100vw-300px)] w-full items-center pr-5 pl-3 py-8 top-4">
        <div className="flex flex-col">
          <span className="text-[28px] font-neue">{titleGenerator()}</span>
          <span className="text-[#909093] text-xs">
            Updated on {formattedDate}
          </span>
        </div>
        <MobileSidebar />
        {isConnected ? (
          <div className="hidden md:flex">
            <w3m-button />
          </div>
        ) : (
          <button
            onClick={() => open()}
            className="px-5 py-3 hidden md:flex border border-white hover:border-primary hover:text-primary transition-all ease-in duration-200 rounded-lg font-neue font-bold"
          >
            Connect wallet
          </button>
        )}
      </div>
    </>
  );
};

export default Topbar;
