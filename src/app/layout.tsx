import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HPP Test",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
