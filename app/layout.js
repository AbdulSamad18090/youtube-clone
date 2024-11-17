import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider/StoreProvider";
import Header from "@/components/Header/header";
import Sidebar from "@/components/Sidebar/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "YouTube",
  description: "YouTube Clone Created By Abdul Samad.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <Header />
          <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
