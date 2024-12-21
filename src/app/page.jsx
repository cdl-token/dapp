import PortfolioCard from "@/components/cards/PortfolioCard";
import RecentlyAdded from "@/components/cards/RecentlyAdded";
import TrendingCard from "@/components/cards/TrendingCard";
import LightGraph from "@/components/graph/LightGraph";
import MainPageGraph from "@/components/graph/MainPageGraph";
import TopCoinsCaraousel from "@/components/slider/TopCoinsCaraousel";
import axios from "axios";

const getData = async () => {
  const apiKey = process.env.NEXT_PUBLIC_COIN_MARKET_CAP_API_KEY;
  const baseUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=20`;
  const headers = {
    "X-CMC_PRO_API_KEY": apiKey,
  };

  try {
    const response = await axios.get(baseUrl, { headers });
    const tokenList = response.data.data;

    const detailedResponse = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
      {
        params: {
          id: tokenList.map((token) => token.id).join(","),
        },
        headers,
      }
    );

    const detailedDataMap = detailedResponse.data.data;

    const tokens = tokenList.map((token) => ({
      id: token.id,
      name: token.name,
      symbol: token.symbol,
      price: token.quote.USD.price.toFixed(2),
      percentage: token.quote.USD.percent_change_24h.toFixed(2),
      plusPercentage: token.quote.USD.percent_change_24h.toFixed(2),
      image: detailedDataMap[token.id]?.logo,
    }));

    // -------------- FN 2 -------------------------------
    const baseUrl2 = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/historical?symbol=SOL,ETH,BNB,BTC&count=100&interval=5m`;
    const response2 = await axios.get(baseUrl2, { headers });
    const tokenList2 = response2.data.data;

    const formattedData = Object.keys(tokenList2).reduce((acc, symbol) => {
      acc[symbol] = tokenList2[symbol][0].quotes
        .map((quote) => {
          const timestamp = quote?.timestamp;
          const price = quote?.quote?.USD?.price;

          const unixTime = timestamp
            ? Math.floor(new Date(timestamp).getTime() / 1000)
            : null;

          if (unixTime && price) {
            return { time: unixTime, price };
          }
          return null;
        })
        .filter(Boolean)
        .sort((a, b) => a.time - b.time);
      return acc;
    }, {});
    // -------------- FN 2 -------------------------------

    return {
      trending: tokens.slice(0, 3),
      recentlyAdded: tokens.slice(3, 6),
      portfolio: tokens.slice(6, 13),
      graph: tokens.slice(11, 20),
      topCoins: tokens,
      formattedData: formattedData,
    };
  } catch (error) {
    console.error("Error fetching portfolio tokens:", error);
    throw new Error("Failed to fetch data");
  }
};

export default async function Home() {
  try {
    const data = await getData();

    return (
      <div className="flex flex-col pl-3 pr-5 pb-10">
        <span className="text-custom-gray font-neue">
          Today's prices by Crypto Data Live Token
        </span>
        <div className="grid lg:grid-cols-2 py-5 gap-3 w-full">
          <TrendingCard data={data.trending} />
          <RecentlyAdded data={data.recentlyAdded} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 py-5">
          <PortfolioCard data={data.portfolio} />
          <div className="w-full bg-blue-200/5 rounded-3xl text-xl font-bold uppercase p-5 flex items-center justify-center">
            {/* <MainPageGraph data={data.graph} /> */}
            <LightGraph coinData={data.formattedData} />
          </div>
        </div>
        <div className="flex flex-col gap-5 overflow-hidden">
          <span className="text-2xl font-apfel">Top coins</span>
          <TopCoinsCaraousel data={data.topCoins} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering Home component:", error);
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="text-red-500 font-bold text-lg">
          Failed to load data. Please try again later.
        </span>
      </div>
    );
  }
}
