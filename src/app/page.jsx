// "use client";
import DashboardSection from "@/components/sections/DashboardSection";
import axios from "axios";

const getData = async () => {
  const apiKey = process.env.NEXT_PUBLIC_COIN_MARKET_CAP_API_KEY;
  const trendingUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/latest?start=1&limit=20`;
  const recentUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/new?start=1&limit=3`;
  const quotesUrl = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/historical?symbol=SOL,ETH,BNB,BTC&count=100&interval=5m`;
  const headers = {
    "X-CMC_PRO_API_KEY": apiKey,
  };

  try {
    const trendingResponse = await axios.get(trendingUrl, { headers });
    const recentResponse = await axios.get(recentUrl, { headers });

    const trendingTokenList = trendingResponse.data.data;
    const recentTokenList = recentResponse.data.data;

    const combinedTokenList = [...trendingTokenList, ...recentTokenList];

    const detailedResponse = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
      {
        params: {
          id: combinedTokenList.map((token) => token.id).join(","),
        },
        headers,
      }
    );

    const detailedDataMap = detailedResponse.data.data;

    const trendingTokens = trendingTokenList.map((token) => ({
      id: token.id,
      name: token.name,
      symbol: token.symbol,
      price: token.quote.USD.price.toFixed(2),
      percentage: token.quote.USD.percent_change_24h.toFixed(2),
      plusPercentage: token.quote.USD.percent_change_24h.toFixed(2),
      image: detailedDataMap[token.id]?.logo,
    }));

    const recentTokens = recentTokenList.map((token) => ({
      id: token.id,
      name: token.name,
      symbol: token.symbol,
      price: token.quote.USD.price.toFixed(2),
      percentage: token.quote.USD.percent_change_24h.toFixed(2),
      plusPercentage: token.quote.USD.percent_change_24h.toFixed(2),
      image: detailedDataMap[token.id]?.logo,
    }));

    // -------------- FN 2 -------------------------------

    const response2 = await axios.get(quotesUrl, { headers });
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
      trending: trendingTokens.slice(0, 3),
      recentlyAdded: recentTokens,
      portfolio: trendingTokens.slice(3, 10),
      // graph: trendingTokens.slice(3, 20),
      topCoins: trendingTokens,
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
        <DashboardSection data={data} />
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
