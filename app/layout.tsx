import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Global styles
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "SolarGest - Gestão Solar",
  description: "Plataforma SaaS de Gestão para Empresas de Energia Solar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
