import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import { cn } from "@/lib/utils";
import Topbar from "@/components/topbar/Topbar";
import PreloaderProvider from "./PreloaderProvider";
import { Web3Modal } from "@/context/Web3Modal";
import { StoreProvider } from "@/context/Store";

const neueMachinaFont = localFont({
  src: [
    {
      path: "./fonts/neue-machina/NeueMachina-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/neue-machina/NeueMachina-Light.otf",
      weight: "100 300",
      style: "italic",
    },
    {
      path: "./fonts/neue-machina/NeueMachina-Ultrabold.otf",
      weight: "700 900",
      style: "normal",
    },
  ],
  variable: "--font-neue-machina",
});

const apfelFont = localFont({
  src: "./fonts/apfel-grotezk/ApfelGrotezk-Regular.woff",
  variable: "--font-apfel",
  weight: "100 900",
});

export const metadata = {
  title: "CDL DAPP",
  description: "Crypto Data Live Decentralized Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "text-white flex items-center relative w-full h-full bg-custom-bg font-apfel",
          neueMachinaFont.variable,
          apfelFont.variable
        )}
      >
        <Web3Modal>
          <StoreProvider>
            <PreloaderProvider>
              <div className="md:pl-[300px] w-full h-full">
                <Sidebar />
                <div className="flex flex-col w-full min-h-screen md:max-w-[calc(100vw-300px)] pr-3 relative">
                  <Topbar />
                  {children}
                </div>
              </div>
            </PreloaderProvider>
          </StoreProvider>
        </Web3Modal>
      </body>
    </html>
  );
}
