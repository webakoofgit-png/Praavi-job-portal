"use client";
import Link from "next/link";
import { ExternalLink, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import type { DemoJob } from "@/lib/data";

export function ApplicationActions({ job, showNote = true }: { job: DemoJob; showNote?: boolean }) {
  const [notice, setNotice] = useState("");
  const track = (method:string) => setNotice(`${method} contact would be recorded as a contact click—not a submitted application. Contact details are hidden in this demo.`);
  return <div><div className="grid gap-2">{job.applyPortal && <Link href={`/login?next=/jobs/${job.slug}/apply`} className="btn-primary rounded-full">Apply through portal <ExternalLink size={16} /></Link>}{job.phone && <button onClick={()=>track("Phone")} className="btn-secondary rounded-full"><Phone size={17} />Call employer</button>}{job.whatsapp && <button onClick={()=>track("WhatsApp")} className="btn-secondary rounded-full border-leaf-600 text-leaf-700"><MessageCircle size={17} />WhatsApp employer</button>}</div>{notice && <p role="status" className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">{notice}</p>}{showNote && <p className="mt-4 text-xs leading-5 text-slate-500">Only a completed portal form counts as an application. Contact clicks do not confirm that a conversation took place.</p>}</div>;
}
