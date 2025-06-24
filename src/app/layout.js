"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import MouseClickEffect from "@/components/MouseClickEffect";
import { Toaster } from "react-hot-toast";
import { VolumeProvider } from "@/components/context/VolumeControlContext";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <VolumeProvider>
          <div className="relative w-[100dvw] h-[100dvh] cursor-custom">
            {isLoginPage ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-screen h-screen">
                {children}
                <Toaster position="bottom-center" />
                <div id="modal"></div>
              </div>
            ) : (
              <div className="absolute top-1/2 left-1/2 rotate-90 sm:rotate-0 transform -translate-x-1/2 -translate-y-1/2 w-[100dvh] h-[100dvw] sm:w-screen sm:h-screen">
                <MouseClickEffect />
                {children}
                <Toaster position="bottom-center" />
                <div id="modal"></div>
              </div>
            )}
          </div>
        </VolumeProvider>
      </body>
    </html>
  );
}
