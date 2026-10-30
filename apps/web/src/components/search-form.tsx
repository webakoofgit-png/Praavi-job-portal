"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { localities } from "@/lib/data";

const searchSchema = z.object({
  q: z.string().trim().max(80, "Search text cannot exceed 80 characters."),
  location: z.string().refine(value => !value || localities.includes(value), "Select a supported location."),
});
type SearchValues = z.infer<typeof searchSchema>;

export function SearchForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SearchValues>({ resolver: zodResolver(searchSchema), defaultValues: { q: "", location: "" } });
  const submit = handleSubmit(values => { const params = new URLSearchParams(); if (values.q) params.set("q", values.q); if (values.location) params.set("location", values.location); router.push(`/jobs${params.size ? `?${params}` : ""}`); });

  return <form noValidate onSubmit={submit} className={`grid gap-2 rounded-2xl border bg-white p-2 shadow-soft ${compact ? "md:grid-cols-[1fr_220px_auto]" : "md:grid-cols-[1fr_250px_auto]"}`}>
    <label className="relative flex items-center gap-3 px-3"><Search className="text-slate-400" size={20}/><span className="sr-only">Job title or keyword</span><input {...register("q")} aria-invalid={!!errors.q} className="h-12 min-w-0 flex-1 text-sm outline-none" placeholder="Job title, skill, or business"/>{errors.q && <span role="alert" className="absolute left-3 top-[52px] z-10 rounded bg-red-600 px-2 py-1 text-[10px] font-bold text-white">{errors.q.message}</span>}</label>
    <label className="relative flex items-center gap-3 border-t px-3 md:border-l md:border-t-0"><MapPin className="text-slate-400" size={20}/><span className="sr-only">Location</span><select {...register("location")} aria-invalid={!!errors.location} className="h-12 min-w-0 flex-1 bg-white text-sm outline-none"><option value="">All Pune locations</option>{localities.map(location => <option key={location}>{location}</option>)}</select>{errors.location && <span role="alert" className="absolute left-3 top-[52px] z-10 rounded bg-red-600 px-2 py-1 text-[10px] font-bold text-white">{errors.location.message}</span>}</label>
    <button className="btn-primary min-h-12 px-7"><Search size={18}/>Search jobs</button>
  </form>;
}
