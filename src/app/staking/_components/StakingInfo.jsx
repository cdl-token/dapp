import { Dot } from "lucide-react";

export default function StakingInfo() {
  return (
    <div className="col-span-6 flex w-full flex-col items-center gap-3 rounded-3xl bg-custom-darkgray p-5">
      <h1 className="w-full text-center text-2xl font-medium">Staking info</h1>
      <div className="flex w-full items-baseline gap-3 text-lg">
        <div className="w-[12px]">
          <Dot size={12} />
        </div>
        Locked CDL is a special token that is pegged to the CDL token rate.
      </div>
      <div className="flex w-full items-baseline gap-3 text-lg">
        <div className="w-[12px]">
          <Dot size={12} />
        </div>
        Locked CDL will be distributed to all CDL holders on the CDL network
        based on the snapshot of balances from May 31, 2024.
      </div>
      <div className="flex w-full items-baseline gap-3 text-lg">
        <div className="w-[12px]">
          <Dot size={12} />
        </div>
        Locked CDL can be staked to earn additional rewards: increased APR and
        bonus Booster Points.
      </div>
      <div className="flex w-full items-baseline gap-3 text-lg">
        <div className="w-[12px]">
          <Dot size={12} />
        </div>
        The longer you stake, the higher the APR reward. After ending stake
        period reward will stop accumulate
      </div>
      <div className="flex w-full items-baseline gap-3 text-lg">
        <div className="w-[12px]">
          <Dot size={12} />
        </div>
        To participate in the IDO, you must stake a minimum of 2,000 Locked CDL
        tokens.
      </div>
      <div className="flex w-full items-baseline gap-3 text-lg">
        <div className="w-[12px]">
          <Dot size={12} />
        </div>
        At the TGE, you can convert Locked CDL tokens to CDL tokens at a 1:1
        ratio.
      </div>
    </div>
  );
}
