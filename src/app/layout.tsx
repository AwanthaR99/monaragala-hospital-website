import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AOSInitializer from '@/components/AOSInitializer';

// Configure the fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-poppins',
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: "Monaragala General Hospital",
  description: "Official website for the District General Hospital, Monaragala.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${lato.variable} font-lato`}>
        <AOSInitializer />
        <Header /> 
        {children}
        <Footer /> 
      </body>
    </html>
  );
}