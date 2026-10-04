import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Sadhna Foundation home">
      <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-white shadow-lg"><img src="/icons/sadhna-logo.svg" alt="" className="h-12 w-12" /></span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold text-slate-800">Sadhna Foundation</span>
        <span className="block text-sm font-semibold text-orange-700">साधना फाउंडेशन</span>
        <span className="block text-[10px] font-medium tracking-wide text-slate-500">अंतः अस्ति प्रारंभः</span>
      </span>
    </Link>
  );
}
