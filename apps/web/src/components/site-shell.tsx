"use client";

import Link from "next/link";
import { useState } from "react";
import { BriefcaseBusiness, Menu, Phone, Search, X } from "lucide-react";

const nav = [
  ["Find jobs", "/jobs"], ["Categories", "/categories"], ["Locations", "/locations"],
  ["Companies", "/companies"], ["For employers", "/for-employers"]
];

export function Logo() {
  return <Link href="/" className="flex items-center gap-2.5" aria-label="Praavi Jobs home">
    <span className="grid size-9 place-items-center rounded-xl bg-brand-600 text-white"><BriefcaseBusiness size={19} strokeWidth={2.5} /></span>
    <span><b className="block text-[17px] leading-none tracking-[-.03em]">Praavi Jobs</b><small className="mt-1 block text-[10px] font-bold uppercase tracking-[.14em] text-slate-500">Pune local hiring</small></span>
  </Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="sticky top-0 z-50 border-b bg-white/95 shadow-[0_1px_8px_rgba(20,32,51,.05)] backdrop-blur">
      <div className="container-shell flex h-[68px] items-center justify-between gap-5">
        <Logo />
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {nav.slice(0, 4).map(([label, href]) => <Link key={href} href={href} className="text-[13px] font-semibold text-slate-600 transition hover:text-brand-700">{label}</Link>)}
        </nav>
        <Link href="/jobs" className="hidden h-10 min-w-[220px] items-center gap-2 rounded-full border bg-slate-50 px-4 text-xs font-medium text-slate-400 lg:flex"><Search size={16} />Search jobs here</Link>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className="inline-flex h-10 items-center rounded-full border border-brand-600 px-5 text-xs font-extrabold text-brand-700">Login</Link>
          <Link href="/register" className="inline-flex h-10 items-center rounded-full bg-[#ef6b27] px-5 text-xs font-extrabold text-white hover:bg-[#dc5d1e]">Register</Link>
          <Link href="/for-employers" className="hidden px-3 py-2 text-xs font-bold text-slate-600 lg:block">For employers</Link>
        </div>
        <button className="grid size-10 place-items-center rounded-xl border md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="container-shell border-t py-4 md:hidden" aria-label="Mobile">
        {nav.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="block border-b py-3 text-sm font-bold">{label}</Link>)}
        <div className="mt-4 grid grid-cols-2 gap-2"><Link href="/login" className="btn-secondary">Log in</Link><Link href="/employer/jobs/new" className="btn-primary">Post a job</Link></div>
      </nav>}
    </header>
  </>;
}

export function Footer() {
  return <footer className="border-t bg-[#0f1d2f] text-slate-300">
    <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div><Logo /><p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">A straightforward local hiring platform for Pune's job seekers and small businesses.</p><p className="mt-4 flex items-center gap-2 text-sm"><Phone size={16} /> Platform contact will be published before launch.</p></div>
      <FooterGroup title="Find work" items={[["Search jobs", "/jobs"], ["Job categories", "/categories"], ["Jobs by location", "/locations"], ["Companies", "/companies"]]} />
      <FooterGroup title="Get help" items={[["How it works", "/how-it-works"], ["Help & FAQ", "/help"], ["Job safety", "/safety"], ["Contact", "/contact"]]} />
      <FooterGroup title="Platform" items={[["About us", "/about"], ["Privacy", "/privacy"], ["Terms", "/terms"], ["Acceptable use", "/acceptable-use"]]} />
    </div>
    <div className="border-t border-white/10"><div className="container-shell flex flex-col justify-between gap-2 py-5 text-xs sm:flex-row"><span>© 2026 Praavi Jobs. Pune, Maharashtra.</span><span>Legal text is draft pending professional review.</span></div></div>
  </footer>;
}

function FooterGroup({ title, items }: { title: string; items: string[][] }) {
  return <div><h3 className="mb-3 font-bold text-white">{title}</h3>{items.map(([label, href]) => <Link key={href} href={href} className="block py-1.5 text-sm text-slate-400 hover:text-white">{label}</Link>)}</div>;
}
