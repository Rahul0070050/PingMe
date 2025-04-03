import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { SocketProvider } from "./socketContext";

const roboto = Roboto({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chat",
  description: "Chatting Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <StoreProvider>
          <SocketProvider>{children}</SocketProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
