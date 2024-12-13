import Image from "next/image";
import Link from "next/link";

const RecentlyAdded = () => {
  const recentlyAdded = [
    {
      id: 1,
      icon: "/pinkcoin.svg",
      title: "Pinoxa",
      symbol: "pino",
      price: "$0.000314",
    },
    {
      id: 2,
      icon: "/stacks.svg",
      title: "Stacks",
      symbol: "stk",
      price: "$0.0008765",
    },
    {
      id: 3,
      icon: "/pinkcoin.svg",
      title: "Symbol",
      symbol: "syb",
      price: "$0.00000001239",
    },
  ];
  return (
    <div className="rounded-[24px] bg-custom-darkgray px-4 py-3 flex flex-col">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-[26px] pb-2">⌛</span>
          <span className="text-[22px] font-neue">Recently added</span>
        </div>
        <Link className="text-custom-green font-neue text-sm" href="#">
          See all
        </Link>
      </div>
      <div className="flex flex-col gap-1.5 pt-5 pb-8">
        {recentlyAdded.map((token, index) => (
          <div
            key={index}
            className="rounded-full bg-custom-gray2 w-full flex px-4 py-3 items-center"
          >
            <div className="flex items-center gap-2 w-full">
              <span>{token.id}</span>
              <Image
                src={token.icon}
                className="pt-1"
                width={20}
                height={18}
                alt="usdt"
              />
              <div className="flex items-baseline gap-1">
                <span className="">{token.title}</span>
                <span className="text-custom-gray text-sm uppercase">
                  {token.symbol}
                </span>
              </div>
            </div>
            <span className="font-apfel">{token.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
