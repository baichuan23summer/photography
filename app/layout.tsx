import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { site } from "@/data/site";
import { assetPath } from "@/lib/paths";
import "./globals.css";

const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const socialImage = publicSiteUrl
  ? new URL(assetPath("/og.png"), publicSiteUrl).toString()
  : undefined;

export const metadata: Metadata = {
  metadataBase: publicSiteUrl ? new URL(publicSiteUrl) : undefined,
  title: {
    default: site.title,
    template: `%s — ${site.displayName}`,
  },
  description: site.description,
  applicationName: site.title,
  icons: { icon: assetPath("/favicon.svg") },
  openGraph: {
    type: "website",
    title: site.title,
    description: site.description,
    siteName: site.title,
    images: socialImage
      ? [{ url: socialImage, width: 1200, height: 630, alt: site.title }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: socialImage ? [socialImage] : undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f3f1eb",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} {site.displayName}</p>
          <p>{site.locationLabel}</p>
        </footer>
      </body>
    </html>
  );
}
