import { SlidersHorizontal } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import { JobCard } from "@/components/job-card";
import { categories, demoJobs, localities } from "@/lib/data";

export const metadata = { title: "Find local jobs" };

export default async function JobsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const p = await searchParams; const q = String(p.q || "").toLowerCase(); const location = String(p.location || ""); const category = String(p.category || "");
  const jobs = demoJobs.filter(j => (!q || `${j.title} ${j.company} ${j.skills.join(" ")}`.toLowerCase().includes(q)) && (!location || j.locality === location) && (!category || j.category.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-") === category));
  return <main className="bg-canvas min-h-screen"><div className="container-shell py-10"><div><p className="eyebrow">Pune local jobs</p><h1 className="mt-3 text-4xl font-extrabold tracking-[-.04em]">Find work near you</h1><p className="mt-3 text-sm text-slate-600">Search results currently use clearly labeled development seed data.</p></div><div className="mt-7"><SearchForm compact /></div>
    <div className="mt-8 grid items-start gap-7 lg:grid-cols-[270px_1fr]">
      <aside className="panel hidden p-5 lg:block"><div className="flex items-center gap-2 border-b pb-4 font-extrabold"><SlidersHorizontal size={18} />Filter jobs</div><Filter label="Location" options={localities} /><Filter label="Category" options={categories.map(x=>x.name)} /><Filter label="Employment type" options={["Full time", "Part time", "Contract", "Internship"]} /><Filter label="Experience" options={["Fresher", "0–2 years", "2–5 years", "5+ years"]} /><Filter label="Shift" options={["Day", "Evening", "Night", "Rotational"]} /></aside>
      <section className="panel p-5 sm:p-7"><div className="mb-6 flex items-center justify-between border-b pb-5"><div><h2 className="font-extrabold">{jobs.length} demonstration {jobs.length === 1 ? "job" : "jobs"}</h2><p className="mt-1 text-xs text-slate-500">Sorted by most recent</p></div><button className="btn-secondary px-4 lg:hidden"><SlidersHorizontal size={17} />Filters</button><select className="hidden rounded-xl border bg-white px-3 py-2 text-sm lg:block"><option>Most recent</option><option>Salary: high to low</option></select></div>{jobs.length ? jobs.map(job => <JobCard job={job} key={job.slug} />) : <div className="py-16 text-center"><h3 className="font-extrabold">No jobs match these filters</h3><p className="mt-2 text-sm text-slate-500">Try a nearby locality or a broader keyword.</p></div>}</section>
    </div></div></main>;
}

function Filter({ label, options }: { label:string; options:string[] }) { return <fieldset className="border-b py-5 last:border-0"><legend className="mb-3 text-sm font-extrabold">{label}</legend><div className="space-y-2.5">{options.slice(0,6).map(o => <label className="flex items-center gap-2.5 text-sm text-slate-600" key={o}><input type="checkbox" className="size-4 rounded border-slate-300" />{o}</label>)}</div></fieldset> }
