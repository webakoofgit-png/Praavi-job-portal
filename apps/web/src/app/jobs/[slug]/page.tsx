import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BadgeCheck, Bookmark, BriefcaseBusiness, CalendarDays, CheckCircle2,
  Clock3, GraduationCap, IndianRupee, MapPin, ShieldAlert, Sparkles,
  UsersRound
} from "lucide-react";
import { demoJobs, type DemoJob } from "@/lib/data";
import { ApplicationActions } from "@/components/application-actions";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = demoJobs.find(item => item.slug === slug);
  return {
    title: job?.title || "Job not found",
    description: job ? `${job.title} in ${job.locality}. ${job.salary}.` : undefined,
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return demoJobs.map(job => ({ slug: job.slug }));
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = demoJobs.find(item => item.slug === slug);
  if (!job) notFound();
  const related = demoJobs.filter(item => item.slug !== job.slug);

  return <main className="min-h-screen bg-[#f5f6f8] pb-28 text-[#25324b] lg:pb-0">
    <div className="container-shell max-w-[1120px] py-7">
      <div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-slate-500">
        <Link href="/">Home</Link><span>/</span><Link href="/jobs">Jobs</Link><span>/</span><span className="truncate">{job.title}</span>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="min-w-0 space-y-4">
          <section className="overflow-hidden rounded-[14px] border bg-white shadow-[0_2px_10px_rgba(24,39,75,.04)]">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-5">
                <div className="min-w-0">
                  <span className="inline-flex rounded bg-amber-50 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-amber-800">Demonstration listing</span>
                  <h1 className="mt-3 text-[21px] font-extrabold leading-tight tracking-[-.025em] text-[#17213a] sm:text-2xl">{job.title}</h1>
                  <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-600">
                    {job.company}
                    {job.verified && <><CheckCircle2 size={14} className="text-brand-600" /><span className="text-[10px] text-slate-400">Demo verified</span></>}
                  </p>
                </div>
                <div className="grid size-14 shrink-0 place-items-center rounded-xl border bg-white text-brand-600 shadow-sm"><BriefcaseBusiness size={25} /></div>
              </div>

              <div className="mt-5 grid gap-2.5 text-xs text-slate-600 sm:grid-cols-2">
                <Meta icon={BriefcaseBusiness}>{job.experience}</Meta>
                <Meta icon={IndianRupee}>{job.salary}</Meta>
                <Meta icon={MapPin}>{job.locality}, Pune</Meta>
                <Meta icon={Clock3}>{job.type} · {job.shift}</Meta>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-slate-500"><span>Posted: <b className="text-slate-700">{job.age.replace("Posted ", "")}</b></span><span>Openings: <b className="text-slate-700">{job.openings}</b></span><span>Applicants: <b className="text-slate-700">Demo only</b></span></div>
              <div className="hidden min-w-[220px] lg:block"><ApplicationActions job={{ ...job, phone: false, whatsapp: false }} showNote={false} /></div>
            </div>
          </section>

          <section className="rounded-[14px] border bg-white p-5 shadow-[0_2px_10px_rgba(24,39,75,.04)] sm:p-6">
            <h2 className="text-base font-extrabold text-[#17213a]">Job description</h2>
            <div className="mt-5 space-y-5 text-[13px] leading-6 text-slate-700">
              <div>
                <p className="font-bold">About the role</p>
                <p className="mt-1">This demonstration vacancy shows how a local employer can explain daily work, workplace expectations, schedule, and candidate requirements in a clear format. Real vacancies are published only after moderation.</p>
              </div>
              <div>
                <p className="font-bold">Key responsibilities</p>
                <ul className="mt-1 list-disc space-y-1 pl-5"><li>Support day-to-day operations and assist customers or team members.</li><li>Follow attendance, safety, and quality procedures.</li><li>Maintain accurate records relevant to the role.</li><li>Communicate clearly with the business and local customers.</li></ul>
              </div>
              <div className="grid gap-4 border-y py-5 sm:grid-cols-2">
                <Detail label="Role" value={job.title} /><Detail label="Industry type" value={job.category} />
                <Detail label="Employment type" value={job.type} /><Detail label="Number of openings" value={String(job.openings)} />
                <Detail label="Shift" value={job.shift} /><Detail label="Work location" value={`${job.locality}, Pune`} />
              </div>
              <div><p className="font-bold">Education</p><p className="mt-1">{job.education}</p></div>
              <div><p className="font-bold">Key skills</p><p className="mt-1 text-xs text-slate-500">Skills marked below are preferred for this role</p><div className="mt-3 flex flex-wrap gap-2">{job.skills.map(skill => <span key={skill} className="rounded-full border bg-white px-3 py-1 text-[11px] font-semibold text-slate-600">{skill}</span>)}</div></div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t pt-4"><button className="flex items-center gap-2 text-xs font-bold text-slate-500"><Bookmark size={15} />Save job</button><button className="flex items-center gap-2 text-xs font-bold text-slate-500"><ShieldAlert size={15} />Report job</button></div>
          </section>

          <section className="rounded-[14px] border bg-white p-5 shadow-[0_2px_10px_rgba(24,39,75,.04)] sm:p-6">
            <h2 className="text-base font-extrabold text-[#17213a]">About company</h2>
            <div className="mt-4 flex gap-4"><div className="grid size-11 shrink-0 place-items-center rounded-lg border text-brand-600"><BriefcaseBusiness size={20} /></div><div><p className="text-sm font-bold">{job.company}</p><p className="mt-1 text-xs leading-5 text-slate-500">Fictional business used only for development preview. Public contact details are not exposed.</p></div></div>
            <p className="mt-4 text-xs text-slate-600"><b>Location:</b> {job.locality}, Pune, Maharashtra</p>
          </section>

          <section className="rounded-[14px] border bg-white p-5 shadow-[0_2px_10px_rgba(24,39,75,.04)] sm:p-6">
            <div className="flex gap-3"><ShieldAlert className="shrink-0 text-amber-600" size={21} /><div><h2 className="text-sm font-extrabold text-[#17213a]">Beware of job scams</h2><p className="mt-2 text-xs leading-5 text-slate-600">Never pay money to secure a job or interview. Do not share passwords, banking PINs, or OTPs. Use the report action if an employer requests fees or suspicious personal information.</p><Link href="/safety" className="mt-2 inline-block text-xs font-bold text-brand-700">Read job safety guidance →</Link></div></div>
          </section>

          <section className="pt-3">
            <h2 className="mb-4 text-base font-extrabold text-[#17213a]">Similar jobs</h2>
            <div className="space-y-3">{related.map(item => <SimilarJob job={item} key={item.slug} />)}</div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-[88px]">
          <section className="rounded-[14px] border bg-white p-5 shadow-[0_2px_10px_rgba(24,39,75,.04)]">
            <h2 className="text-sm font-extrabold text-[#17213a]">Jobs you might be interested in</h2>
            <div className="mt-3 divide-y">{related.map(item => <CompactJob job={item} key={item.slug} />)}</div>
            <Link href="/jobs" className="mt-3 inline-flex text-xs font-bold text-brand-700">View all jobs →</Link>
          </section>

          <section className="rounded-[14px] border bg-white p-5 shadow-[0_2px_10px_rgba(24,39,75,.04)]">
            <div className="flex items-center gap-2"><Sparkles size={17} className="text-brand-600" /><h2 className="text-sm font-extrabold text-[#17213a]">Role highlights</h2></div>
            <div className="mt-4 space-y-3"><SideFact icon={IndianRupee} label="Salary" value={job.salary} /><SideFact icon={GraduationCap} label="Education" value={job.education} /><SideFact icon={UsersRound} label="Openings" value={String(job.openings)} /><SideFact icon={CalendarDays} label="Shift" value={job.shift} /></div>
          </section>

          <section className="rounded-[14px] border bg-white p-5 shadow-[0_2px_10px_rgba(24,39,75,.04)]">
            <div className="flex items-center gap-2"><BadgeCheck size={18} className="text-leaf-600" /><h2 className="text-sm font-extrabold text-[#17213a]">Application methods</h2></div>
            <p className="mt-3 text-xs leading-5 text-slate-500">The employer chooses which methods are available. Contact clicks are tracked separately and never count as applications.</p>
            <div className="mt-4"><ApplicationActions job={job} /></div>
          </section>
        </aside>
      </div>
    </div>

    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white p-3 shadow-[0_-5px_20px_rgba(20,32,51,.08)] lg:hidden"><ApplicationActions job={{ ...job, phone: false, whatsapp: false }} showNote={false} /></div>
  </main>;
}

function Meta({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return <span className="flex items-center gap-2"><Icon size={15} className="shrink-0 text-slate-400" />{children}</span>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <p><span className="font-bold text-slate-800">{label}: </span>{value}</p>;
}

function CompactJob({ job }: { job: DemoJob }) {
  return <Link href={`/jobs/${job.slug}`} className="group block py-4 first:pt-2">
    <div className="flex gap-3"><div className="min-w-0 flex-1"><h3 className="truncate text-xs font-extrabold text-[#17213a] group-hover:text-brand-700">{job.title}</h3><p className="mt-1 truncate text-[10px] text-slate-500">{job.company}</p><p className="mt-2 flex items-center gap-1 text-[10px] text-slate-500"><MapPin size={11} />{job.locality}</p></div><div className="grid size-9 shrink-0 place-items-center rounded-lg border text-brand-600"><BriefcaseBusiness size={16} /></div></div>
  </Link>;
}

function SimilarJob({ job }: { job: DemoJob }) {
  return <Link href={`/jobs/${job.slug}`} className="group block rounded-[14px] border bg-white p-5 shadow-[0_2px_10px_rgba(24,39,75,.04)] hover:border-brand-300">
    <div className="flex items-start justify-between gap-4"><div className="min-w-0"><h3 className="text-sm font-extrabold text-[#17213a] group-hover:text-brand-700">{job.title}</h3><p className="mt-1 truncate text-xs text-slate-500">{job.company}</p><div className="mt-3 flex flex-wrap gap-3 text-[10px] text-slate-500"><span className="flex items-center gap-1"><MapPin size={11} />{job.locality}</span><span>{job.experience}</span><span>{job.salary}</span></div><div className="mt-3 flex flex-wrap gap-1.5">{job.skills.slice(0, 3).map(skill => <span className="text-[10px] text-slate-400" key={skill}>{skill}</span>)}</div></div><div className="grid size-10 shrink-0 place-items-center rounded-lg border text-brand-600"><BriefcaseBusiness size={17} /></div></div>
  </Link>;
}

function SideFact({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return <div className="flex gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-50 text-slate-500"><Icon size={15} /></span><div><p className="text-[10px] text-slate-400">{label}</p><p className="mt-0.5 text-xs font-bold text-slate-700">{value}</p></div></div>;
}
