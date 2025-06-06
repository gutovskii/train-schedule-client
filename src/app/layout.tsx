import type { Metadata } from "next";
import "./globals.css";
import 'antd/dist/reset.css';
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import AntdProvider from "@/lib/AntdProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Kevych Trail Scheduler",
  description: "What is the most popular fish in the ocean? The starfish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Suspense fallback={<div>Loading...</div>}>
          <ReactQueryProvider>
            <AntdProvider>
              {children}
            </AntdProvider>
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
