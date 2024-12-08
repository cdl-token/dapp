import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import { cn } from "@/lib/utils";
import Topbar from "@/components/topbar/Topbar";

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
          "text-white flex items-center relative w-full h-full md:pl-[300px] bg-custom-bg font-apfel",
          neueMachinaFont.variable,
          apfelFont.variable
        )}
      >
        <Sidebar />
        <div className="flex flex-col w-full min-h-screen md:max-w-[calc(100vw-300px)] relative">
          <Topbar />
          {children}
        </div>
      </body>
    </html>
  );
}
