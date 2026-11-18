import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Gift, Check, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@/assets/hero-conflict-dolls-dark.png.asset.json";
import "./sales.css";

const WA = "https://wa.me/972534524138?text=" + encodeURIComponent("אני רוצה להצטרף למסלול ממריבה לקרבה");
// קישורי תשלום אמיתיים
const PAY_COUPLE = "https://mrng.to/zjpRrldVPj";
const PAY_SINGLE = "https://mrng.to/Z6tX2ZzTxo";
// חצות 18.11.2026 שעון ישראל (UTC+2)
const DEADLINE = Date.parse("2026-11-18T22:00:00Z");

export const Route = createFileRoute("/sales")({
  head: () => ({
    meta: [
      { title: "ממריבה לקרבה — תוכנית ליווי קבוצתית | יובל סודאי" },
      { name: "description", content: "6 מפגשים חיים לזוגות: להבין מה באמת קורה ביניכם ולבנות דרך חדשה להתקרב. מחיר מיוחד למשתתפי הוובינר." },
      { property: "og:title", content: "ממריבה לקרבה | יובל סודאי" },
      { property: "og:description", content: "תהליך קבוצתי בן 6 מפגשים חיים לזוגות, דרך החקר הזוגי." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  component: Sales,
});

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, DEADLINE - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

function Countdown() {
  const left = useCountdown();
  const parts = left === null ? null : [
    { v: Math.floor(left / 86400000), l: "ימים" },
    { v: Math.floor(left / 3600000) % 24, l: "שעות" },
    { v: Math.floor(left / 60000) % 60, l: "דקות" },
    { v: Math.floor(left / 1000) % 60, l: "שניות" },
  ].filter((p, i) => i > 0 || p.v > 0);
  if (left === 0) return <p className="text-sm text-muted-foreground">ההטבה הסתיימה</p>;
  return (
    <div className="flex gap-3" dir="rtl">
      {(parts ?? [{ v: 0, l: "שעות" }, { v: 0, l: "דקות" }, { v: 0, l: "שניות" }]).map((p) => (
        <div key={p.l} className="glow-card min-w-16 rounded-xl px-3 py-2 text-center">
          <div className="text-2xl font-extrabold tabular-nums text-primary">{parts ? String(p.v).padStart(2, "0") : "--"}</div>
          <div className="text-xs text-muted-foreground">{p.l}</div>
        </div>
      ))}
    </div>
  );
}

function PayButton({ href, label, variant, full }: { href: string; label: string; variant: "primary" | "secondary"; full?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`sales-cta sales-cta-${variant}${full ? " w-full" : ""}`}>
      {label}
    </a>
  );
}

function CtaPair({ sub }: { sub?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
        <PayButton href={PAY_COUPLE} label="להצטרפות כזוג — 850 ₪ ←" variant="primary" />
        <PayButton href={PAY_SINGLE} label="להצטרפות כיחיד — 650 ₪ ←" variant="secondary" />
      </div>
      {sub && <p className="text-sm font-medium text-muted-foreground">{sub}</p>}
    </div>
  );
}

const sessions = [
  ["להבין את הצורך והרצון של בן או בת הזוג בקשר", "ללמוד לזהות מה באמת חשוב לצד השני, מה הוא מבקש דרך המילים והתגובות שלו, ומה עשוי לעמוד מאחורי המתחים החוזרים."],
  ["להבין את הצרכים והרצונות שלכם", "לזהות מה אתם צריכים מהקשר, מה חסר לכם, ואיך אפשר להעביר את הדברים בצורה ברורה ונכונה יותר."],
  ["ללמוד איך מעוררים אהבה ואיך עובדים איתה נכון", "להבין מה מחזק את החיבור, ואיך יוצרים יותר מקום לקרבה ולצמיחה."],
  ["למקד את ההשקעה והמסירות שלכם", "ללמוד לזהות איפה נכון להשקיע, ומה יכול לחזק את הקשר מהצד שלכם."],
  ["לבנות חברות קרובה ולשפר את התקשורת", "להעלות את רמת ההקשבה, ההבנה והיכולת לדבר גם על הדברים המורכבים."],
  ["להתמודד טוב יותר עם אתגרי הזוגיות בהמשך החיים", "לרכוש הבנה שתוכל ללוות אתכם גם כשהאתגרים הבאים יגיעו."],
] as const;

const extras = [
  "תרגילים, שאלות מכוונות ותרגילי התבוננות שיעזרו לכם להעלות מודעות ולחבר את התוכן לחיים שלכם.",
  "קשר במייל כדי לחבר את הנלמד אליכם ואל המציאות הזוגית שלכם.",
  "יום שאלות ותשובות בקבוצה, עם אפשרות להעלות שאלות באופן אנונימי.",
];

const testimonials = [
  ["אין מילים לתאר את הכוח האדיר וההבנה העמוקה... מרגישים שאתה ממש בתוך הסיפור.", "יוסף ח."],
  ["הסרטון מיוחד במינו, מקפל כל כך הרבה בחוכמה. יישר כוח גדול על פעלך.", "ח. וא."],
  ["תודה הרב סודאי, אנחנו עוקבים אחרי כל סרטון ומקבלים הרבה תועלת. כה לחיי!!!", "יהודה"],
] as const;

const faqs = [
  ["האם אפשר להצטרף גם אם בן או בת הזוג לא מצטרפים?", "כן. המסלול בנוי גם למי שמתחיל לבד. אפשר להתחיל בתהליך אישי של התבוננות ולמידה, ובמקרים רבים בן או בת הזוג מצטרפים בהמשך."],
  ["האם זה מתאים גם למי שכבר ניסה ייעוץ זוגי?", "המסלול מציע דרך עבודה המבוססת על החקר הזוגי, שמבקשת לזהות את שורש הקושי ואת הצרכים שמאחורי הדילמות החוזרות, ולא להסתפק בעצות כלליות."],
  ["האם מדובר בקורס מוקלט?", "לא. מדובר בשישה מפגשים חיים, עם תרגילים, התבוננות וחיבור של התוכן לחיים שלכם."],
  ["מה מקבלים בסיום התהליך?", "לכל זוג נבנית מפה אישית של הדילמות החוזרות שלו, לצד הבנה מעמיקה יותר של הצרכים, הרצונות והנקודות שבהן נכון לחזק את הקשר."],
  ["עד מתי אפשר להצטרף במחיר המיוחד?", "עד יום רביעי, 18.11.2026, בשעה 24:00. לאחר מכן המחיר חוזר למחיר הרגיל."],
] as const;

const priceOptions = [
  {
    label: "לזוג",
    program: "ממריבה לקרבה · מסלול זוגי",
    old: "2,600",
    now: "850",
    saving: "1,750",
    href: PAY_COUPLE,
    cta: "להצטרפות כזוג — 850 ₪ ←",
    variant: "primary" as const,
    recommended: true,
  },
  {
    label: "ליחיד",
    program: "ממריבה לקרבה · מסלול אישי",
    old: "2,400",
    now: "650",
    saving: "1,750",
    href: PAY_SINGLE,
    cta: "להצטרפות כיחיד — 650 ₪ ←",
    variant: "secondary" as const,
    recommended: false,
  },
];

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-8 text-3xl font-extrabold md:text-4xl">{children}</h2>;
}

function Sales() {
  return (
    <div dir="rtl" className="sales-theme min-h-screen bg-background text-right text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-xl font-extrabold tracking-tight">
          יובל <span className="text-primary">סודאי</span>
        </div>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">להצטרפות ←</a>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage.url}
          alt="לבבות מצוירים — ממריבה לקרבה"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* מעבר הדרגתי מהתמונה לרקע הדף */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 50%, #0d1a2e 95%), linear-gradient(to right, #0d1a2e 0%, transparent 20%, transparent 80%, #0d1a2e 100%)",
          }}
        />
        <div className="relative z-[2] mx-auto flex min-h-[450px] max-w-6xl flex-col justify-center px-6 pb-24 pt-16 md:min-h-[550px] md:pt-24">
          <div className="max-w-2xl" style={{ textShadow: "0 2px 18px rgba(13,26,46,0.85), 0 1px 4px rgba(13,26,46,0.9)" }}>
            <h1 className="text-5xl font-black leading-[1.1] md:text-7xl">
              לא חייבים להמשיך לריב על <span className="text-primary">אותן נקודות.</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              אפשר ללמוד להבין מה באמת קורה ביניכם — ולבנות דרך חדשה להתקרב.
            </p>
          </div>
          <div className="glow-card mt-10 max-w-xl rounded-2xl p-6">
            <p className="font-bold text-primary">🎯 מחיר מיוחד למשתתפי הוובינר עד היום ב-24:00</p>
            <p className="mt-2 text-lg">
              <b>850 ₪</b> לזוג <s className="text-muted-foreground">(במקום 2,600 ₪)</s>
              <span className="mx-2 text-muted-foreground">|</span>
              <b>650 ₪</b> ליחיד <s className="text-muted-foreground">(במקום 2,400 ₪)</s>
            </p>
            <div className="mt-4"><Countdown /></div>
          </div>
          <div className="mt-10"><CtaPair /></div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xl leading-loose text-muted-foreground md:text-2xl md:leading-loose">
          כבר ראיתם איך מריבות חוזרות לא תמיד מתחילות מהאירוע עצמו. לפעמים הוויכוח הוא על כסף, על חלוקת התפקידים בבית, על הילדים או על משהו שנאמר ברגע של כעס.{" "}
          <span className="text-foreground">אבל מתחת למילים מסתתר לעיתים חוסר עמוק יותר בקשר</span> — צורך שלא מקבל מענה, פגיעה שלא קיבלה מקום, או תחושה שאחד מכם לא באמת רואה את השני. וכשלא מבינים מה עומד בשורש המריבה, קל למצוא את עצמנו שוב ושוב באותו מעגל.{" "}
          <span className="font-semibold text-primary">הגיע הזמן לא רק ללמוד איך לריב אחרת, אלא להבין מה הקשר שלכם צריך כדי להתקרב.</span>
        </p>
      </section>

      {/* WHAT */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="mb-3 font-semibold text-secondary">התהליך</p>
        <SectionTitle>המסלול ממריבה לקרבה</SectionTitle>
        <p className="text-lg leading-loose text-muted-foreground md:text-xl">
          תהליך קבוצתי בן <b className="text-foreground">6 מפגשים חיים</b>, שבו נעמיק בהבנת הצרכים והרצונות של כל אחד מבני הזוג, נלמד לזהות את הדפוסים שמפעילים את המריבות, ונבין היכן נכון להשקיע כדי לחזק את הקשר. זה לא קורס מוקלט שצופים בו לבד. זהו תהליך של למידה, התבוננות ותרגול, שבסופו לכל זוג תהיה <b className="text-primary">מפה אישית של הדילמות החוזרות שלו.</b>
        </p>
      </section>

      {/* SESSIONS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionTitle>6 המפגשים</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map(([t, d], i) => (
            <div key={t} className="glow-card rounded-2xl p-8">
              <div className="text-6xl font-black text-primary/80">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-4 text-xl font-bold leading-snug">{t}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXTRAS */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <SectionTitle>מה עוד כלול — לא רק מפגשים</SectionTitle>
        <ul className="space-y-5">
          {extras.map((e) => (
            <li key={e} className="flex gap-4 text-lg leading-relaxed">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary"><Check className="h-4 w-4" /></span>
              <span className="text-muted-foreground">{e}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* BIO */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="glow-card grid items-center gap-10 rounded-3xl p-8 md:grid-cols-[220px_1fr] md:p-12">
          <div className="heart-gradient flex aspect-square items-center justify-center rounded-2xl text-2xl font-extrabold">יובל סודאי</div>
          <div>
            <h2 className="text-3xl font-extrabold">לזוגיות יש שפה. צריך ללמוד להקשיב לה.</h2>
            <p className="mt-6 text-lg leading-loose text-muted-foreground">
              יובל סודאי הוא <strong className="font-extrabold text-foreground">פסיכותרפיסט</strong> ומטפל זוגי מוסמך, בעל 16 שנות ניסיון בליווי זוגות.
            </p>
            <p className="mt-4 text-lg leading-loose text-muted-foreground">
              במהלך השנים חקר לעומק את הדינמיקה הזוגית ואת הדפוסים שמעצבים כל קשר, ומתוך הניסיון המצטבר פיתח דרך ייחודית לקרוא את השפה של כל זוג: להבין מה מניע את בני הזוג, מה עומד מאחורי התגובות שלהם וכיצד נוצרים מעגלי הריחוק והעימות.
            </p>
            <p className="mt-4 text-lg leading-loose text-muted-foreground">
              בעבודתו משלב יובל כלים מעולמות הטיפול השונים, בהם CBT, EFT, IFS ושיטת 12 הצעדים, ומתאים אותם לצרכים הייחודיים שעולים בתהליך הליווי.
            </p>
            <p className="mt-4 text-lg leading-loose text-muted-foreground">
              כך, במקום להסתפק בטיפים או בפתרונות אחידים, הוא מוביל תהליך שמחבר בין הבנה עמוקה של הקשר לבין כלים מעשיים ליישום בחיי היומיום — כדי להפוך נקודות חיכוך להזדמנויות להבנה, לחזק את החברות ולבנות קרבה מחודשת.
            </p>
            <p className="bio-lead mt-7 text-xl font-extrabold leading-relaxed md:text-2xl">
              זהו הליווי הקבוצתי היחיד שבו שני בני הזוג משתתפים יחד.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionTitle>מה אומרים</SectionTitle>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map(([q, n]) => (
            <figure key={n} className="glow-card rounded-2xl p-8">
              <div className="text-5xl leading-none text-secondary">”</div>
              <blockquote className="mt-2 text-lg leading-relaxed">{q}</blockquote>
              <figcaption className="mt-5 font-semibold text-primary">— {n}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRICE */}
      <section className="sales-band price-section py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            ההטבה תקפה עד היום, 18.11.2026, בחצות בלבד
          </span>
          <h2 className="mt-6 text-3xl font-extrabold md:text-5xl">ההזדמנות המיוחדת למשתתפי הוובינר</h2>
          <div className="mt-6 flex justify-center"><Countdown /></div>
          <div className="price-grid mx-auto mt-12 grid gap-6 md:grid-cols-2">
            {priceOptions.map((o) => (
              <article key={o.label} className={`price-card${o.recommended ? " price-card-featured" : ""}`}>
                {o.recommended && <span className="price-badge">הכי נבחר</span>}
                <p className="price-label">{o.label}</p>
                <p className="price-amount" dir="ltr">
                  <span className="price-number">{o.now}</span>
                  <sup className="price-currency">₪</sup>
                </p>
                <p className="price-program">{o.program}</p>
                <div className="price-meta">
                  <p className="price-old">
                    <span>במקום</span>
                    <s>{o.old} ₪</s>
                  </p>
                  <p className="price-saving">חיסכון של {o.saving} ₪</p>
                </div>
                <div className="price-action">
                  <PayButton href={o.href} label={o.cta} variant={o.variant} full />
                </div>
              </article>
            ))}
          </div>
          <p className="price-note mt-6">אפשרות לפריסה של עד 3 תשלומים.</p>
        </div>
      </section>

      {/* GIFT */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="glow-card rounded-3xl p-8 md:p-12">
          <Gift className="h-10 w-10 text-primary" />
          <h2 className="mt-4 text-3xl font-extrabold">🎁 מתנה מיוחדת למצטרפים</h2>
          <p className="mt-4 text-lg leading-loose text-muted-foreground">
            כל מי שיצטרף לתהליך הליווי הקבוצתי יקבל ללא עלות נוספת את המשחק הזוגי הדיגיטלי <b className="text-foreground">'הדלתות שבינינו'</b>, או את הקלפים להדפסה. המשחק נועד להוסיף עוד דרך לפתוח שיחה, להתבונן ולהעמיק את ההיכרות ביניכם.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-3xl font-extrabold md:text-5xl">אולי זה בדיוק הזמן לעשות משהו אחרת?</h2>
        <p className="mt-6 text-lg leading-loose text-muted-foreground md:text-xl">
          אם אתם מרגישים שהמריבות חוזרות על עצמן, שהשיחות לא תמיד מובילות להבנה, או שאתם רוצים להכיר טוב יותר את מה שכל אחד מכם צריך מהקשר — המסלול הזה נבנה כדי לעזור לכם להתחיל לעשות את הדרך.
        </p>
        <div className="mt-10"><CtaPair /></div>
        <p className="mt-4 text-sm font-semibold text-primary">ההטבה מסתיימת היום בחצות</p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <SectionTitle>שאלות ותשובות</SectionTitle>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={q} value={`f${i}`} className="glow-card rounded-xl border px-6">
              <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 md:flex-row md:items-center md:justify-between">
          <div className="text-lg font-extrabold">יובל <span className="text-primary">סודאי</span></div>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            יש לכם שאלה לפני ההצטרפות? אפשר לפנות ליובל בטלפון:
            <a href="tel:0534524138" className="font-semibold text-foreground" dir="ltr">053-452-4138</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
