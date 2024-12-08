import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Loader from "./_components/loading";
import Provider from "./providers";

export const metadata: Metadata = {
  title: "Eventr",
  description: "Social Ticket Booking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className="relative bg-black circular-gradient text-white">
        <Provider>
          <Suspense
            fallback={
              <div>
                <Loader />
              </div>
            }
          >
            {children}
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
