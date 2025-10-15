import { ThemeProvider } from "@/src/presentation/components/providers/ThemeProvider";
import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Work Pulse - ระบบบันทึกการเข้างานและลาของพนักงาน",
  description:
    "ระบบบันทึกการเข้างานและการลาที่ทันสมัย ใช้งานง่าย ช่วยให้คุณและทีมมีความสุขในการทำงานมากขึ้น เริ่มใช้งานฟรี",
  keywords: [
    "ระบบบันทึกการเข้างาน",
    "ระบบลา",
    "attendance system",
    "leave management",
    "HR system",
    "work tracking",
    "employee management",
    "Work Pulse",
    "การจัดการพนักงาน",
    "ระบบ HR",
  ],
  authors: [{ name: "Work Pulse Team" }],
  creator: "Marosdee Uma",
  publisher: "Work Pulse",
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
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Work Pulse - ระบบบันทึกการเข้างานและลาของพนักงาน",
    description:
      "ระบบบันทึกการเข้างานและการลาที่ทันสมัย ใช้งานง่าย เริ่มใช้งานฟรี",
    type: "website",
    siteName: "Work Pulse",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Work Pulse - Attendance and Leave Management System",
      },
    ],
    locale: "th_TH",
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
