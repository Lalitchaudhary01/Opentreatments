import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Providers from "./providers";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OpenTreatments | Healthcare services.",
  description:
    "Open Treatment — Healthcare Cost Transparency. A patient-first platform that makes healthcare costs predictable, transparent, and accessible.",
  icons: {
    icon: "/Subtract.svg",
    shortcut: "/Subtract.svg",
    apple: "/Subtract.svg",
  },
  verification: {
    google: "CmgxHA4xOB2Nw76KccHIjbJt1mKt9VwehY40rbHXdT4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={plusJakarta.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
