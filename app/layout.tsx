import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calculadora de costos de transporte",
  description:
    "Creada por el Instituto de Energía de la Universidad Nacional de Cuyo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="p-4">{children}</div>
        <footer>
          © 2024 Instituto de Energía de la Universidad Nacional de Cuyo
        </footer>
      </body>
    </html>
  );
}
