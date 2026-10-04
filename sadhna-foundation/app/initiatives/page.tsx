import { initiatives } from "../../lib/site";
import { InitiativeCard } from "../../components/InitiativeCard";
import { SectionHeading } from "../../components/SectionHeading";
export default function Initiatives(){return <div className="container-page py-20"><SectionHeading eyebrow="Our work" title="Five pillars of community impact" hi="हमारे पाँच प्रमुख कार्य क्षेत्र"/><p className="mt-5 max-w-3xl leading-7 text-slate-600">Explore each programme area and the types of activities Sadhna Foundation can document, scale and strengthen with partners and volunteers.</p><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{initiatives.map((i,n)=><InitiativeCard key={i.slug} item={i} index={n}/>)}</div></div>}
