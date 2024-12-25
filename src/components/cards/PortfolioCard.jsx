// "use client";

// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import React from "react";

// const PortfolioCard = ({ data }) => {
//   return (
//     <div className="flex flex-col min-w-[258px] w-full sm:w-fit bg-[#8D33E5] text-white rounded-[24px]">
//       <div className="px-4 py-3 flex items-center justify-between">
//         <span className="text-xl font-bold font-neue">My Portfolio</span>
//         {threeDots}
//       </div>
//       <div className="flex flex-col border-t-2 border-black">
//         {data?.map((token) => (
//           <div
//             key={token.id}
//             className="flex items-center gap-3 border-b-[0.5px] border-black px-4 py-3"
//           >
//             <div className="flex items-center justify-center min-h-[48px] min-w-[48px] h-[48px] w-[48px] rounded-full bg-black">
//               <Image
//                 src={token?.image}
//                 width={17}
//                 height={22.5}
//                 alt={token?.name}
//               />
//             </div>
//             <div className="flex flex-col flex-grow justify-between">
//               <span className="text-[19px] font-semibold text-[#E1E1E1]">
//                 {token?.name}
//               </span>
//               <span className="uppercase">{token?.symbol}</span>
//             </div>
//             <div className="flex flex-col justify-between items-center">
//               <span className="text-[19px] font-bold text-[#E1E1E1]">
//                 {token?.percentage}%
//               </span>
//               <span
//                 className={cn(
//                   "bg-black px-2 py-0.5 rounded-full text-xs",
//                   token?.plusPercentage > 0
//                     ? "text-[#1DD6B4]"
//                     : "text-[#F46D22]"
//                 )}
//               >
//                 {token?.plusPercentage > 0
//                   ? "+" + token?.plusPercentage
//                   : token?.plusPercentage}
//                 %
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const threeDots = (
//   <svg
//     width="20"
//     height="6"
//     viewBox="0 0 20 6"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <circle cx="2.22222" cy="3.00005" r="2.22222" fill="white" />
//     <circle cx="9.99999" cy="3.00005" r="2.22222" fill="white" />
//     <circle cx="17.7778" cy="3.00005" r="2.22222" fill="white" />
//   </svg>
// );

// export default PortfolioCard;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Import this if you use utility classes
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

const PortfolioCard = ({ address }) => {
  const [data, setData] = useState(null); // For storing fetched token data
  const [error, setError] = useState(null); // For handling any errors
  const [loading, setLoading] = useState(true); // To show loading state
  const { chainId, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    // Function to fetch the data
    const fetchTokens = async () => {
      try {
        const response = await fetch(
          `/api/moralis/getTokens?address=${address}`
        );
        const result = await response.json();

        if (response?.ok) {
          setData(result?.data?.result); // Assuming the result contains 'result' key with an array
        } else {
          setError(result?.error || "Error fetching data");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (isConnected && address) {
      fetchTokens();
    }
  }, [address, isConnected]);

  console.log("DATA", data);

  return (
    <div className="flex flex-col sm:min-w-[358px] w-full lg:w-fit bg-[#8D33E5] text-white rounded-[24px]">
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold font-neue">My Portfolio</span>
        {threeDots}
      </div>
      {loading ? (
        <div className="flex justify-center items-center pb-20 pt-10">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center pb-20 pt-10">
          <p className="text-red-500">{error}</p>
        </div>
      ) : data?.length == 0 || data == undefined ? (
        <div className="flex justify-center items-center">
          <p className="text-white pb-20 pt-10">
            There is no data to display.
          </p>
        </div>
      ) : (
        <div className="flex flex-col border-t-2 border-black">
          {data?.map((token) => (
            <div
              key={token?.token_address}
              className="flex items-center gap-3 border-b-[0.5px] border-black px-4 py-3"
            >
              {/* Token Logo */}
              <div className="flex items-center justify-center min-h-[48px] min-w-[48px] h-[48px] w-[48px] rounded-full bg-black">
                <Image
                  src={token?.logo || "/logo.png"} // Fallback image if logo is not available
                  width={17}
                  height={17}
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
                {/* Balance in Ether format */}
                <span className="text-[19px] font-bold text-[#E1E1E1]">
                  {Number(token?.balance_formatted)?.toFixed(4)}
                </span>
                {/* USD Price */}
                <span className="text-xs text-[#E1E1E1]">
                  $
                  {token?.symbol === "CDL" || token?.name === "CDL"
                    ? "$0.023"
                    : token?.usd_price?.toFixed(2)}{" "}
                  USD
                </span>
                {/* 24hr price change */}
                <span
                  className={cn(
                    "bg-black px-2 py-0.5 rounded-full text-xs",
                    token?.usd_price_24hr_percent_change > 0
                      ? "text-[#1DD6B4]"
                      : "text-[#F46D22]"
                  )}
                >
                  {token?.usd_price_24hr_percent_change > 0
                    ? `+${
                        token?.usd_price_24hr_percent_change?.toFixed(2) || 0
                      }%`
                    : `${
                        token?.usd_price_24hr_percent_change?.toFixed(2) || 0
                      }%`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
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
