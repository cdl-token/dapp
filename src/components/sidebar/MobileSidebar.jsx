import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavLink from "./NavLink";
import {
  XIcon,
  bridgeIcon,
  claimIcon,
  dashboardIcon,
  discordIcon,
  portfolioIcon,
  stakingIcon,
  telegramIcon,
  voteIcon,
} from "./sidebar-icons";
import Link from "next/link";
import Image from "next/image";

const MobileSidebar = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent className="p-0 bg-transparent border-transparent">
          <SheetHeader>
            <SheetTitle className="hidden">CDL TOKEN</SheetTitle>
          </SheetHeader>
          <div className="w-full h-full bg-[#151617] border-white/10 border flex flex-col gap-10 px-6">
            <div className="flex items-center gap-3 py-5">
              <Image src="/logo.svg" width={58} height={58} alt="Logo" />
              <span className="font-neue font-bold uppercase mt-1.5 text-lg">
                CDL TOKEN
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <NavLink icon={dashboardIcon} title="Dashboard" href="/" />
              <NavLink
                icon={portfolioIcon}
                title="Portfolio"
                href="/portfolio"
              />
              <NavLink icon={stakingIcon} title="Staking" href="/staking" />
              <NavLink icon={voteIcon} title="Vote" href="/vote" />
              <NavLink icon={bridgeIcon} title="Bridge" href="/bridge" />
              <NavLink icon={claimIcon} title="Claim" href="/claim" />
            </div>
            <div className="h-full w-full flex flex-col text-sm gap-2 justify-end pb-10 font-neue">
              <Link className="hover:underline" href="/support">
                Support
              </Link>
              <Link className="hover:underline" href="/">
                Docs
              </Link>
              <div className="flex items-center gap-4 pt-2">
                <Link href="#">{XIcon}</Link>
                <Link href="#">{telegramIcon}</Link>
                <Link href="#">{discordIcon}</Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
