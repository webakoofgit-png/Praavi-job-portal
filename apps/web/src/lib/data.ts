export const localities = ["Hadapsar", "Manjari", "Shewalewadi", "Fursungi", "Kadamwak Wasti", "Loni Kalbhor", "Uruli Kanchan", "Pune City"];

export const categories = [
  { name: "Retail & Sales", slug: "retail-sales", icon: "Store" },
  { name: "Healthcare", slug: "healthcare", icon: "HeartPulse" },
  { name: "Delivery & Logistics", slug: "delivery-logistics", icon: "Bike" },
  { name: "Office & Admin", slug: "office-admin", icon: "BriefcaseBusiness" },
  { name: "Hospitality", slug: "hospitality", icon: "Utensils" },
  { name: "Manufacturing", slug: "manufacturing", icon: "Factory" },
];

export type DemoJob = {
  slug: string; title: string; company: string; locality: string; salary: string;
  type: string; experience: string; age: string; category: string; verified: boolean;
  shift: string; education: string; openings: number; skills: string[];
  applyPortal: boolean; phone: boolean; whatsapp: boolean;
};

export const demoJobs: DemoJob[] = [
  { slug: "pharmacy-assistant-hadapsar-demo", title: "Pharmacy Assistant", company: "Demo: Neighbourhood Medical Store", locality: "Hadapsar", salary: "₹14,000–₹18,000 / month", type: "Full time", experience: "0–2 years", age: "Posted today", category: "Healthcare", verified: true, shift: "Day / evening rotation", education: "12th pass or D.Pharm", openings: 2, skills: ["Customer service", "Basic billing", "Medicine handling"], applyPortal: true, phone: true, whatsapp: true },
  { slug: "billing-executive-manjari-demo", title: "Billing Executive", company: "Demo: Manjari Supermarket", locality: "Manjari", salary: "₹15,000–₹20,000 / month", type: "Full time", experience: "1+ year", age: "Posted 2 days ago", category: "Retail & Sales", verified: false, shift: "10:00 AM–7:00 PM", education: "12th pass", openings: 1, skills: ["POS billing", "Cash handling", "Marathi"], applyPortal: true, phone: false, whatsapp: true },
  { slug: "machine-operator-loni-demo", title: "Machine Operator", company: "Demo: Eastern Pune Components", locality: "Loni Kalbhor", salary: "₹18,000–₹24,000 / month", type: "Full time", experience: "2+ years", age: "Posted 4 days ago", category: "Manufacturing", verified: true, shift: "Rotational", education: "ITI preferred", openings: 4, skills: ["Machine operation", "Safety procedures", "Quality checks"], applyPortal: false, phone: true, whatsapp: true },
];
