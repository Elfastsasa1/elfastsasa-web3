import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { Web3Provider } from "@/components/providers/Web3Provider";

export const metadata: Metadata = {
  title: "ElfastsasaWEB3 Dashboard",
  description: "Web3 Dashboard — Connect wallet, track ETH balance, transactions & tokens",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        {/* ThemeProvider handles dark/light mode class on <html> */}
        <ThemeProvider>
          {/* Web3Provider holds wallet state globally */}
          <Web3Provider>
            {/* ToastProvider renders toast notifications */}
            <ToastProvider>
              {children}
            </ToastProvider>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
