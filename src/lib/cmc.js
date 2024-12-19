export const getGraphData = async () => {
  const myHeaders = new Headers();
  myHeaders.append("X-CMC_PRO_API_KEY", "8f1b91d4-485e-4a9e-8db2-92b8b3f6c94d");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?symbol=btc&convert=usd&interval=1h",
      requestOptions
    );
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
