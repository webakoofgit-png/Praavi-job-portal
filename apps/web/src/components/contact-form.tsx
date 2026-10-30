"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters.").max(100, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  topic: z.enum(["general", "safety", "employer-support", "report"]),
  message: z.string().trim().min(20, "Please provide at least 20 characters.").max(3000, "Message cannot exceed 3,000 characters."),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema), mode: "onBlur",
    defaultValues: { name: "", email: "", topic: "general", message: "" },
  });

  if (sent) return <div className="panel p-8 text-center"><CheckCircle2 className="mx-auto text-leaf-600" size={36}/><h2 className="mt-4 font-extrabold">Message validated locally</h2><p className="mt-2 text-sm text-slate-600">Email delivery is not configured in this development environment, so no message was sent.</p><button type="button" className="mt-5 text-sm font-bold text-brand-700" onClick={() => { reset(); setSent(false); }}>Send another</button></div>;

  return <form noValidate onSubmit={handleSubmit(() => setSent(true))} className="panel space-y-4 p-6 sm:p-8">
    <Field label="Name" error={errors.name?.message}><input {...register("name")} autoComplete="name" aria-invalid={!!errors.name} className="field mt-2" /></Field>
    <Field label="Email" error={errors.email?.message}><input {...register("email")} type="email" autoComplete="email" aria-invalid={!!errors.email} className="field mt-2" /></Field>
    <Field label="Topic" error={errors.topic?.message}><select {...register("topic")} className="field mt-2"><option value="general">General question</option><option value="safety">Job safety</option><option value="employer-support">Employer support</option><option value="report">Report a problem</option></select></Field>
    <Field label="Message" error={errors.message?.message}><textarea {...register("message")} aria-invalid={!!errors.message} className="field mt-2 h-32 py-3" /></Field>
    <button disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">{isSubmitting ? "Validating…" : "Validate message"}</button>
  </form>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="block text-sm font-bold">{label}{children}{error && <span role="alert" className="mt-1.5 block text-xs font-semibold text-red-600">{error}</span>}</label>;
}
