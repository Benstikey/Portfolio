import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wassim Benchekroun - Freelance Webflow Developer",
  description: "Freelance Webflow developer with a passion for crafting responsive, high-converting websites. Specializing in Webflow, Framer, and low-code solutions to deliver exceptional digital experiences. Contact me for custom website development and design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SpeedInsights />
      </body>
      
    </html>
  );
}
