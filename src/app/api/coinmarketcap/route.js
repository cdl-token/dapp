// app/api/coinmarketcap/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
  const API_KEY = process.env.NEXT_PUBLIC_COIN_MARKET_CAP_API_KEY; // Securely stored in .env.local
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || "BTC";
  const convert = searchParams.get("convert") || "USD";
  const interval = searchParams.get("interval") || "60"; // Default to 60 minutes

  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?symbol=BTC&convert=USD&interval=1h`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.statusText}`);
    }

    const data = await response.text();
    console.log("DATA", data);
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch data from CoinMarketCap API" },
      { status: 500 }
    );
  }
}
