"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const fetchCMCData = async (interval) => {
  try {
    const response = await fetch(
      `/api/coinmarketcap`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from the backend API");
    }

    const data = await response.json();
    return data.data.quotes.map((quote) => ({
      time: quote.timestamp,
      price: quote.quote.USD.price,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};


// Helper to generate labels based on the selected interval
const generateLabels = (intervalMinutes, intervalType) => {
  const now = new Date();
  const labels = [];
  for (let i = 0; i < 10; i++) {
    const time = new Date(now.getTime() + i * intervalMinutes * 60 * 1000);
    if (intervalType === "days") {
      labels.push(
        `${time.getDate()} ${time.toLocaleString("default", {
          month: "short",
        })}`
      );
    } else if (intervalType === "weeks") {
      const week = Math.ceil((time.getDate() - time.getDay()) / 7);
      labels.push(`Week ${week}`);
    } else if (intervalType === "months") {
      labels.push(time.toLocaleString("default", { month: "short" }));
    } else {
      labels.push(time.toISOString());
    }
  }
  return labels;
};

const MainPageGraph = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "TEAM A",
        type: "column",
        data: [
          23000, 11000, 22000, 27000, 13000, 22000, 37000, 21000, 44000, 22000,
          30000,
        ],
      },
      {
        name: "TEAM B",
        type: "area",
        data: [
          44000, 55000, 41000, 67000, 22000, 43000, 21000, 41000, 56000, 27000,
          43000,
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 2],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      fill: {
        opacity: [0.85, 0.25],
        colors: ["#DEC95B33", "#8D33E5"],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: generateLabels(60, "hours"), // Default: 1-hour interval
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
        labels: {
          formatter: function (val) {
            const date = new Date(val);
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          color: "#D9D9D9",
        },
      },
      yaxis: {
        min: 0,
        max: 100000,
        title: {
          text: "Points",
        },
      },
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toLocaleString() + " points";
            }
            return y;
          },
        },
      },
    },
    selectedInterval: "60", // Default interval (in minutes)
  });

  // Update the chart's labels and selected button style based on the selected interval
  const updateInterval = (intervalMinutes, intervalType) => {
    setState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        labels: generateLabels(intervalMinutes, intervalType),
        xaxis: {
          ...prevState.options.xaxis,
          labels: {
            formatter: function (val) {
              const date = new Date(val);
              if (intervalType === "days") {
                return `${date.getDate()} ${date.toLocaleString("default", {
                  month: "short",
                })}`;
              } else if (intervalType === "weeks") {
                const week = Math.ceil((date.getDate() - date.getDay()) / 7);
                return `Week ${week}`;
              } else if (intervalType === "months") {
                return date.toLocaleString("default", { month: "short" });
              } else {
                const hours = date.getHours().toString().padStart(2, "0");
                const minutes = date.getMinutes().toString().padStart(2, "0");
                return `${hours}:${minutes}`;
              }
            },
          },
        },
      },
      selectedInterval: intervalMinutes.toString(),
    }));
  };

  const fetchData = async (interval) => {
    const data = await fetchCMCData();
    console.log("DATA", data);
    return data;
  };

  useEffect(() => {
    fetchData(state.selectedInterval);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-end gap-2 mb-4">
        <button
          className={`px-4 py-0.5 bg-transparent ${
            state.selectedInterval === "60"
              ? "border-[#DDC85B] text-black bg-[#ecd563]"
              : "hover:border-[#DDC85B] hover:text-black hover:bg-[#DDC85B]"
          } border border-[#31353F] rounded-full text-xs`}
          onClick={() => updateInterval(60, "hours")}
        >
          1h
        </button>
        <button
          className={`px-4 py-0.5 bg-transparent ${
            state.selectedInterval === "180"
              ? "border-[#DDC85B] text-black bg-[#DDC85B]"
              : "hover:border-[#DDC85B] hover:text-black hover:bg-[#DDC85B]"
          } border border-[#31353F] rounded-full text-xs`}
          onClick={() => updateInterval(180, "hours")}
        >
          3h
        </button>
        <button
          className={`px-4 py-0.5 bg-transparent ${
            state.selectedInterval === "1440"
              ? "border-[#DDC85B] text-black bg-[#DDC85B]"
              : "hover:border-[#DDC85B] hover:text-black hover:bg-[#DDC85B]"
          } border border-[#31353F] rounded-full text-xs`}
          onClick={() => updateInterval(1440, "days")}
        >
          1d
        </button>
        <button
          className={`px-4 py-0.5 bg-transparent ${
            state.selectedInterval === "10080"
              ? "border-[#DDC85B] text-black bg-[#DDC85B]"
              : "hover:border-[#DDC85B] hover:text-black hover:bg-[#DDC85B]"
          } border border-[#31353F] rounded-full text-xs`}
          onClick={() => updateInterval(10080, "weeks")}
        >
          1w
        </button>
        <button
          className={`px-4 py-0.5 bg-transparent ${
            state.selectedInterval === "43200"
              ? "border-[#DDC85B] text-black bg-[#DDC85B]"
              : "hover:border-[#DDC85B] hover:text-black hover:bg-[#DDC85B]"
          } border border-[#31353F] rounded-full text-xs`}
          onClick={() => updateInterval(43200, "months")}
        >
          1m
        </button>
      </div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default MainPageGraph;
