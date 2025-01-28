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
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";

const MobileSidebar = () => {
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();

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
              {/* <NavLink
                icon={portfolioIcon}
                title="Portfolio"
                href="/portfolio"
              /> */}
              <NavLink icon={stakingIcon} title="Staking" href="/staking" />
              <NavLink icon={voteIcon} title="Vote" href="/vote" />
              <NavLink icon={bridgeIcon} title="Bridge" href="/bridge" />
              <NavLink icon={claimIcon} title="Claim" href="/claim" />
              {isConnected ? (

                <w3m-button />
              ) : (
                <button
                  onClick={() => open()}
                  className="px-5 py-3 mt-5 flex items-center justify-center border border-white hover:border-primary hover:text-primary transition-all ease-in duration-200 rounded-lg font-neue font-bold"
                >
                  Connect wallet
                </button>
              )}
            </div>
            <div className="h-full w-full flex flex-col text-sm gap-2 justify-end pb-10 font-neue">
              <Link className="hover:underline" href="/static/whitepaper.pdf">
                Whitepaper
              </Link>
              <Link
                className="hover:underline"
                href="https://cdl-token.gitbook.io/cdl-token/"
              >
                Lightpaper
              </Link>
              <div className="flex items-center gap-4 pt-2">
                <Link href="https://x.com/CDL_Token">{XIcon}</Link>
                <Link href="https://t.me/CDL_Token">{telegramIcon}</Link>
                <Link href="https://discord.gg/qt5D3EVtsR">{discordIcon}</Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
