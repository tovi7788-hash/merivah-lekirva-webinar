import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  full_name: z.string().trim().min(2, "נא למלא שם מלא").max(100, "השם ארוך מדי"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{9,15}$/, "נא להזין מספר נייד תקין"),
  email: z
    .string()
    .trim()
    .max(255)
    .email("כתובת הדוא״ל אינה תקינה")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "יש לאשר כדי להירשם" }) }),
});

type Errors = Partial<Record<"full_name" | "phone" | "email" | "consent" | "form", string>>;

export function RegistrationForm({ source = null }: { source?: string | null }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({ full_name: "", phone: "", email: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as keyof Errors] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const { error } = await supabase.from("webinar_registrations").insert({
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      email: parsed.data.email ? parsed.data.email : null,
      consent: true,
      source,
    });
    if (error) {
      setStatus("idle");
      setErrors({ form: "משהו השתבש בשליחה. נסו שוב בעוד רגע." });
      return;
    }
    await navigate({ to: "/thank-you" });
  }

  const field =
    "w-full rounded-2xl border border-input bg-background px-4 py-3 text-base text-brand-ink outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl bg-card p-6 shadow-card sm:p-10">
      <div>
        <label htmlFor="full_name" className="mb-1.5 block font-semibold text-brand-blue">
          שם מלא *
        </label>
        <input
          id="full_name"
          className={field}
          autoComplete="name"
          maxLength={100}
          value={values.full_name}
          onChange={(e) => setValues({ ...values, full_name: e.target.value })}
        />
        {errors.full_name && <p className="mt-1 text-sm text-destructive">{errors.full_name}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block font-semibold text-brand-blue">
          טלפון נייד *
        </label>
        <input
          id="phone"
          type="tel"
          dir="ltr"
          inputMode="tel"
          autoComplete="tel"
          maxLength={15}
          className={`${field} text-right`}
          value={values.phone}
          onChange={(e) => setValues({ ...values, phone: e.target.value })}
        />
        {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block font-semibold text-brand-blue">
          דוא״ל <span className="font-normal text-brand-clay">(לא חובה)</span>
        </label>
        <input
          id="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          maxLength={255}
          className={`${field} text-right`}
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          className="mt-1 size-5 shrink-0 accent-brand-blue"
          checked={values.consent}
          onChange={(e) => setValues({ ...values, consent: e.target.checked })}
        />
        <span>
          אני מאשר/ת קבלת תכנים, עדכונים והזמנות נוספות במייל ו/או בוואטסאפ מיובל סודאי, לרבות
          אישור וקישור למפגש ותזכורות. ניתן להסיר את עצמי בכל עת. אישור זה נדרש לצורך ההרשמה,
          בהתאם לחוק הגנת הפרטיות, התשמ"א-1981.
        </span>
      </label>
      {errors.consent && <p className="-mt-3 text-sm text-destructive">{errors.consent}</p>}
      {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
      <button
        type="submit"
        disabled={status === "sending" || !values.consent}
        className="btn-pill w-full bg-brand-blue text-primary-foreground shadow-soft disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {status === "sending" ? "שולחים..." : "כן, אני רוצה מקום בשידור החינמי! ←"}
      </button>
    </form>
  );
}
