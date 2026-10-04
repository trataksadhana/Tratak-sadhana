import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsApp } from "../components/WhatsApp";
import { LanguageProvider } from "../components/LanguageProvider";

export const metadata: Metadata = {
  title: "Sadhna Foundation | सेवा, समर्पण और संस्कार",
  description: "Sadhna Foundation — education, women empowerment, healthcare, environment and youth development.",
  metadataBase: new URL("https://sadhnafoundation.org")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><LanguageProvider><Header/><main>{children}</main><Footer/><WhatsApp/></LanguageProvider></body></html>;
}
