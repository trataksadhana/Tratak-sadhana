import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { site, initiatives } from "../lib/site";

export function Footer() {
  return <footer className="mt-20 bg-slate-950 text-slate-300">
    <div className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
      <div><Logo/><p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">सेवा ही साधना है, मानवता ही हमारा धर्म है। We work toward a more educated, healthy, green and empowered society.</p><div className="mt-5 flex gap-3"><a aria-label="Facebook" href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Facebook size={16}/></a><a aria-label="Instagram" href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Instagram size={16}/></a><a aria-label="YouTube" href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Youtube size={16}/></a></div></div>
      <div><h3 className="mb-4 font-bold text-white">Quick Links</h3><div className="grid gap-2 text-sm"><Link href="/about">About Us</Link><Link href="/impact">Impact / Gallery</Link><Link href="/legal">Legal & Transparency</Link><Link href="/volunteer">Volunteer</Link><Link href="/donate">Donate</Link></div></div>
      <div><h3 className="mb-4 font-bold text-white">Our Initiatives</h3><div className="grid gap-2 text-sm">{initiatives.map(i => <Link key={i.slug} href={`/initiatives/${i.slug}`}>{i.titleHi}</Link>)}</div></div>
      <div><h3 className="mb-4 font-bold text-white">Contact Us</h3><div className="grid gap-4 text-sm"><div className="flex gap-2"><MapPin size={17} className="mt-0.5 shrink-0 text-orange-400"/><span>Registered: {site.registeredOffice}<br/><br/>Operational: {site.operationalOffice}</span></div><div className="flex gap-2"><Phone size={17} className="text-orange-400"/><span>{site.phones.join(" · ")}</span></div><div className="flex gap-2"><Mail size={17} className="text-orange-400"/><span>{site.email}</span></div></div></div>
    </div>
    <div className="border-t border-white/10"><div className="container-page flex flex-col gap-2 py-5 text-xs text-slate-500 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} Sadhna Foundation. All rights reserved.</span><span>Reg. No. {site.registration} · Registered {site.registrationDate}</span></div></div>
  </footer>;
}
