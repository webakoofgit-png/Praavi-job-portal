"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const identifier = z.string().trim().min(1, "Enter your mobile number or email.").refine(value =>
  /^[6-9]\d{9}$/.test(value) || z.string().email().safeParse(value).success,
  "Enter a valid email or 10-digit Indian mobile number."
);
const loginSchema = z.object({ identifier, password: z.string().min(8, "Password must contain at least 8 characters.").max(128) });
type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), mode: "onBlur" });
  const submit = handleSubmit(() => setMessage("Details validated. Authentication is unavailable until DATABASE_URL and SESSION_SECRET are configured and the API is running."));

  return <main className="bg-canvas"><div className="container-shell grid min-h-[680px] items-center gap-12 py-14 lg:grid-cols-2">
    <div className="hidden lg:block"><p className="eyebrow">Welcome back</p><h1 className="mt-4 text-5xl font-extrabold tracking-[-.04em]">Your local job search, all in one place.</h1><p className="mt-6 max-w-lg leading-7 text-slate-600">Track applications, save nearby roles, and keep your profile ready for the next opportunity.</p><div className="mt-8 flex items-center gap-3 text-sm font-bold text-leaf-700"><ShieldCheck/>Secure, role-based account access</div></div>
    <form noValidate onSubmit={submit} className="panel mx-auto w-full max-w-md p-7 sm:p-9">
      <h2 className="text-2xl font-extrabold">Log in</h2><p className="mt-2 text-sm text-slate-500">Use your mobile number or email.</p>
      <label className="mt-7 block text-sm font-bold">Mobile number or email<input {...register("identifier")} autoComplete="username" aria-invalid={!!errors.identifier} className="field mt-2" placeholder="Enter your account ID"/>{errors.identifier && <span role="alert" className="mt-1.5 block text-xs text-red-600">{errors.identifier.message}</span>}</label>
      <label className="mt-4 block text-sm font-bold">Password<span className="relative mt-2 block"><input {...register("password")} autoComplete="current-password" aria-invalid={!!errors.password} type={show ? "text" : "password"} className="field pr-12"/><button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-slate-500" aria-label={show ? "Hide password" : "Show password"}>{show ? <EyeOff size={19}/> : <Eye size={19}/>}</button></span>{errors.password && <span role="alert" className="mt-1.5 block text-xs text-red-600">{errors.password.message}</span>}</label>
      <div className="mt-4 text-right"><Link href="/forgot-password" className="text-xs font-bold text-brand-700">Forgot password?</Link></div>
      <button disabled={isSubmitting} className="btn-primary mt-6 w-full disabled:opacity-60">{isSubmitting ? "Validating…" : "Log in securely"}</button>
      {message && <p role="status" className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">{message}</p>}
      <p className="mt-6 text-center text-sm text-slate-500">New here? <Link href="/register" className="font-bold text-brand-700">Create an account</Link></p>
    </form>
  </div></main>;
}
