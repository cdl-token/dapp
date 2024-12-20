"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const TopCoinsCaraousel = ({ data }) => {
  return (
    <div className="w-[1490px] 2xl:w-[3000px]">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {data.map((coin) => (
            <CarouselItem
              key={coin.id}
              className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/5 flex items-center justify-center pl-5 w-full h-[300px] max-w-[calc(100vw-20px)]"
            >
              <div className="rounded-[34px] w-full h-full bg-custom-darkgray">
                <div
                  className="w-full h-full flex flex-col justify-between p-4"
                  style={{
                    background: "url(/slider/graph.svg)",
                    backgroundPosition: "bottom",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="flex flex-col">
                    <Image
                      src={coin.image || "/placeholder.svg"} // Use placeholder if image is missing
                      width={48}
                      height={48}
                      alt={coin.name}
                    />
                    <span className="text-custom-gray mt-2">{coin.name}</span>
                    <span className="text-[28px] font-semibold">
                      ${coin.price}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-[28px] ${
                        coin.plusPercentage >= 0
                          ? "text-custom-green2"
                          : "text-custom-red"
                      }`}
                    >
                      {coin.plusPercentage >= 0 ? "+" : ""}
                      {coin.plusPercentage}%
                    </span>
                    <span className="text-custom-gray/50 font-light">
                      All time
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TopCoinsCaraousel;
