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
    <div className="bg-red-200 w-[1490px]">
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
          <CarouselItem className="basis-1/3 flex items-center justify-center pl-5 w-full h-[300px]">
            <div
              className="rounded-2xl w-full h-full bg-black/20"
              style={{
                background: `
                radial-gradient(100% 100% at 0% 0%, #000000 7.61%, #A3A3A3 57.81%, #000000 100%), 
                conic-gradient(from 180deg at 50% 50%, #2C9543 0deg, #77ED91 16.88deg, #77ED91 88.12deg, 
                #77ED91 151.87deg, #77EDB4 225deg, #7EFF9B 288.75deg, #2C9543 360deg)
              `,
                backgroundBlendMode: "screen",
              }}
            >
              <div className="flex bg-black/30">
                <Image
                  src="/slider/graph.svg"
                  width={360}
                  height={201}
                  alt="graph"
                />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 flex items-center justify-center pl-5 w-full h-[300px]">
            <div className="rounded-2xl w-full h-full bg-black/20"></div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 flex items-center justify-center pl-5 w-full h-[300px]">
            <div className="rounded-2xl w-full h-full bg-black/20"></div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 flex items-center justify-center pl-5 w-full h-[300px]">
            <div className="rounded-2xl w-full h-full bg-black/20"></div>
          </CarouselItem>
          <CarouselItem className="basis-1/3 flex items-center justify-center pl-5 w-full h-[300px]">
            <div className="rounded-2xl w-full h-full bg-black/20"></div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TopCoinsCaraousel;
