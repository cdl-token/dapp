import Image from "next/image";
import NavLink from "./NavLink";
import Link from "next/link";
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

const Sidebar = () => {
  return (
    <div className="items-center fixed left-0 top-0 gap-5 h-screen w-[300px] p-3 hidden md:flex">
      <div className="w-full h-full bg-[#15161766] rounded border-white/10 border flex flex-col gap-10 px-6">
        <div className="flex items-center gap-3 py-5">
          <Image src="/logo.svg" width={58} height={58} alt="Logo" />
          <span className="font-neue font-bold uppercase mt-1.5 text-lg">
            CDL TOKEN
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <NavLink icon={dashboardIcon} title="Dashboard" href="/" />
          {/* <NavLink icon={portfolioIcon} title="Portfolio" href="/portfolio" /> */}
          <NavLink icon={stakingIcon} title="Staking" href="/staking" />
          <NavLink icon={voteIcon} title="Vote" href="/vote" />
          <NavLink icon={bridgeIcon} title="Bridge" href="/bridge" />
          <NavLink icon={claimIcon} title="Claim" href="/claim" />
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
    </div>
  );
};

export default Sidebar;
