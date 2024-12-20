import axios from "axios";

export async function GET(request) {
  const apiKey = process.env.NEXT_PUBLIC_COIN_MARKET_CAP_API_KEY;
  const baseUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=2000&limit=3`;
  const headers = {
    "X-CMC_PRO_API_KEY": apiKey,
  };

  try {
    // Fetch the initial list of tokens
    const response = await axios.get(baseUrl, { headers });
    const data = response.data.data;

    // Fetch detailed token data including logos
    const detailedTokenData = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
      {
        params: {
          id: data.map((token) => token.id).join(","),
        },
        headers,
      }
    );

    const detailedDataMap = detailedTokenData.data.data;

    // Combine the data
    const tokens = data.map((token, index) => ({
      id: index + 1,
      icon: detailedDataMap[token.id]?.logo,
      title: token.name,
      symbol: token.symbol,
      percentage: token.quote.USD.percent_change_24h,
    }));

    return new Response(JSON.stringify(tokens), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching trending tokens:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch trending tokens" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
