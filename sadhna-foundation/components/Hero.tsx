"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function Hero() {
  const { lang } = useLanguage();
  return <section className="relative min-h-[640px] overflow-hidden bg-slate-900">
    <Image src="/images/education.webp" alt="Children learning with a community educator" fill priority className="object-cover" sizes="100vw" />
    <div className="hero-overlay absolute inset-0"/>
    <div className="container-page relative flex min-h-[640px] items-center py-20">
      <div className="max-w-3xl text-white">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur"><HeartHandshake size={17} className="text-orange-300"/> सेवा • समर्पण • संस्कार</div>
        <h1 className="text-balance font-display text-5xl font-bold leading-[1.03] md:text-7xl">{lang === "en" ? "Building a stronger society through service, dedication and values." : "सेवा, समर्पण और संस्कार से समृद्ध समाज का निर्माण"}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">{lang === "en" ? "Sadhna Foundation works with communities to expand opportunity through education, health, women’s empowerment, environmental action and youth development." : "शिक्षा, स्वास्थ्य, महिला सशक्तिकरण, पर्यावरण और युवा विकास के माध्यम से समुदायों के साथ मिलकर अवसरों का विस्तार।"}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/donate" className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3.5 font-bold shadow-xl shadow-orange-900/30 hover:bg-orange-500">{lang === "en" ? "Donate Now" : "दान करें"}<ArrowRight size={18}/></Link><Link href="/volunteer" className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3.5 font-bold backdrop-blur hover:bg-white/20">{lang === "en" ? "Join as Volunteer" : "स्वयंसेवक बनें"}<ArrowRight size={18}/></Link></div>
        <div className="mt-12 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4"><Stat value="10+" label={lang === "en" ? "Years of service" : "वर्षों की सेवा"}/><Stat value="—" label={lang === "en" ? "Trees planted*" : "वृक्षारोपण*"}/><Stat value="—" label={lang === "en" ? "Patients treated*" : "लाभार्थी*"}/><Stat value="—" label={lang === "en" ? "Children educated*" : "शिक्षा लाभार्थी*"}/></div>
        <p className="mt-3 text-xs text-white/60">*Verified programme totals can be added from your records.</p>
      </div>
    </div>
  </section>;
}
function Stat({value,label}:{value:string;label:string}) { return <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur"><div className="text-2xl font-extrabold">{value}</div><div className="text-xs text-white/70">{label}</div></div>; }
