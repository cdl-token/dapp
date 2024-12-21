import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_COIN_MARKET_CAP_API_KEY; // Replace with your CoinMarketCap API key
const API_BASE_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return new Response(JSON.stringify({ error: "Symbol is required" }), {
      status: 400,
    });
  }

  try {
    // Make the API call to CoinMarketCap
    const response = await axios.get(API_BASE_URL, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
      },
      params: {
        symbol,
        interval: "daily", // Daily intervals
        count: 30, // Last 30 days
      },
    });
    const data = response.data.data;
    // Return the data
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to fetch CMC data:", error.message);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
