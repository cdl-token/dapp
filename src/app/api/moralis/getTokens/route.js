import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url); // Get the request URL
  console.log(url,'url');
  const address = url.searchParams.get('address'); // Get 'address' from search params

  console.log(address, "address from search params");

  if (!address) {
    return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
  }

  const API_KEY = process.env.NEXT_PUBLIC_COIN_MORALIS_API_KEY;

  const myHeaders = new Headers();
  myHeaders.append('X-API-Key', API_KEY);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  try {
    const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=eth`, requestOptions);
    const result = await response.json(); // Parse the response as JSON

    return NextResponse.json({ data: result }); // Send the result as a JSON response
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
