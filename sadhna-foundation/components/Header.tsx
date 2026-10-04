"use client";

import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useLanguage } from "./LanguageProvider";
import { site } from "../lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [initiativesOpen, setInitiativesOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const nav = lang === "en"
    ? [["Home", "/"], ["About Us", "/about"], ["Impact / Gallery", "/impact"], ["Legal & Transparency", "/legal"], ["Contact Us", "/contact"]]
    : [["होम", "/"], ["हमारे बारे में", "/about"], ["प्रभाव / गैलरी", "/impact"], ["कानूनी / पारदर्शिता", "/legal"], ["संपर्क", "/contact"]];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="border-b border-orange-100 bg-orange-50/80">
        <div className="container-page flex min-h-8 items-center justify-end gap-4 text-[11px] font-semibold text-slate-600">
          <span className="hidden sm:inline"><Phone size={12} className="mr-1 inline text-orange-600" />{site.phones[0]}</span>
          <span className="hidden md:inline">{site.email}</span>
          <button onClick={() => setLang(lang === "en" ? "hi" : "en")} className="rounded-full bg-white px-2.5 py-1 text-orange-700 shadow-sm">
            {lang === "en" ? "हिन्दी" : "English"}
          </button>
        </div>
      </div>
      <div className="container-page flex min-h-[76px] items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-5 lg:flex">
          {nav.slice(0,2).map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-slate-700 hover:text-orange-600">{label}</Link>)}
          <div className="relative" onMouseEnter={() => setInitiativesOpen(true)} onMouseLeave={() => setInitiativesOpen(false)}>
            <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-orange-600">{lang === "en" ? "Initiatives" : "पहल"}<ChevronDown size={15}/></button>
            {initiativesOpen && <div className="absolute left-0 top-full mt-3 w-72 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl">
              {initiatives.map(i => <Link key={i.slug} href={`/initiatives/${i.slug}`} className="block rounded-xl px-4 py-3 text-sm hover:bg-orange-50"><b>{i.titleHi}</b><span className="ml-2 text-slate-500">{i.titleEn}</span></Link>)}
            </div>}
          </div>
          {nav.slice(2).map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-slate-700 hover:text-orange-600">{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/volunteer" className="rounded-full border border-emerald-600 px-4 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-50">{lang === "en" ? "Join as Volunteer" : "स्वयंसेवक बनें"}</Link>
          <Link href="/donate" className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-600/20 hover:bg-orange-700">{lang === "en" ? "Donate Now" : "दान करें"}</Link>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Open navigation">{open ? <X/> : <Menu/>}</button>
      </div>
      {open && <div className="border-t border-slate-100 bg-white lg:hidden">
        <div className="container-page grid gap-1 py-4">
          {[...nav.slice(0,2), [lang === "en" ? "Initiatives" : "पहल", "/initiatives"], ...nav.slice(2)].map(([label, href]) => <Link key={href} onClick={() => setOpen(false)} href={href} className="rounded-xl px-3 py-3 font-semibold hover:bg-orange-50">{label}</Link>)}
          <div className="mt-2 grid grid-cols-2 gap-2"><Link href="/volunteer" className="rounded-xl border border-emerald-600 px-3 py-3 text-center font-bold text-emerald-700">Volunteer</Link><Link href="/donate" className="rounded-xl bg-orange-600 px-3 py-3 text-center font-bold text-white">Donate</Link></div>
        </div>
      </div>}
    </header>
  );
}
