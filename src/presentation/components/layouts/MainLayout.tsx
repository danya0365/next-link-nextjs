"use client";

import { ReactNode } from "react";
import { Header } from "@/src/presentation/components/layouts/Header";
import { Footer } from "@/src/presentation/components/layouts/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Main Layout Component
 * Layout หลักของแอพพลิเคชั่น ประกอบด้วย Header, Content Area และ Footer
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
