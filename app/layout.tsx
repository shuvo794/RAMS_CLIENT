import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AddressSection from "@/components/AddressSection";
import NavbarSection from "@/components/NavbarSection";
import FooterSection from "@/components/FooterSection";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://blue-bay-front-end.vercel.app"),
  title: {
    default: "RAMS",
    template: "%s | RAMS",
  },
  description: "Leading IT solutions provider for businesses of all sizes",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blue-bay-front-end.vercel.app",
    siteName: "RAMS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RAMS",
      },
      {
        url: "/og-image-w.png",
        width: 400,
        height: 400,
        alt: "RAMS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bluebayit",
    creator: "@bluebayit",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <div className="hidden sm:block">
            <AddressSection />
          </div> */}
          <NavbarSection />
          {children}
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}
