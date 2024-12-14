import ScoresCard from "../_components/ScoresCard";
import StakingCard from "../_components/StakingCard";
import StakingInfo from "../_components/StakingInfo";

export default async function StakingSubPage({ params }) {
  const slug = (await params).slug;
  return (
    <div className="flex w-full flex-col justify-center py-10 px-5">
      <h1 className="mb-5 text-5xl font-semibold text-white">Staking</h1>
      <div className="grid grid-cols-6 gap-6">
        <StakingCard slug={slug} />
        <ScoresCard />
        <StakingInfo />
      </div>
    </div>
  );
}
