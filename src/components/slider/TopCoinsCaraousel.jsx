"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const TopCoinsCaraousel = () => {
  return (
    <div className="w-[1490px]">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem className="basis-1/3 flex items-center justify-center pl-5 w-full h-[300px] max-w-[calc(100vw-20px)]">
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
                    src="/slider/coins/shiba-inu.svg"
                    width={48}
                    height={48}
                    alt="shiba inu"
                  />
                  <span className="text-custom-gray mt-2">ShibaInu</span>
                  <span className="text-[28px] font-semibold">$ 0.0008827</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-custom-green2 text-[28px]">
                    +660991%
                  </span>
                  <span className="text-custom-gray/50 font-light">
                    All time
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 flex items-center justify-center pl-5 w-full h-[300px] max-w-[calc(100vw-20px)]">
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
                    src="/slider/coins/shiba-inu.svg"
                    width={48}
                    height={48}
                    alt="shiba inu"
                  />
                  <span className="text-custom-gray mt-2">ShibaInu</span>
                  <span className="text-[28px] font-semibold">$ 0.0008827</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-custom-green2 text-[28px]">
                    +660991%
                  </span>
                  <span className="text-custom-gray/50 font-light">
                    All time
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 flex items-center justify-center pl-5 w-full h-[300px] max-w-[calc(100vw-20px)]">
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
                    src="/slider/coins/shiba-inu.svg"
                    width={48}
                    height={48}
                    alt="shiba inu"
                  />
                  <span className="text-custom-gray mt-2">ShibaInu</span>
                  <span className="text-[28px] font-semibold">$ 0.0008827</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-custom-green2 text-[28px]">
                    +660991%
                  </span>
                  <span className="text-custom-gray/50 font-light">
                    All time
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 flex items-center justify-center pl-5 w-full h-[300px] max-w-[calc(100vw-20px)]">
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
                    src="/slider/coins/shiba-inu.svg"
                    width={48}
                    height={48}
                    alt="shiba inu"
                  />
                  <span className="text-custom-gray mt-2">ShibaInu</span>
                  <span className="text-[28px] font-semibold">$ 0.0008827</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-custom-green2 text-[28px]">
                    +660991%
                  </span>
                  <span className="text-custom-gray/50 font-light">
                    All time
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 flex items-center justify-center pl-5 w-full h-[300px] max-w-[calc(100vw-20px)]">
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
                    src="/slider/coins/shiba-inu.svg"
                    width={48}
                    height={48}
                    alt="shiba inu"
                  />
                  <span className="text-custom-gray mt-2">ShibaInu</span>
                  <span className="text-[28px] font-semibold">$ 0.0008827</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-custom-green2 text-[28px]">
                    +660991%
                  </span>
                  <span className="text-custom-gray/50 font-light">
                    All time
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TopCoinsCaraousel;
