import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { siteOrigin } from "@/lib/seo";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description = site.seo.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: site.seo.title,
    template: site.seo.titleTemplate,
  },
  description,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.seo.title,
    description,
    url: "/",
    /* `images` is deliberately omitted: `opengraph-image.tsx` in this directory
       generates the card at build time and Next injects the og:image and
       twitter:image tags from it. Declaring them here as well would emit each
       tag twice. */
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f9" },
    { media: "(prefers-color-scheme: dark)", color: "#06070a" },
  ],
};

/**
 * Runs before anything paints: applies the stored (or system) theme and, when
 * IntersectionObserver exists, unlocks the scroll-reveal and terminal
 * animations. Without JavaScript the site renders fully visible in the theme's
 * default colours.
 */
const bootstrapScript = `(function(){try{var d=document.documentElement;var s=null;try{s=window.localStorage.getItem('portfolio-theme')}catch(e){}var m=(s==='light'||s==='dark')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.classList.toggle('dark',m==='dark');d.dataset.theme=m;d.style.colorScheme=m;if('IntersectionObserver' in window){d.dataset.reveal='ready'}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      /* The bootstrap script above sets the theme class before React hydrates. */
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />

        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2.5 focus:text-sm focus:text-ink"
          >
            Skip to content
          </a>

          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}