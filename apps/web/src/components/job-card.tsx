"use client";
import Link from "next/link";
import { Bookmark, Briefcase, CheckCircle2, Clock3, IndianRupee, MapPin } from "lucide-react";
import { useState } from "react";
import type { DemoJob } from "@/lib/data";

export function JobCard({ job }: { job: DemoJob }) {
  const [saved, setSaved] = useState(false);
  return <article className="group relative border-b py-6 first:pt-0 last:border-0 last:pb-0">
    <div className="flex items-start justify-between gap-4">
      <div><span className="mb-2 inline-flex rounded-md bg-amber-50 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-800">Demo listing</span><h3 className="text-xl font-extrabold tracking-[-.02em] group-hover:text-brand-700"><Link href={`/jobs/${job.slug}`}>{job.title}</Link></h3><p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-600">{job.company} {job.verified && <CheckCircle2 size={15} className="text-leaf-600" aria-label="Demo verified business" />}</p></div>
      <button onClick={() => setSaved(!saved)} className={`grid size-10 shrink-0 place-items-center rounded-xl border ${saved ? "border-brand-600 bg-brand-50 text-brand-700" : "text-slate-500"}`} aria-label={saved ? "Remove saved job" : "Save job"}><Bookmark size={18} fill={saved ? "currentColor" : "none"} /></button>
    </div>
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
      <span className="flex items-center gap-1.5"><MapPin size={16} />{job.locality}</span><span className="flex items-center gap-1.5"><IndianRupee size={16} />{job.salary.replace("₹", "")}</span><span className="flex items-center gap-1.5"><Briefcase size={16} />{job.type}</span><span className="flex items-center gap-1.5"><Clock3 size={16} />{job.age}</span>
    </div>
    <div className="mt-5 flex items-center justify-between"><span className="text-xs font-bold text-slate-500">{job.experience} experience</span><Link href={`/jobs/${job.slug}`} className="text-sm font-extrabold text-brand-700">View details →</Link></div>
  </article>;
}
