import type { Metadata } from "next";
import { Montserrat, Molle } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import './components/Map/Map.css';

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
});

const molle = Molle({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TraveLink",
  description: "Walk along with us!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: `${montserrat.style.fontFamily}, ${molle.style.fontFamily}` }}>
        {children}
      </body>
    </html>
  );
}