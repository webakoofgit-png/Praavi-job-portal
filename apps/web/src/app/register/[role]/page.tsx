"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registrationSchema = z.object({
  businessName: z.string().trim().max(150, "Business name is too long.").optional(),
  fullName: z.string().trim().min(2, "Enter your full name.").max(100, "Name is too long.").regex(/^[\p{L}\p{M} .'-]+$/u, "Name contains unsupported characters."),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  mobile: z.union([z.literal(""), z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number.")]),
  acceptedTerms: z.boolean().refine(value => value, "You must agree before continuing."),
});
type RegistrationValues = z.infer<typeof registrationSchema>;

export default function RoleRegister() {
  const { role } = useParams<{ role: string }>();
  const employer = role === "employer";
  const [complete, setComplete] = useState(false);
  const schema = employer ? registrationSchema.refine(value => !!value.businessName?.trim() && value.businessName.trim().length >= 2, { path: ["businessName"], message: "Enter the business name." }) : registrationSchema;
  const form = useForm<RegistrationValues>({ resolver: zodResolver(schema), mode: "onBlur", defaultValues: { businessName: "", fullName: "", email: "", mobile: "", acceptedTerms: false } });

  if (complete) return <main className="bg-canvas"><div className="container-shell max-w-xl py-14"><div className="panel p-8 text-center sm:p-10"><CheckCircle2 className="mx-auto text-leaf-600" size={44}/><h1 className="mt-5 text-3xl font-extrabold">Registration details accepted</h1><p className="mt-3 text-sm leading-6 text-slate-600">Your information passed validation. Account persistence will start after the database is connected.</p><Link href="/login" className="btn-primary mt-7">Continue to login</Link></div></div></main>;

  return <main className="bg-canvas"><div className="container-shell max-w-xl py-14"><form noValidate onSubmit={form.handleSubmit(() => setComplete(true))} className="panel p-7 sm:p-9">
    <p className="eyebrow">{employer ? "Employer registration" : "Candidate registration"}</p>
    <h1 className="mt-3 text-3xl font-extrabold tracking-[-.03em]">{employer ? "Create your business account" : "Start your local job search"}</h1>
    <p className="mt-3 text-sm leading-6 text-slate-500">Your phone number is optional.</p>
    {employer && <FormField label="Business name" error={form.formState.errors.businessName?.message}><input {...form.register("businessName")} autoComplete="organization" className="field mt-2"/></FormField>}
    <FormField className={employer ? "mt-4" : "mt-7"} label="Full name" error={form.formState.errors.fullName?.message}><input {...form.register("fullName")} autoComplete="name" className="field mt-2"/></FormField>
    <FormField label="Email address" error={form.formState.errors.email?.message}><input {...form.register("email")} type="email" autoComplete="email" className="field mt-2" placeholder="you@example.com"/></FormField>
    <FormField label="Mobile number (optional)" error={form.formState.errors.mobile?.message}><input {...form.register("mobile")} autoComplete="tel" inputMode="numeric" maxLength={10} className="field mt-2" placeholder="10-digit Indian mobile number"/></FormField>
    <label className="mt-4 flex gap-3 text-xs leading-5 text-slate-600"><input {...form.register("acceptedTerms")} type="checkbox" className="mt-1 size-4"/><span>I agree to the <Link href="/terms" className="font-bold text-brand-700">Terms</Link> and <Link href="/privacy" className="font-bold text-brand-700">Privacy Policy</Link>.</span></label>
    {form.formState.errors.acceptedTerms && <p role="alert" className="mt-1.5 text-xs font-semibold text-red-600">{form.formState.errors.acceptedTerms.message}</p>}
    <button disabled={form.formState.isSubmitting} className="btn-primary mt-6 w-full disabled:opacity-60">{form.formState.isSubmitting ? "Validating…" : "Create account"}</button>
  </form></div></main>;
}

function FormField({ label, error, children, className = "mt-4" }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return <label className={`${className} block text-sm font-bold`}>{label}{children}{error && <span role="alert" className="mt-1.5 block text-xs font-semibold text-red-600">{error}</span>}</label>;
}
