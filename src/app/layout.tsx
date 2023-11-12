import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flash Poll",
  description: "Create a poll and share it!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="h-screen overflow-y-scroll">
        <div className="navbar bg-base-100">
          <a
            className="btn btn-ghost border-4 btn-outline normal-case font-black text-4xl"
            href="/"
          >
            FlashPoll
          </a>
        </div>
        <div className="content-wrapper">{children}</div>
      </body>
    </html>
  );
}
