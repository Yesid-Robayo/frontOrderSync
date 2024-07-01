import type { Metadata } from "next";
import "./globals.css";
import { notoSans } from "./styles/fonts";
import { NavBar } from "./components/navBar/NavBar";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: "OrderSync ",
  description: "PageWeb For OrderSync",
  keywords: "OrderSync, Order, Sync, Web, Page",
  icons: {
    icon: "/favicon.ico",
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`flex ${notoSans.className}  antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className={`lg:grid lg:grid-cols-4 w-screen sm:flex-col lg:h-screen`}>
            <section className="lg:col-span-1 lg:h-screen">
              <NavBar />
            </section>
            <section className=" lg:col-span-3">
              <main >
                {children}
              </main>
            </section>
          </div>
        </NextIntlClientProvider>


      </body>
    </html >
  );
}
