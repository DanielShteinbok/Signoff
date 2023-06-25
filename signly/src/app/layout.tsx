import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: {
    default: "Next.js App Router",
    template: "%s | Next.js App Router",
  },
  description:
    "A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <body className="bg-gray-1100 overflow-y-scroll bg-[url('/grid.svg')] pb-36">
        {/* ExternalNavbar */}

        <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:py-8 lg:px-8">
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black">{/* <NavbarHere with centered items /> */}</div>
          </div>

          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className={"rounded-lg bg-black p-3.5 lg:p-6" + inter.className}>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
