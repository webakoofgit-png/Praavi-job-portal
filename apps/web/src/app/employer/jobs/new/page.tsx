"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useState } from "react";
import { FieldErrors, Path, useForm, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { categories, localities } from "@/lib/data";

const jobSchema = z.object({
  title: z.string().trim().min(3, "Job title must contain at least 3 characters.").max(100),
  category: z.string().min(1, "Select a job category."),
  openings: z.coerce.number().int().min(1, "At least one opening is required.").max(100, "Openings cannot exceed 100."),
  description: z.string().trim().min(40, "Provide at least 40 characters describing the role.").max(5000),
  branch: z.string().min(1, "Select a business branch."),
  locality: z.string().refine(value => localities.includes(value), "Select a supported locality."),
  address: z.string().trim().min(5, "Enter the work address.").max(300),
  employmentType: z.enum(["Full time", "Part time", "Contract", "Internship"]),
  shift: z.enum(["Day", "Evening", "Night", "Rotational"]),
  workingHours: z.string().trim().min(3, "Enter working hours.").max(100),
  weeklyOff: z.string().trim().max(50),
  salaryMin: z.coerce.number().int().min(0, "Salary cannot be negative.").max(10000000),
  salaryMax: z.coerce.number().int().positive("Enter a maximum salary.").max(10000000),
  experience: z.enum(["Fresher", "0–2 years", "2–5 years", "5+ years"]),
  education: z.string().trim().min(2, "Enter the minimum education requirement.").max(150),
  skills: z.string().trim().min(2, "Add at least one required skill.").max(500),
  requirements: z.string().trim().max(2000),
  portal: z.boolean(), phone: z.boolean(), whatsapp: z.boolean(),
  contactPerson: z.string().trim().max(100),
  contactNumber: z.string().trim(),
  authorized: z.boolean(),
  resumeRequired: z.boolean(),
}).superRefine((value, context) => {
  if (value.salaryMax < value.salaryMin) context.addIssue({ code: z.ZodIssueCode.custom, path: ["salaryMax"], message: "Maximum salary must be equal to or above minimum salary." });
  if (!value.portal && !value.phone && !value.whatsapp) context.addIssue({ code: z.ZodIssueCode.custom, path: ["portal"], message: "Enable at least one application method." });
  if (value.phone || value.whatsapp) {
    if (value.contactPerson.length < 2) context.addIssue({ code: z.ZodIssueCode.custom, path: ["contactPerson"], message: "Enter the contact person's name." });
    if (!/^[6-9]\d{9}$/.test(value.contactNumber)) context.addIssue({ code: z.ZodIssueCode.custom, path: ["contactNumber"], message: "Enter a valid 10-digit Indian mobile number." });
    if (!value.authorized) context.addIssue({ code: z.ZodIssueCode.custom, path: ["authorized"], message: "Contact disclosure authorization is required." });
  }
});

type JobValues = z.infer<typeof jobSchema>;
const steps = ["Job information", "Location & schedule", "Salary & requirements", "Application methods", "Preview & submit"];
const stepFields: Path<JobValues>[][] = [
  ["title", "category", "openings", "description"],
  ["branch", "locality", "address", "employmentType", "shift", "workingHours", "weeklyOff"],
  ["salaryMin", "salaryMax", "experience", "education", "skills", "requirements"],
  ["portal", "phone", "whatsapp", "contactPerson", "contactNumber", "authorized", "resumeRequired"],
  [],
];

export default function NewJob() {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");
  const form = useForm<JobValues>({
    resolver: zodResolver(jobSchema), mode: "onBlur", shouldUnregister: false,
    defaultValues: { title: "", category: "", openings: 1, description: "", branch: "main", locality: "", address: "", employmentType: "Full time", shift: "Day", workingHours: "", weeklyOff: "", salaryMin: 0, salaryMax: 0, experience: "Fresher", education: "", skills: "", requirements: "", portal: true, phone: false, whatsapp: true, contactPerson: "", contactNumber: "", authorized: false, resumeRequired: false },
  });
  const { register, trigger, handleSubmit, watch, formState: { errors, isSubmitting } } = form;
  const values = watch();

  async function next() {
    setMessage("");
    if (await trigger(stepFields[step], { shouldFocus: true })) setStep(current => Math.min(4, current + 1));
  }
  async function saveDraft() {
    if (await trigger(stepFields[step], { shouldFocus: true })) setMessage("Current step is valid. Sign in and connect the API to persist this draft.");
  }

  return <main className="min-h-screen bg-canvas"><div className="container-shell max-w-5xl py-10">
    <p className="eyebrow">Employer portal</p><h1 className="mt-2 text-3xl font-extrabold tracking-[-.03em]">Post a new job</h1>
    <div className="mt-7 hidden grid-cols-5 gap-2 md:grid">{steps.map((label, index) => <div key={label} className={`border-t-4 pt-3 text-xs font-bold ${index <= step ? "border-brand-600 text-brand-700" : "border-slate-200 text-slate-400"}`}><span className="mr-1">{index + 1}.</span>{label}</div>)}</div>
    <div className="mt-5 rounded-xl bg-brand-50 p-4 text-sm font-bold text-brand-800 md:hidden">Step {step + 1} of 5: {steps[step]}</div>
    <form noValidate onSubmit={handleSubmit(() => setMessage("All job details are valid. Sign in and connect the API to submit this vacancy for moderation."))} className="panel mt-6 p-6 sm:p-9">
      <Step step={step} register={register} errors={errors} values={values}/>
      {message && <p role="status" className="mt-5 rounded-xl bg-amber-50 p-3 text-sm font-bold text-amber-900">{message}</p>}
      <div className="mt-9 flex flex-col-reverse justify-between gap-3 border-t pt-6 sm:flex-row">
        <button type="button" onClick={() => { setMessage(""); setStep(Math.max(0, step - 1)); }} disabled={!step} className="btn-secondary disabled:opacity-40"><ChevronLeft size={17}/>Previous</button>
        <div className="flex gap-2"><button type="button" onClick={saveDraft} className="btn-secondary"><Save size={16}/>Save draft</button>{step < 4 ? <button type="button" onClick={next} className="btn-primary">Next<ChevronRight size={17}/></button> : <button disabled={isSubmitting} type="submit" className="btn-primary disabled:opacity-60"><Check size={17}/>{isSubmitting ? "Validating…" : "Submit for approval"}</button>}</div>
      </div>
    </form>
  </div></main>;
}

function Step({ step, register, errors, values }: { step: number; register: UseFormRegister<JobValues>; errors: FieldErrors<JobValues>; values: JobValues }) {
  if (step === 0) return <div><Title title="Tell candidates about the role" text="Use a clear title and plain language."/><Grid><Field label="Job title" error={errors.title?.message}><input {...register("title")} className="field" placeholder="e.g. Pharmacy Assistant"/></Field><Field label="Job category" error={errors.category?.message}><select {...register("category")} className="field"><option value="">Select category</option>{categories.map(category => <option value={category.slug} key={category.slug}>{category.name}</option>)}</select></Field><Field label="Number of openings" error={errors.openings?.message}><input {...register("openings", { valueAsNumber: true })} type="number" min="1" max="100" className="field"/></Field><Field wide label="Job description" error={errors.description?.message}><textarea {...register("description")} className="field h-36 py-3" placeholder="Describe daily work, responsibilities, and the work environment."/></Field></Grid></div>;
  if (step === 1) return <div><Title title="Where and when is the work?" text="Candidates use this to judge commute and availability."/><Grid><Field label="Business branch" error={errors.branch?.message}><select {...register("branch")} className="field"><option value="main">Main branch</option><option value="new">Add a new branch</option></select></Field><Field label="Locality" error={errors.locality?.message}><select {...register("locality")} className="field"><option value="">Select locality</option>{localities.map(location => <option key={location}>{location}</option>)}</select></Field><Field wide label="Work address" error={errors.address?.message}><input {...register("address")} className="field" placeholder="Building, road, landmark"/></Field><Field label="Employment type" error={errors.employmentType?.message}><select {...register("employmentType")} className="field"><option>Full time</option><option>Part time</option><option>Contract</option><option>Internship</option></select></Field><Field label="Shift" error={errors.shift?.message}><select {...register("shift")} className="field"><option>Day</option><option>Evening</option><option>Night</option><option>Rotational</option></select></Field><Field label="Working hours" error={errors.workingHours?.message}><input {...register("workingHours")} className="field" placeholder="e.g. 10 AM–7 PM"/></Field><Field label="Weekly off" error={errors.weeklyOff?.message}><input {...register("weeklyOff")} className="field" placeholder="e.g. Monday"/></Field></Grid></div>;
  if (step === 2) return <div><Title title="Salary and requirements" text="Clear ranges help candidates decide with confidence."/><Grid><Field label="Minimum monthly salary" error={errors.salaryMin?.message}><input {...register("salaryMin", { valueAsNumber: true })} type="number" min="0" className="field" placeholder="₹"/></Field><Field label="Maximum monthly salary" error={errors.salaryMax?.message}><input {...register("salaryMax", { valueAsNumber: true })} type="number" min="1" className="field" placeholder="₹"/></Field><Field label="Experience" error={errors.experience?.message}><select {...register("experience")} className="field"><option>Fresher</option><option>0–2 years</option><option>2–5 years</option><option>5+ years</option></select></Field><Field label="Education" error={errors.education?.message}><input {...register("education")} className="field" placeholder="e.g. 12th pass"/></Field><Field wide label="Required skills" error={errors.skills?.message}><input {...register("skills")} className="field" placeholder="Add skills separated by commas"/></Field><Field wide label="Additional requirements" error={errors.requirements?.message}><textarea {...register("requirements")} className="field h-28 py-3"/></Field></Grid></div>;
  if (step === 3) return <div><Title title="How can candidates apply?" text="Enable one or more methods. Contact clicks remain separate from applications."/><div className="grid gap-3 sm:grid-cols-3">{[["portal", "Portal application", "Track candidates and status"], ["phone", "Phone contact", "Candidates can call"], ["whatsapp", "WhatsApp contact", "Candidates can message"]].map(([key, label, text]) => <label key={key} className={`cursor-pointer rounded-xl border p-5 ${values[key as "portal"] ? "border-brand-600 bg-brand-50" : ""}`}><input {...register(key as "portal" | "phone" | "whatsapp")} type="checkbox" className="size-4"/><b className="mt-4 block">{label}</b><span className="mt-1 block text-xs text-slate-500">{text}</span></label>)}</div>{errors.portal?.message && <ErrorText message={errors.portal.message}/>}<div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="Contact person" error={errors.contactPerson?.message}><input {...register("contactPerson")} className="field"/></Field><Field label="Approved contact number" error={errors.contactNumber?.message}><input {...register("contactNumber")} className="field" inputMode="numeric" maxLength={10}/></Field></div><label className="mt-5 flex gap-3 text-sm"><input {...register("authorized")} type="checkbox" className="mt-1 size-4"/>I am authorized to disclose this business contact information.</label>{errors.authorized?.message && <ErrorText message={errors.authorized.message}/>}<label className="mt-4 flex gap-3 text-sm"><input {...register("resumeRequired")} type="checkbox" className="mt-1 size-4"/>Require a resume for portal applications.</label></div>;
  return <div><Title title="Review before submitting" text="Review all details. Final submission validates every step again."/><div className="rounded-xl border bg-canvas p-6"><p className="text-xs font-bold uppercase tracking-wider text-brand-700">Job preview</p><h2 className="mt-3 text-2xl font-extrabold">{values.title || "Your job title"}</h2><p className="mt-2 text-sm text-slate-500">{values.locality || "Selected locality"} · {values.employmentType}</p><div className="mt-6 grid gap-3 text-sm sm:grid-cols-3"><span className="rounded-lg bg-white p-3">₹{values.salaryMin || 0}–₹{values.salaryMax || 0}</span><span className="rounded-lg bg-white p-3">{values.experience}</span><span className="rounded-lg bg-white p-3">{values.openings} opening{values.openings === 1 ? "" : "s"}</span></div></div></div>;
}

function Title({ title, text }: { title: string; text: string }) { return <div className="mb-7"><h2 className="text-2xl font-extrabold">{title}</h2><p className="mt-2 text-sm text-slate-500">{text}</p></div>; }
function Grid({ children }: { children: React.ReactNode }) { return <div className="grid gap-5 sm:grid-cols-2">{children}</div>; }
function Field({ label, children, error, wide = false }: { label: string; children: React.ReactNode; error?: string; wide?: boolean }) { return <label className={`block text-sm font-bold ${wide ? "sm:col-span-2" : ""}`}>{label}<span className="mt-2 block">{children}</span>{error && <ErrorText message={error}/>}</label>; }
function ErrorText({ message }: { message: string }) { return <span role="alert" className="mt-1.5 block text-xs font-semibold text-red-600">{message}</span>; }
