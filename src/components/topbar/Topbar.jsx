"use client";

import MobileSidebar from "../sidebar/MobileSidebar";

const Topbar = () => {
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="p-5 flex justify-between md:max-w-[calc(100vw-300px)] w-full items-center fixed pr-5 top-4">
      <div className="flex flex-col">
        <span className="text-[28px] font-neue">Dashboard</span>
        <span className="text-[#909093] text-xs">
          Updated on {formattedDate}
        </span>
      </div>
      <MobileSidebar />
      <button className="px-5 py-3 hidden md:flex border border-white hover:border-primary hover:text-primary transition-all ease-in duration-200 rounded-lg font-neue font-bold">
        Connect wallet
      </button>
    </div>
  );
};

export default Topbar;
