import { MessageCircle } from "lucide-react";
import { site } from "../lib/site";
export function WhatsApp() { return <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-900/30 transition hover:scale-105"><MessageCircle size={27}/></a>; }
