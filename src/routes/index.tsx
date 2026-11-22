import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Flower } from "@/components/landing/Flower";
import { RegistrationForm } from "@/components/landing/RegistrationForm";
import { ChromaGrid } from "@/components/landing/ChromaGrid";
import BorderGlow from "@/components/landing/BorderGlow";
import { Button } from "@/components/ui/button";
import yuvalPhoto from "@/assets/yuval-workshop.jpeg.asset.json";
import heroConflictDolls from "@/assets/hero-conflict-dolls.png.asset.json";
import "@/components/landing/Hero.css";
import "@/components/landing/FloatingControls.css";
import yuvalLogo from "@/assets/yuval-logo.png.asset.json";
import testimonial7 from "@/assets/testimonial-new-7.png.asset.json";
import testimonial8 from "@/assets/testimonial-new-8.png.asset.json";
import testimonial9 from "@/assets/testimonial-new-9.png.asset.json";
import testimonial10 from "@/assets/testimonial-new-10.png.asset.json";
import testimonial11 from "@/assets/testimonial-new-11.png.asset.json";
import testimonial12 from "@/assets/testimonial-new-12.png.asset.json";
import testimonial13 from "@/assets/testimonial-new-13.png.asset.json";
import testimonial14 from "@/assets/testimonial-new-14.png.asset.json";
import testimonial15 from "@/assets/testimonial-new-15.png.asset.json";
import testimonial16 from "@/assets/testimonial-new-16.png.asset.json";
import testimonial17 from "@/assets/testimonial-new-17.png.asset.json";
import testimonial18 from "@/assets/testimonial-new-18.png.asset.json";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { ref?: string } => {
    const ref = search["ref"];
    return typeof ref === "string" || typeof ref === "number" || typeof ref === "boolean"
      ? { ref: String(ref) }
      : {};
  },
  head: () => ({
    meta: [
      { title: "ממריבה לקרבה — שידור חינמי עם יובל סודאי" },
      {
        name: "description",
        content:
          "איך להפוך מריבה להזדמנות לחיזוק הקשר? מפגש חי עם יובל סודאי, 60 דקות בזום, ללא עלות. יום רביעי 25.11.2026 בשעה 20:30.",
      },
      { property: "og:title", content: "ממריבה לקרבה — שידור חינמי עם יובל סודאי" },
      {
        property: "og:description",
        content: "איך להפוך מריבה להזדמנות לחיזוק הקשר? מפגש חי עם יובל סודאי, 60 דקות בזום, ללא עלות. יום רביעי 25.11.2026 בשעה 20:30.",
      },
      { property: "og:type", content: "website" },
      ...(heroConflictDolls.url.startsWith("https://") ? [{ property: "og:image", content: heroConflictDolls.url }, { name: "twitter:image", content: heroConflictDolls.url }] : []),
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL = "https://chat.whatsapp.com/Kh9aZcX6IkRE6XYOl8tFf4";

// כדי להוסיף עדות חדשה: מייבאים את התמונה למעלה ומוסיפים אותה לרשימה הזו.
const TESTIMONIALS: { asset_id: string; url: string }[] = [
  testimonial7,
  testimonial8,
  testimonial9,
  testimonial10,
  testimonial11,
  testimonial12,
  testimonial13,
  testimonial14,
  testimonial15,
  testimonial16,
  testimonial17,
  testimonial18,
];

// מסגרת טלפון נייד שעוטפת תמונת עדות — קישוט בלבד.
function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full w-full rounded-[2rem] border-[5px] border-brand-blue-deep bg-brand-blue-deep p-1">
      <span aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-brand-blue-deep" />
      <div className="h-full w-full overflow-hidden rounded-[1.5rem] bg-card pt-4">
        <img src={src} alt={alt} className="h-full w-full object-contain" loading="lazy" draggable={false} />
      </div>
    </div>
  );
}

// עטיפת כניסה עדינה: fade-in + עלייה קלה, עם stagger בין פאנלים. רצה פעם אחת בלבד.
function Entrance({ index, entered, children }: { index: number; entered: boolean; children: React.ReactNode }) {
  return (
    <div
      className="h-full w-full transition-[opacity,transform] duration-[450ms] ease-out motion-reduce:transition-none motion-reduce:opacity-100! motion-reduce:transform-none!"
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "none" : "translateY(20px)",
        transitionDelay: `${index * 70}ms`,
      }}
    >
      {children}
    </div>
  );
}

function TestimonialsGallery() {
  const [carouselRef, carouselApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    breakpoints: { "(min-width: 768px)": { slidesToScroll: 3 } },
  });
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [entered, setEntered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselApi) return;
    const updateNavigation = () => {
      setPage(carouselApi.selectedScrollSnap());
      setPageCount(carouselApi.scrollSnapList().length);
      setCanGoBack(carouselApi.canScrollPrev());
      setCanGoForward(carouselApi.canScrollNext());
    };
    updateNavigation();
    carouselApi.on("select", updateNavigation);
    carouselApi.on("reInit", updateNavigation);
    return () => {
      carouselApi.off("select", updateNavigation);
      carouselApi.off("reInit", updateNavigation);
    };
  }, [carouselApi]);

  // אנימציית הכניסה מופעלת פעם אחת כשהגלריה נכנסת לתצוגה.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setEntered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // מצב ריק זמני: כשאין עדויות ברשימה — לא מוצג דבר, והרכיב לא נשבר.
  if (TESTIMONIALS.length === 0) return null;

  return (
    <div ref={rootRef} className="mt-10 md:mt-12" role="region" aria-roledescription="קרוסלה" aria-label="עדויות על יובל סודאי" dir="rtl">
      <div ref={carouselRef} className="overflow-hidden" onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          carouselApi?.scrollNext();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          carouselApi?.scrollPrev();
        }
      }} tabIndex={0} aria-label="תמונות העדויות">
        <div className="flex touch-pan-y gap-4 pb-2">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.asset_id} role="group" aria-roledescription="כרטיס" aria-label={`עדות ${i + 1} מתוך ${TESTIMONIALS.length}`} className="h-[420px] min-w-0 shrink-0 grow-0 basis-full md:h-[440px] md:basis-[calc((100%-2rem)/3)]">
              <Entrance index={i} entered={i < 3 ? entered : true}>
                <PhoneFrame src={t.url} alt={`צילום מסך עדות ${i + 1} על יובל סודאי`} />
              </Entrance>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 sm:gap-4">
        <Button type="button" variant="outline" size="icon" className="size-10 shrink-0 rounded-full border-brand-blue text-brand-blue" aria-label="לעמוד העדויות הקודם" title="לעמוד העדויות הקודם" disabled={!canGoBack} onClick={() => carouselApi?.scrollPrev()}>
          <ArrowRight aria-hidden="true" />
        </Button>
        <div className="flex items-center justify-center" aria-label="עמודי העדויות">
          {Array.from({ length: pageCount }, (_, index) => (
            <Button key={index} type="button" variant="ghost" size="icon" className="h-10 w-[19px] shrink-0 rounded-full p-0 sm:w-7" aria-label={`עמוד עדויות ${index + 1}`} title={`עמוד עדויות ${index + 1}`} aria-current={page === index ? "page" : undefined} onClick={() => carouselApi?.scrollTo(index)}>
              <span aria-hidden="true" className={`size-2 rounded-full ${page === index ? "bg-brand-blue" : "bg-brand-blue/25"}`} />
            </Button>
          ))}
        </div>
        <Button type="button" variant="outline" size="icon" className="size-10 shrink-0 rounded-full border-brand-blue text-brand-blue" aria-label="לעמוד העדויות הבא" title="לעמוד העדויות הבא" disabled={!canGoForward} onClick={() => carouselApi?.scrollNext()}>
          <ArrowLeft aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

function scrollToForm(e?: React.MouseEvent) {
  e?.preventDefault();
  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
}

function CTA({ children, variant = "blue" }: { children: React.ReactNode; variant?: "blue" | "pink" }) {
  const cls =
    variant === "pink"
      ? "bg-brand-pink text-brand-blue hover:shadow-card"
      : "bg-brand-blue text-primary-foreground hover:shadow-card";
  return (
    <a href="#register" onClick={scrollToForm} className={`btn-pill shadow-soft ${cls}`}>
      {children}
    </a>
  );
}

function MeetingPills({ dark = false }: { dark?: boolean }) {
  const cls = dark
    ? "bg-on-dark/10 text-on-dark border-on-dark/20"
    : "bg-brand-blue text-on-dark border-brand-blue";
  return (
    <ul className="flex flex-wrap justify-center gap-2.5 text-[0.95rem] font-semibold">
      {["📅 יום רביעי | 25.11.2026 (ט״ו כסלו)", "🕣 בשעה 20:30", "💻 בזום, מהבית"].map((t) => (
        <li key={t} className={`rounded-full border px-4 py-2 shadow-soft ${cls}`}>
          {t}
        </li>
      ))}
    </ul>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-bold tracking-wide text-brand-clay">{children}</p>;
}

function SectionTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={`font-display-tight text-center text-5xl sm:text-6xl ${light ? "text-on-dark" : ""}`}
    >
      {children}
    </h2>
  );
}

function NumberBadge({ n }: { n: number }) {
  return (
    <div className="relative size-14 shrink-0">
      <div className="flex size-14 items-center justify-center rounded-full bg-brand-blue text-2xl font-extrabold text-primary-foreground">
        {n}
      </div>
      <Flower size={22} className="absolute -top-1.5 -left-1.5" />
    </div>
  );
}

/* Decorative mockup of the "קלפי הקרבה" couples card deck: a fan of face-down
   petrol card backs and face-up cream cards with a heart. Brand tokens only. */
function CardDeckMockup() {
  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden="true">
      <span className="absolute h-[80%] w-auto aspect-[5/7] -translate-x-[62%] -rotate-[18deg] rounded-xl bg-brand-blue shadow-card ring-1 ring-on-dark/25">
        <span className="absolute inset-[13%] rounded-lg border border-dashed border-on-dark/45" />
      </span>
      <span className="absolute h-[80%] w-auto aspect-[5/7] -translate-x-[26%] -rotate-[9deg] rounded-xl bg-brand-blue-deep shadow-card ring-1 ring-on-dark/30">
        <span className="absolute inset-[13%] rounded-lg border border-dashed border-on-dark/45" />
      </span>
      <span className="absolute h-[80%] w-auto aspect-[5/7] translate-x-[10%] rotate-[6deg] rounded-xl bg-brand-cream shadow-card ring-1 ring-brand-blue-deep/25" />
      <span className="absolute flex h-[86%] w-auto aspect-[5/7] translate-x-[46%] rotate-[15deg] items-center justify-center rounded-xl bg-brand-cream shadow-card ring-1 ring-brand-blue-deep/25">
        <svg viewBox="0 0 24 24" className="h-[42%] w-[42%]" fill="var(--brand-pink)" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </span>
    </div>
  );
}

const takeaways = [
  ["להפחית את עוצמת המריבות ולמנוע את המריבה הבאה.", "לזהות מה מוביל להסלמה, לעצור את המעגל החוזר ולבחור תגובה אחרת לפני שהוויכוח הופך למריבה."],
  ["להציב גבולות ולשמור על קווים אדומים.", "לדעת לזהות היכן עובר הגבול, איך לבטא אותו בצורה ברורה ואיך לשמור עליו בלי להחריף את העימות."],
  ["להביע את עצמכם ולהרגיש שמבינים אתכם.", "לדעת להעביר את מה שחשוב לכם, ולהרגיש שבאמת מקשיבים לכם."],
  ["להפוך מחלוקת להזדמנות להתקדמות ולחיזוק הקשר.", "מתוך הבנה טובה יותר של הצד השני, לא מתוך כעס או ויתור."],
];

const topics = [
  ["מריבה בריאה או מריבה הרסנית?", "מה ההבדל בין מחלוקת שאפשר לצמוח ממנה לבין מריבה שפוגעת בתקשורת ובקשר?"],
  ["עקרון הפדלים", "איך התגובות של כל אחד מבני הזוג משפיעות על המשך המריבה, ולמה אנחנו חוזרים שוב לאותו מעגל?"],
  ["לשמוע ולהשמיע", "איך מביעים צורך ומעבירים מסר בצורה ברורה, ואיך מקשיבים בלי להתגונן?"],
  ["גבולות וקווים אדומים", "איך מזהים את הגבולות שחשוב לשמור עליהם ואיך מבטאים אותם בלי להחריף את העימות?"],
  ["השיחה שמבררת ומבהירה", "איך עוברים מוויכוח על מה שקרה לשיחה שמאפשרת להבין מה באמת עומד מאחורי המחלוקת?"],
];

const faqs = [
  ["מה אם בן או בת הזוג לא רוצים להשתתף?", "בהחלט אפשר להצטרף גם לבד. במהלך המפגש תוכלו ללמוד לזהות את דפוסי התקשורת והתגובות בתוך הקשר, ולקבל כלים שתוכלו להתחיל ליישם בעצמכם. מומלץ להגיע יחד, אבל אין בכך תנאי להשתתפות."],
  ["האם המפגש מתקיים בזום או פנים אל פנים?", "המפגש מתקיים בשידור חי בזום, כך שתוכלו להשתתף מהבית, בלי צורך להגיע למקום פיזי."],
  ["האם אפשר לשאול שאלות באופן אנונימי?", "השאלות יועברו בכתב, בהתאם למנגנון השאלות שיופעל במפגש. כך תוכלו להעלות נושא שמעסיק אתכם בלי צורך לדבר מול המשתתפים."],
  ["האם 60 דקות אינן זמן ארוך מדי?", "60 דקות שמוקדשות להבנת הדרך שבה אתם מנהלים מחלוקות, לזיהוי דפוסים ולהיכרות עם כלים מעשיים. המטרה היא לצאת מהמפגש עם הבנה וכלים שאפשר לקחת לחיי היומיום."],
  ["מה אם כבר ניסינו הכול?", "לפעמים אנחנו מנסים שוב ושוב לפתור את הנושא שעליו אנחנו רבים, בלי לזהות את הדפוס שמחזיר אותנו לאותה נקודה. במפגש נלמד להתבונן גם על הדרך שבה המריבה מתנהלת, ולא רק על הסיבה שבגללה התחילה."],
  ["האם המפגש מתאים גם למי שלא נמצא במשבר זוגי?", "בהחלט. המפגש מיועד גם לזוגות שרוצים לשפר את הדרך שבה הם מנהלים מחלוקות, להבין טוב יותר זה את זו ולרכוש כלים לתקשורת בריאה יותר – גם כשאין משבר משמעותי."],
];

function Index() {
  const { ref } = Route.useSearch();
  return (
    <div className="campaign-page overflow-x-clip">
      <div className="campaign-page__content">
      {/* 1. HERO */}
      <div className="campaign-hero bg-brand-blue-deep text-center text-on-dark" dir="rtl">
        <section aria-label="ממריבה לקרבה" className="campaign-hero__visual">
          <img src={heroConflictDolls.url} alt="שני זוגות לבבות מאוירים: ממריבה ודאגה לקרבה וחיבור" className="campaign-hero__image" fetchPriority="high" />
          <div className="campaign-hero__badge">
            <img src={yuvalLogo.url} alt="יובל סודאי — פסיכותרפיסט ויועץ זוגי מוסמך" />
          </div>
          <div className="campaign-hero__light-track" aria-hidden="true"><span className="campaign-hero__light" /></div>
          <div className="campaign-hero__title-block">
            <p className="campaign-hero__eyebrow">שידור חינמי בזום</p>
            <h1 className="campaign-hero__title font-display-tight">
              ממריבה{" "}
              <span className="relative inline-block text-brand-pink">
                לקרבה
                <svg viewBox="-4 -3 208 18" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full" aria-hidden="true">
                  <path d="M2 9C40 5 80 2 120 6C150 9 175 5 198 8" fill="none" stroke="var(--brand-cream)" strokeWidth={5} strokeLinecap="round" className="animate-draw" />
                </svg>
              </span>
            </h1>
          </div>
        </section>

        {/* 1b. פרטי המפגש וההזמנה להרשמה */}
        <section className="mx-auto max-w-3xl px-5 pb-12 pt-7 sm:pb-16 sm:pt-9">
          <h2 className="mx-auto max-w-2xl text-balance text-2xl font-bold leading-snug text-brand-cream sm:text-3xl">
            איך להפוך מריבה להזדמנות לחיזוק הקשר?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-on-dark/90 sm:text-lg">
            שניכם רוצים שיהיה טוב בבית, שניכם משתדלים, ובכל זאת לפעמים ויכוח קטן הופך למריבה ארוכה שמשאירה את שניכם מתוסכלים.
          </p>
          <div className="mt-7 rounded-lg border border-on-dark/15 bg-card/7 p-5 sm:p-7">
            <p className="text-base font-semibold leading-relaxed sm:text-lg">
              ב-60 דקות תלמדו איך להפחית את עוצמת המריבות ואת המשכן, להציב גבולות, ולשמור על קווים אדומים, להבין ולהעביר מסרים בצורה נכונה.
            </p>
            <p className="mt-4 text-base font-semibold leading-relaxed sm:text-lg">
              כך תוכלו להפוך גם מחלוקת להזדמנות להבנה ולהתקדמות בקשר.
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2 border-t border-dashed border-on-dark/20 pt-5 text-sm font-bold sm:text-base">
              {["יום רביעי | ט״ו כסליו | 25.11.2026 | בזום | ללא עלות", "20:30"].map((detail) => (
                <li key={detail} className="rounded-full bg-muted px-4 py-2 text-brand-blue-deep">{detail}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-full bg-brand-pink-soft px-4 py-2 text-center text-sm font-bold leading-relaxed text-brand-blue-deep sm:text-base">
              🎁 מי שנשאר עד הסוף מקבל במתנה את "קלפי הקרבה" (שווי 200 ₪)
            </p>
          </div>
          <div className="mt-7 flex justify-center">
            <Button asChild className="h-auto min-h-14 w-full max-w-md whitespace-normal rounded-full bg-brand-pink px-5 py-4 text-base font-bold text-brand-blue-deep shadow-soft hover:bg-brand-pink-soft hover:shadow-card sm:w-auto sm:px-10 sm:text-lg">
              <a href="#register" onClick={scrollToForm}>שריינו לי מקום במפגש ללא עלות ←</a>
            </Button>
          </div>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-on-dark/75">
            מומלץ להגיע יחד, אבל אפשר בהחלט להצטרף גם לבד.
          </p>
        </section>
      </div>

      {/* 2. הזדהות */}
      <section className="bg-brand-blue px-5 py-20 text-on-dark">
        <div className="mx-auto max-w-5xl">
          <SectionTitle light>שניכם רוצים לפתור את הבעיה. אז למה אתם שוב מוצאים את עצמכם באותה מריבה?</SectionTitle>
          <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-on-dark/85">
            זה יכול להתחיל ממשהו קטן: משפט שנאמר בטון לא נכון, בקשה שלא נענתה או שיחה שרציתם לסיים בטוב. אבל מהר מאוד כל אחד מגיב אחרת, המתח עולה, ושוב אתם מוצאים את עצמכם באותו מעגל מוכר.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                bg: "bg-brand-pink-soft",
                title: "כשאחד רוצה לדבר עכשיו",
                items: [
                  "חשוב לו לפתור את העניין כאן ועכשיו, ולכן הוא ממשיך להסביר ולשאול.",
                  "ככל שהוא מנסה להתקרב ולברר, הצד השני דווקא נסגר ומתרחק.",
                  "בסוף שניהם מתוסכלים: אחד מרגיש שלא מקשיבים לו, והשני מרגיש שלא נותנים לו רגע לנשום.",
                ],
              },
              {
                bg: "bg-brand-cream",
                title: "כשכל אחד מנסה להסביר את עצמו",
                items: [
                  "אחד מסביר למה התכוון, אבל השני עדיין פגוע ממה ששמע.",
                  "השיחה עוברת ממה שקרה עכשיו לכל הדברים שהצטברו במשך הזמן.",
                  "במקום להבין אחד את השני, כל אחד עסוק בלהוכיח למה הוא צודק.",
                ],
              },
            ].map((c) => (
              <div key={c.title} className={`rounded-3xl p-7 text-brand-ink shadow-card ${c.bg}`}>
                <h3 className="mt-1 text-2xl font-extrabold">{c.title}</h3>
                <ul className="mt-4 space-y-3">
                  {c.items.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2.5 size-2 shrink-0 rounded-full bg-brand-blue" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-xl font-semibold">
            שניכם אולי מנסים להגיע לפתרון, אבל הדרך שבה אתם מגיבים זה לזה מחזירה אתכם שוב לאותו מקום. כשמבינים את המעגל הזה, אפשר להתחיל לשנות את הדרך שבה מנהלים את המחלוקת.
          </p>
          <div className="mt-8 text-center">
            <CTA variant="pink">שריינו לי מקום במפגש ללא עלות ←</CTA>
          </div>
        </div>
      </section>

      {/* 3. בדיוק בשביל זה */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl rounded-[32px] bg-brand-blue px-6 py-14 text-center text-on-dark shadow-card sm:px-14">
          <Flower size={40} variant="light" className="mx-auto" />
          <h2 className="font-display-tight mt-3 text-5xl text-on-dark sm:text-6xl">
            כדי לנהל מריבה אחרת, צריך להבין קודם מה באמת קורה בתוכה.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-on-dark/90">
            מריבה היא לא רק חילוקי דעות. הדרך שבה אנחנו מגיבים, מקשיבים ומעבירים מסרים משפיעה על האופן שבו היא מתפתחת ועל המקום שבו היא מסתיימת.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-on-dark/90">
            במפגש יובל יכיר לכם חמישה נושאים מרכזיים שיעזרו לכם להבין את דינמיקת המריבה וללמוד איך לנהל אותה אחרת.
          </p>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {topics.map(([title]) => (
              <li key={title} className="rounded-full border border-on-dark/20 bg-on-dark/10 px-4 py-2 text-on-dark shadow-soft">
                {title}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl text-lg text-on-dark/90">
            כאשר מבינים את הדינמיקה שמניעה את המריבה, אפשר להתחיל לנהל אותה אחרת.
          </p>
          <div className="mt-8">
            <CTA variant="pink">שריינו לי מקום במפגש ללא עלות ←</CTA>
          </div>
        </div>
      </section>

      {/* 4. ארבעה דברים */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionTitle>ארבעה דברים שתיקחו איתכם כבר באותו ערב</SectionTitle>
          <div className="mt-12">
            <div className="mb-5 flex items-center gap-3 text-brand-blue-deep">
              <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-8 shrink-0">
                <path d="M5 7h6M5 13h10M5 19h14M23 5v22m-5-5 5 5 5-5" />
              </svg>
              <h3 className="text-lg font-bold">קודם: מורידים עוצמה</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {takeaways.slice(0, 2).map(([t, d], i) => (
                <BorderGlow key={t} glowColor="236 45% 44%" colors={['#3F5B6E', '#F5B8B8', '#2F4555']} backgroundColor="#2F4555" borderRadius={16} glowRadius={24} edgeSensitivity={40}>
                <article key={t} className="flex gap-4 rounded-lg border-s-4 border-brand-pink bg-brand-blue-deep p-5 text-on-dark sm:p-6">
                  <span className="shrink-0 text-2xl font-light tabular-nums text-brand-pink" aria-hidden="true">0{i + 1}</span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-extrabold leading-snug text-on-dark">{t}</h3>
                    <p className="mt-2 text-on-dark/90">{d}</p>
                  </div>
                </article>
                </BorderGlow>
              ))}
            </div>
            <div aria-hidden="true" className="flex h-20 items-center justify-center text-brand-blue/50 sm:h-24">
              <svg viewBox="0 0 32 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-8">
                <path d="M16 2v36m-7-7 7 7 7-7" />
              </svg>
            </div>
            <div className="mb-6 flex items-center gap-3 text-brand-blue">
              <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-8 shrink-0">
                <path d="M4 6h16v12h-7l-6 5v-5H4V6M24 11h4v13h-4v4l-6-4h-5M11 11h3M7 14h9" />
              </svg>
              <h3 className="text-lg font-bold">אחר כך: בונים מזה משהו טוב</h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              {takeaways.slice(2).map(([t, d], i) => (
                <BorderGlow key={t} glowColor="236 45% 44%" colors={['#3F5B6E', '#F5B8B8', '#2F4555']} backgroundColor="#FFFBF5" borderRadius={16} glowRadius={24} edgeSensitivity={40}>
                <article key={t} className="rounded-lg border border-brand-pink bg-brand-pink-soft p-7 sm:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-2xl font-light tabular-nums text-brand-blue" aria-hidden="true">0{i + 3}</span>
                    <span className="h-px flex-1 bg-brand-pink" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-extrabold leading-snug text-brand-blue">{t}</h3>
                  <p className="mt-3 text-brand-ink">{d}</p>
                </article>
                </BorderGlow>
              ))}
                </div>
          </div>
        </div>
      </section>

      {/* 5. איך לנהל אחרת */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle>מה נלמד במפגש?</SectionTitle>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-brand-blue">
            נבין מה קורה בזמן קונפליקט, ונכיר כלים מעשיים לניהול שיחה אחרת.
          </p>
          <ol className="relative mx-auto mt-12 max-w-3xl before:absolute before:inset-y-6 before:right-8 before:w-px before:bg-brand-pink sm:before:right-10">
            {topics.map(([t, d], i) => (
              <li key={t} className="relative grid grid-cols-[4rem_minmax(0,1fr)] gap-x-4 pb-10 last:pb-0 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-x-7 sm:pb-12">
                <div className="relative z-10 self-start bg-background py-2 text-center text-4xl font-light tabular-nums leading-none text-brand-blue sm:text-5xl">
                  <span className="sr-only">שלב </span>{String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 border-b border-brand-blue/15 pb-8 group-last:border-0">
                  <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 size-8 text-brand-blue">
                    <path d={[
                      "M5 24 12 17 19 21 27 8 M20 8h7v7",
                      "M25 12a10 10 0 0 0-18-2 M7 5v5h5 M7 20a10 10 0 0 0 18 2 M25 27v-5h-5",
                      "M4 7h17v12H11l-5 4v-4H4V7 M24 12h4v12h-3v4l-5-4h-5",
                      "M8 5v22 M24 5v22 M13 16h6 M16 13v6",
                      "M5 6h22v15H15l-7 6v-6H5V6 M10 11h12 M10 16h8",
                    ][i]} />
                  </svg>
                  <h3 className="text-xl font-extrabold leading-snug text-brand-blue sm:text-2xl">{t}</h3>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. יובל */}
      <section className="bg-muted px-5 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_1.2fr] md:gap-12">
          <div className="text-center">
            <div className="organic-frame mx-auto flex aspect-square w-full max-w-96 items-center justify-center overflow-hidden border-[10px] border-card bg-input shadow-card">
              <img src={yuvalPhoto.url} alt="יובל סודאי מוסר סדנה" className="h-full w-full object-cover" />
            </div>
            <div className="mx-auto mt-7 flex w-fit items-center gap-4 text-brand-blue">
              <span className="text-7xl font-light tabular-nums leading-none">16</span>
              <span className="border-s-2 border-brand-pink ps-4 text-xl font-bold">שנות ניסיון</span>
            </div>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {["CBT", "IFS", "EFT", "המפה הזוגית"].map((c) => (
                <li key={c} className="rounded-full bg-brand-sage px-3.5 py-1 text-sm font-bold text-brand-blue">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display-tight text-5xl sm:text-6xl">16 שנה של הבנת מה באמת קורה בין בני זוג – ומה אפשר לעשות אחרת</h2>
            <div className="mt-5 space-y-4 text-lg">
              <p>
                יובל סודאי הוא פסיכותרפיסט ויועץ זוגי מוסמך, המלווה זוגות כבר 16 שנה.
              </p>
              <p>
                לאורך השנים ליווה מאות זוגות וסייע להם להבין את הדפוסים שמנהלים את השיחות, את נקודות החיכוך ואת מה שמסתתר לעיתים מאחורי הוויכוח הגלוי.
              </p>
              <p>
                הגישה המקצועית של יובל מתמקדת לא רק במה שקורה בין בני הזוג, אלא גם בשאלה למה זה קורה – ואיך אפשר ליצור דרך אחרת להתמודדות.
              </p>
              <p>
                מתוך הניסיון המקצועי הזה פיתח את שיטת 'המפה הזוגית', שמסייעת להבין את המרחב האישי והמשותף בתוך הקשר.
              </p>
            </div>
            <div className="mt-8">
              <CTA>שריינו לי מקום במפגש ללא עלות ←</CTA>
            </div>
          </div>
        </div>
      </section>

      {/* 7. עדויות */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionTitle>עומק מקצועי, הסברים בהירים ותובנות שנשארות</SectionTitle>
          <ChromaGrid
            items={TESTIMONIALS.map((t, i) => ({
              image: t.url,
              accent: i % 2 === 0 ? "#3F5B6E" : "#F5B8B8",
              alt: `צילום מסך עדות ${i + 1} על יובל סודאי`,
            }))}
            theme="light"
            columns={3}
            aspectRatio="860 / 1013"
            showInfo={false}
            reveal="spotlight"
            className="mt-10 md:mt-12"
          />
          <div className="mt-10 text-center">
            <CTA>שריינו לי מקום במפגש ללא עלות ←</CTA>
          </div>
        </div>
      </section>

      {/* 8. מתנה */}
      <section className="px-5 pb-20">
        <div className="bg-gift mx-auto grid max-w-5xl items-center gap-12 overflow-hidden rounded-[32px] px-6 py-14 text-on-dark shadow-card sm:px-12 md:grid-cols-[1fr_1.3fr]">
          <div className="relative mx-auto w-full max-w-72 md:max-w-80">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2deg] rounded-2xl bg-on-dark/20" />
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[0deg] rounded-2xl bg-on-dark/35" />
            <div className="relative aspect-[3/4] -rotate-[2.5deg] overflow-hidden rounded-2xl bg-brand-blue-deep text-center shadow-card ring-1 ring-on-dark/20">
              <p className="absolute inset-x-5 top-[5%] font-display-tight text-2xl leading-tight text-on-dark md:text-3xl">
                <span className="block">קלפי</span>
                <span className="block">הקרבה</span>
              </p>
              <div className="absolute inset-x-0 top-[28%] bottom-[28%]">
                <CardDeckMockup />
              </div>
              <p className="absolute inset-x-4 bottom-[15%] text-balance text-[0.7rem] font-bold leading-snug text-brand-pink md:text-[0.78rem]">
                18 דילמות ועקרונות זוגיים אמיתיים
              </p>
              <p className="absolute inset-x-4 bottom-[8%] text-[0.62rem] font-bold leading-snug text-on-dark/80 md:text-[0.68rem]">
                שווי 200 ₪ · במתנה
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-bold leading-relaxed text-brand-pink sm:text-base">
              🎁 מתנה למשתתפים שנשארים עד סוף המפגש
            </p>
            <h2 className="mt-3 font-display-tight text-[59px] text-on-dark sm:text-[72.5px]">
              קלפי הקרבה
            </h2>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-on-dark/90 sm:text-xl">
              18 דילמות ועקרונות זוגיים אמיתיים, לשיחה פתוחה בין בני זוג — <span className="whitespace-nowrap">שווי 200 ₪, במתנה</span>
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="bg-muted px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <SectionTitle>שאלות שעולות לפני שנרשמים</SectionTitle>
          <div className="mt-10 space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="group rounded-2xl bg-card px-5 py-4 shadow-soft [interpolate-size:allow-keywords] [&::details-content]:h-0 [&::details-content]:overflow-hidden [&::details-content]:opacity-0 [&::details-content]:transition-[height,opacity,content-visibility] [&::details-content]:duration-300 [&::details-content]:ease-in-out [&::details-content]:[transition-behavior:allow-discrete] [&[open]::details-content]:h-auto [&[open]::details-content]:opacity-100 motion-reduce:[&::details-content]:transition-none sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-lg font-bold leading-snug text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                  {q}
                  <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center text-2xl transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none">+</span>
                </summary>
                <p className="pt-4 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. קריאה אחרונה */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl rounded-[32px] bg-brand-blue px-6 py-14 text-center text-on-dark shadow-card">
          <h2 className="font-display-tight text-5xl text-on-dark sm:text-6xl">
            מוכנים ללמוד לנהל את המריבות אחרת?
          </h2>
          <p className="mt-4 text-lg text-on-dark/90">
            הצטרפו למפגש החי עם יובל סודאי, וקבלו כלים מעשיים להבנת דפוסי המריבה, להצבת גבולות ולהעברת מסרים בצורה נכונה.
          </p>
          <div className="mt-7">
            <ul className="flex flex-col items-center gap-2.5 text-[0.95rem] font-semibold">
              {["יום רביעי | ט״ו כסלו | 25.11.2026", "20:30 | שידור חי בזום | ללא עלות"].map((t) => (
                <li key={t} className="rounded-full border border-on-dark/20 bg-on-dark/10 px-4 py-2 text-on-dark shadow-soft">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <CTA variant="pink">שריינו לי מקום במפגש ללא עלות ←</CTA>
          </div>
        </div>
      </section>

      {/* 11. טופס */}
      <section id="register" className="scroll-mt-6 px-5 pb-16">
        <div className="mx-auto max-w-xl">
          <Flower size={44} className="mx-auto" />
          <SectionTitle>שריינו את המקום שלכם</SectionTitle>
          <div className="mt-8">
            <RegistrationForm source={ref ?? null} />
          </div>
          <p className="mt-4 text-center text-sm text-brand-clay">
            הדף לא נטען אצלכם? אפשר גם ישירות: מייל ל-<a href="mailto:office@yuvalsudai.com" className="break-words underline-offset-4 hover:underline">office@yuvalsudai.com</a>,{" "}
            <a href="https://wa.me/972534524138" className="underline-offset-4 hover:underline">וואטסאפ</a>/<a href="tel:0534524138" className="underline-offset-4 hover:underline">טלפון <bdi>053-452-4138</bdi></a>
          </p>
          <div className="mt-6 text-center text-sm text-brand-clay">
            <a
              href="https://yuvalsudai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand-blue underline-offset-4 hover:underline"
            >
              בקרו גם באתר של יובל סודאי: yuvalsudai.com
            </a>
            <p className="mt-2">© כל הזכויות שמורות</p>
            <hr className="mx-auto my-4 w-24 border-border" />
            <a
              href="https://tovikablan.co.il"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              Tovi Kablan - אסטרטגיה, ניהול קמפיין, עיצוב ופיתוח
            </a>
          </div>
        </div>
      </section>

      </div>
      <div className="campaign-floating-controls">
      {/* 14. וואטסאפ צף — שמאל */}
      <a
        href={WHATSAPP_URL}
        aria-label="הצטרפו עכשיו לקבלת תכנים ועדכונים בוואטסאפ"
        className="animate-float fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full bg-card p-1.5 pe-1.5 shadow-card sm:pe-4"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-whatsapp text-on-dark">
          <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
          </svg>
        </span>
        <span className="hidden text-sm font-bold text-brand-blue sm:inline">
          הצטרפו עכשיו לקבלת תכנים ועדכונים
        </span>
      </a>

      {/* 15. מדריך צף — ימין */}
      <a
        href="#register"
        onClick={scrollToForm}
        aria-label="יש לנו מדריך! להרשמה"
        className="animate-float-delayed fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-card p-1.5 pe-1.5 shadow-card sm:pe-4"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-brand-blue">
          <Flower size={34} variant="light" />
        </span>
        <span className="hidden text-sm font-bold text-brand-blue sm:inline">יש לנו מדריך!</span>
      </a>
      </div>
    </div>
  );
}
