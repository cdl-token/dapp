"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ icon, title, href }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center group rounded-full gap-1 p-[2.5px] h-[48px] w-[170px] border-[3px]",
        pathname === href
          ? "bg-white text-black border-[#83c992]"
          : "border-transparent hover:bg-white hover:text-black"
      )}
    >
      <div
        className={cn(
          "w-[38px] h-[38px]  flex items-center justify-center rounded-full",
          pathname === href ? "bg-black" : "group-hover:bg-black"
        )}
      >
        {icon}
      </div>
      <div>{title}</div>
    </Link>
  );
};

export default NavLink;
