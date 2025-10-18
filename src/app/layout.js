import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Medical Dashboard',
  description: 'Medical Record Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen">
          <header className="bg-white shadow p-4">
            <div className="container mx-auto">
              <h1 className="text-xl font-semibold">Medical Record Dashboard</h1>
            </div>
          </header>
          <main className="container mx-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
