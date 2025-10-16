import { ThemeProvider } from "@/src/presentation/components/providers/ThemeProvider";
import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Next Link - โซเชียลมีเดียเชื่อมต่อคนทั่วโลก",
  description:
    "แพลตฟอร์มโซเชียลมีเดียที่ทันสมัย เชื่อมต่อกับเพื่อน ครอบครัว และคนที่คุณรัก แชร์ช่วงเวลาสำคัญ สร้างความทรงจำร่วมกัน และค้นพบสิ่งใหม่ๆ ทุกวัน",
  keywords: [
    "social media",
    "โซเชียลมีเดีย",
    "social network",
    "connect",
    "friends",
    "sharing",
    "community",
    "Next Link",
    "เชื่อมต่อ",
    "แชร์",
    "เพื่อน",
    "คอมมูนิตี้",
    "แชร์รูปภาพ",
    "วิดีโอ",
    "messenger",
    "chat",
  ],
  authors: [{ name: "Next Link Team" }],
  creator: "Marosdee Uma",
  publisher: "Next Link",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: ["/favicon.ico"],
    apple: ["/favicon/apple-touch-icon.png"],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Next Link - โซเชียลมีเดียเชื่อมต่อคนทั่วโลก",
    description:
      "แพลตฟอร์มโซเชียลมีเดียที่ทันสมัย เชื่อมต่อกับเพื่อน ครอบครัว และคนที่คุณรัก แชร์ช่วงเวลาสำคัญและค้นพบสิ่งใหม่ๆ",
    type: "website",
    siteName: "Next Link",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next Link - Social Media Platform",
      },
    ],
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Link - โซเชียลมีเดียเชื่อมต่อคนทั่วโลก",
    description:
      "แพลตฟอร์มโซเชียลมีเดียที่ทันสมัย เชื่อมต่อกับเพื่อน ครอบครัว และคนที่คุณรัก",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
