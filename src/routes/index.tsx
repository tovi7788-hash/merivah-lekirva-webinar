import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Flower } from "@/components/landing/Flower";
import { RegistrationForm } from "@/components/landing/RegistrationForm";
import { Button } from "@/components/ui/button";
import yuvalPhoto from "@/assets/yuval-workshop.jpeg.asset.json";
import heroBg from "@/assets/hero-bg.jpg.asset.json";
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
          "מפגש חי בזום, ללא עלות: איך להפוך את הריחוק בבית לחיבור אמיתי. יום רביעי 18.11.2026 בשעה 20:30.",
      },
      { property: "og:title", content: "ממריבה לקרבה — שידור חינמי עם יובל סודאי" },
      {
        property: "og:description",
        content: "איך אומרים את מה שחשוב לנו — ומרגישים אהובים? 90 דקות בזום, מהבית.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroBg.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroBg.url },
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
      {["📅 יום רביעי | 18.11.2026 (ח׳ כסלו)", "🕣 בשעה 20:30", "💻 בזום, מהבית"].map((t) => (
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

const takeaways = [
  ["לעצור את המריבה באמצע — בלי לשרוט ובלי לוותר על מה שחשוב לך", "שלא תשרטו, אבל עדיין תעבירו את המסר."],
  ["להבין למה אותה מריבה חוזרת שוב ושוב — דרך עקרון הפדלים", "בלי להתרגש כל כך מתגובות מסוימות של בן או בת הזוג, וללמוד לבחור תגובה אחרת."],
  ["להציב גבול בלי שזה יהפוך לקרב — בלי צעקות ובלי ויתור שקט", "מתוך כבוד לשניכם, לא מתוך כעס או ויתור."],
  ["לזהות מה חסר בקשר, ולא רק על מה רבים — עם שיטת המפה הזוגית שיובל פיתח", "לזהות את החוסר שגורם למריבות, ואיפה בדיוק נמצא החיבור."],
];

const topics = [
  ["האם יש מריבות בריאות?", "המתח הוא חלק טבעי מהזוגיות. נבין למה לא צריך לפחד ממחלוקות, למה חשוב להציב גבולות, ואיך מריבות שלא מטופלות עלולות להצטבר וליצור שבר."],
  ["עקרון הפדלים", "הזוגיות היא מעגל שבו כל אחד משפיע על השני. לא תמיד השאלה היא מי צודק — אלא איך נוצר המעגל הזה, ואיך אפשר לשנות את התנועה בתוכו."],
  ["המטרה: לשמוע ולהשמיע", "המריבה אינה תחרות שבה צריך לנצח. נלמד איך לבטא את הצרכים שלנו, ובו בזמן להבין מה בן או בת הזוג באמת מבקשים לומר."],
  ["רמת המריבה הנכונה", "לא חלשים מדי ולא קיצוניים מדי. איך יודעים מתי להציב קו אדום, מתי להביע עמדה בעוצמה, ומתי לעצור ולבחור דרך אחרת."],
  ["השיחה שמבארת ומבהירה", "איך עושים את זה בפועל? איך משמיעים, איך מקשיבים, ואיך מנהלים שיחה שאפשר לצאת ממנה עם יותר הבנה ופחות ריחוק."],
];

const faqs = [
  ["בן/בת הזוג שלי לא יבוא/תבוא", "מגיעים ביחד? זה כפול. מגיע או מגיעה לבד? זו כבר התחלה אמיתית. גם כשמגיעים לבד אפשר ללמוד לזהות את הדינמיקה הזוגית."],
  ["זה בזום, זה לא יעזור כמו פגישה פרונטלית", "המפגש מתקיים מהבית, בסביבה הנוחה והמוכרת שלכם, בלי נסיעות."],
  ["איך אפשר לשאול שאלות? האם ישמעו אותי?", "במהלך המפגש תוכלו לשלוח שאלות בכתב דרך אזור השאלות והתשובות של Zoom. השאלות נשלחות ליובל בלבד, באופן אנונימי, ללא הצגת שמכם למשתתפים האחרים."],
  ["אין לי זמן, 90 דקות זה הרבה", "זו אחת השעה וחצי המשמעותיות ביותר שתשקיעו החודש בזוגיות שלכם."],
  ["ניסינו כבר הכול, שום דבר לא עזר", "לפעמים אנחנו מנסים שוב ושוב לפתור את הנושא שעליו אנחנו רבים, אבל לא מזהים את המעגל שחוזר על עצמו."],
  ["האם המפגש מתאים גם למי שאין לו משבר זוגי?", "בהחלט. המפגש מתאים גם לזוגות שרוצים לחזק את הקשר."],
];

function Index() {
  const { ref } = Route.useSearch();
  return (
    <div className="overflow-x-clip">
      {/* 1. HERO — viewport-tall, one dramatic statement */}
      <section className="relative isolate flex items-center justify-center overflow-hidden">
        <img
          src={heroBg.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-x-0 -top-[280px] h-full w-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,251,245,0) 30%, rgba(255,251,245,.92) 54%, var(--brand-cream) 66%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-[18px] pt-[12px] text-center sm:pt-[32px]">
          <img
            src={yuvalLogo.url}
            alt="יובל סודאי — פסיכותרפיסט ויועץ זוגי מוסמך"
            className="mx-auto h-24 w-auto sm:h-28"
          />
          <p className="mt-[12px] mb-[18px] inline-block rounded-full border-[3px] border-brand-blue bg-brand-pink/30 px-8 py-4 text-[20px] font-extrabold leading-[1.4] text-brand-blue sm:text-[22px]">
            יום רביעי 18.11.2026 <span className="text-brand-pink">·</span> 20:30{" "}
            <span className="text-brand-pink">·</span> בזום, מהבית
          </p>
          <p className="mb-[2px] text-balance text-[16px] font-semibold leading-[1.4] text-brand-clay sm:text-[17px]">יובל סודאי מזמין אתכם לשידור יישומי בנושא:</p>
          <h1 className="font-display-tight mb-[8px] text-[110px] leading-[1.15] sm:text-[160px]">
            ממריבה{" "}
            <span className="relative inline-block text-brand-pink">
              לקרבה
              <svg
                viewBox="-4 -3 208 18"
                preserveAspectRatio="none"
                className="absolute -bottom-[8px] left-0 h-[12px] w-full"
                aria-hidden="true"
              >
                <path
                  d="M2 9C40 5 80 2 120 6C150 9 175 5 198 8"
                  fill="none"
                  stroke="var(--brand-blue)"
                  strokeWidth={8}
                  strokeLinecap="round"
                  className="animate-draw"
                />
              </svg>
            </span>
          </h1>
          <p className="mx-auto mb-[20px] max-w-xl text-balance text-[22px] font-semibold leading-[1.35] sm:mb-[26px] sm:text-[27px]">
            איך להפוך את הריחוק בבית לחיבור אמיתי?
          </p>
          <div className="mx-auto max-w-[650px]">
            <blockquote className="mx-auto mb-[18px] max-w-[625px] text-[17px] font-normal leading-[1.5] text-foreground sm:text-[19px]">
              "איך יכול להיות ששניכם רוצים שיהיה טוב בבית, שניכם משתדלים... ובסוף שוב מוצאים את עצמכם באותו ויכוח?"
            </blockquote>
            <p className="mb-[20px] text-[16px] font-semibold leading-[1.55] sm:mb-[24px] sm:text-[18px]">
              ב־90 דקות תלמדו לנהל את הריבים אחרת: להעביר את מה שחשוב לכם בלי לשרוט, ולהקשיב בלי להתגונן. כי כשיודעים לנהל קונפליקט נכון, גם הריבים יכולים להפוך להזדמנות לבנות קשר חזק יותר, עם אמון, קרבה ואהבה עמוקה. תלמדו להבחין בין מריבה בריאה שמקרבת, לבין מריבה שפוגעת — ואיך לשמור על הגבול הזה בכל ויכוח.
            </p>
          </div>
          <div className="flex justify-center">
            <Button asChild className="h-[56px] w-full max-w-[360px] rounded-full bg-brand-blue px-3 text-[17px] font-bold text-primary-foreground shadow-soft hover:bg-brand-blue-deep hover:shadow-card sm:w-auto sm:px-8 sm:text-[18px]">
              <a href="#register" onClick={scrollToForm}>שריינו לי מקום בשידור החינמי ←</a>
            </Button>
          </div>
          <p className="mx-auto mt-[12px] max-w-xl text-[17px] leading-[30px] text-brand-clay">
            מגיעים ביחד? זה כפול. מגיע/ה לבד? זו כבר התחלה אמיתית.
          </p>
        </div>
      </section>

      {/* 1b. calm supporting copy that used to live inside the hero */}
      <section className="px-5 pb-16 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mx-auto inline-block max-w-xl rounded-2xl border border-brand-pink px-5 py-3 font-semibold text-brand-blue">
            💎 השידור היחיד ששני בני הזוג יכולים להשתתף בו ולתרגל בזמן אמת — בדיסקרטיות מוחלטת!
          </p>
        </div>
      </section>

      {/* 2. הזדהות */}
      <section className="bg-brand-blue px-5 py-20 text-on-dark">
        <div className="mx-auto max-w-5xl">
          <SectionTitle light>לתת מעצמך — בלי לאבד את עצמך</SectionTitle>
          <p className="mx-auto mt-5 max-w-3xl text-center text-lg text-on-dark/85">
            בכל זוגיות יש "שלי" ו"שלך" — השאלה היא איפה עובר הגבול ביניהם, ומי קובע אותו. שני
            אנשים אוהבים, שני אנשים שרוצים בטובת הקשר, אבל לפעמים כל אחד מהם חווה את המציאות
            הזוגית בצורה שונה לחלוטין.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                tag: "הצד שלה",
                bg: "bg-brand-pink-soft",
                title: "מה קורה כשהוא לא רואה אותך?",
                items: [
                  "את מדברת, והוא כאילו לא שומע — שוב ושוב",
                  "מרגישה רחוקה ממנו גם כשאתם באותו חדר",
                  'כל שיחה נגמרת בתחושה שאת "הבעיה"',
                ],
              },
              {
                tag: "הצד שלו",
                bg: "bg-brand-sky-soft",
                title: "מה קורה כשהוא מרגיש שכל הזמן דורשים ממנו?",
                items: [
                  "מה שלא תעשה, זה אף פעם לא מספיק",
                  "אתה נותן ונותן — ומרגיש שזה לא נחשב",
                  "כל שיחה הופכת לרשימה של מה עשית לא נכון",
                ],
              },
            ].map((c) => (
              <div key={c.tag} className={`rounded-3xl p-7 text-brand-ink shadow-card ${c.bg}`}>
                <span className="text-sm font-bold text-brand-clay">{c.tag}</span>
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
            שני הצדדים צודקים, ושניכם תקועים באותו מעגל — וזה לא אומר שמשהו שבור, רק שיש משהו אחד
            שעדיין לא הבנתם.
          </p>
          <div className="mt-8 text-center">
            <CTA variant="pink">כן, אני רוצה מקום בשידור החינמי! ←</CTA>
          </div>
        </div>
      </section>

      {/* 3. בדיוק בשביל זה */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl rounded-[32px] bg-brand-blue px-6 py-14 text-center text-on-dark shadow-card sm:px-14">
          <Flower size={40} variant="light" className="mx-auto" />
          <h2 className="font-display-tight mt-3 text-5xl text-on-dark sm:text-6xl">
            בדיוק בשביל זה בנינו את המפגש הזה
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-on-dark/90">
            יובל ייקח אתכם צעד אחר צעד אל השורש האמיתי של החיכוכים החוזרים — ויראה
            לכם בדיוק איפה עובר הגבול הבריא בין מה ששייך לך, מה ששייך לבן או בת הזוג, ומה ששייך
            ל"ממלכה המשותפת" שלכם. לא עוד תיאוריה —{" "}
            <strong className="text-brand-pink">שיטה שאפשר להתחיל להשתמש בה כבר במריבה הבאה.</strong>
          </p>
          <div className="mt-8">
            <CTA variant="pink">כן, אני רוצה מקום בשידור החינמי! ←</CTA>
          </div>
        </div>
      </section>

      {/* 4. ארבעה דברים */}
      <section className="bg-muted px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionTitle>ארבעה דברים שתיקחו איתכם כבר באותו ערב</SectionTitle>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {takeaways.map(([t, d], i) => (
              <div key={t} className="flex gap-5 rounded-3xl bg-card p-6 shadow-soft">
                <NumberBadge n={i + 1} />
                <div>
                  <h3 className="text-xl font-extrabold">{t}</h3>
                  <p className="mt-1">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. איך לנהל אחרת */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle>לא רק על מה אתם רבים, אלא איך לנהל את זה אחרת</SectionTitle>
          <div className="mt-12 space-y-5">
            {topics.map(([t, d], i) => (
              <div key={t} className="flex gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
                <NumberBadge n={i + 1} />
                <div>
                  <h3 className="text-xl font-extrabold">{t}</h3>
                  <p className="mt-1">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. יובל */}
      <section className="bg-muted px-5 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1fr_1.4fr]">
          <div className="text-center">
            <div className="organic-frame mx-auto flex aspect-square w-64 items-center justify-center overflow-hidden border-[10px] border-card bg-input shadow-card sm:w-80">
              <img src={yuvalPhoto.url} alt="יובל סודאי מוסר סדנה" className="h-full w-full object-cover" />
            </div>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {["CBT", "IFS", "EFT", "המפה הזוגית", "16 שנות ניסיון"].map((c) => (
                <li key={c} className="rounded-full bg-brand-sage px-3.5 py-1 text-sm font-bold text-brand-blue">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>פסיכותרפיסט (CBT, IFS) ומטפל זוגי מוסמך (EFT, המפה הזוגית)</Eyebrow>
            <h2 className="font-display-tight text-5xl sm:text-6xl">יובל ושיטת המפה הזוגית</h2>
            <div className="mt-5 space-y-4 text-lg">
              <h3 className="text-xl font-extrabold">16 שנות ניסיון בהבנת מה שבאמת קורה בין בני זוג</h3>
              <p>
                יובל סודאי מלווה זוגות כבר 16 שנה, ומתמחה בזיהוי שורש הקושי הזוגי – לא רק במה שרואים על פני השטח, אלא במה שבאמת מניע את הדברים.
              </p>
              <p>
                במהלך השנים, בעבודה עם מאות זוגות בקליניקה, בסדנאות ובייעוץ זוגי, יובל זיהה שוב ושוב כיצד זוגות שונים מתמודדים עם דפוסים דומים: אותם חיכוכים, אותן אי-הבנות ואותם מעגלים שחוזרים על עצמם, גם כששני בני הזוג באמת רוצים בטובתו של הקשר.
              </p>
              <p>
                מתוך הניסיון הזה נולדה שיטת המפה הזוגית – דרך מובנית להבין מה מתרחש מתחת לפני השטח בקשר, לזהות את הדפוסים שמעצבים אותו ולגלות מה יכול לעזור לשני בני הזוג להתקרב ולהבין זה את זו טוב יותר.
              </p>
            </div>
            <div className="mt-8">
              <CTA>כן, אני רוצה מקום בשידור החינמי! ←</CTA>
            </div>
          </div>
        </div>
      </section>

      {/* 7. עדויות */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionTitle>עומק מקצועי, הסברים בהירים ותובנות שנשארות</SectionTitle>
          <TestimonialsGallery />
          <div className="mt-10 text-center">
            <CTA>כן, אני רוצה מקום בשידור החינמי! ←</CTA>
          </div>
        </div>
      </section>

      {/* 8. מתנה */}
      <section className="px-5 pb-20">
        <div className="bg-gift mx-auto grid max-w-5xl items-center gap-12 overflow-hidden rounded-[32px] px-6 py-14 text-on-dark shadow-card sm:px-12 md:grid-cols-[auto_1fr]">
          <div className="relative mx-auto w-56 sm:w-64">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2deg] rounded-2xl bg-on-dark/20" />
            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[0deg] rounded-2xl bg-on-dark/35" />
            <div className="relative flex aspect-[3/4] -rotate-[2.5deg] flex-col items-center justify-between rounded-2xl bg-brand-blue-deep p-6 text-center shadow-card ring-1 ring-on-dark/20">
              <Flower size={76} variant="light" />
              <div>
                <p className="text-xs font-bold tracking-widest text-on-dark/70">מדריך אישי</p>
                <p className="font-display-tight text-[6rem] leading-none text-brand-pink">5</p>
                <p className="text-lg font-extrabold leading-snug text-on-dark">השאלות שיחזירו אותך לעצמך</p>
              </div>
              <p className="text-xs text-on-dark/70">מאת יובל סודאי</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="font-bold text-brand-pink">🎁 מתנה למשתתפים שנשארים עד סוף המפגש</p>
            <h2 className="font-display-tight mt-3 text-5xl text-on-dark sm:text-6xl">
              מדריך "5 השאלות שיחזירו אותך לעצמך"
            </h2>
            <p className="mt-5 text-lg text-on-dark/90">
              כלי עבודה אישי שיובל משתמש בו עם לקוחות פרטיים. מדריך שנכתב בעריכה אישית של יובל, עם
              5 שאלות מדויקות שמחזירות בהירות בתוך הזוגיות — אותו תהליך שיובל מלמד בפגישות אישיות.
            </p>
            <p className="mt-5 inline-block rounded-full border border-on-dark/30 px-4 py-1.5 text-sm font-semibold">
              במתנה — ללא עלות · רק למי שצופה במפגש המלא עד הסוף
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
              <details key={q} className="group rounded-2xl bg-card px-6 py-4 shadow-soft">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-brand-blue">
                  {q}
                  <span className="text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. קריאה אחרונה */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl rounded-[32px] bg-brand-blue px-6 py-14 text-center text-on-dark shadow-card">
          <h2 className="font-display-tight text-5xl text-on-dark sm:text-6xl">
            הקשר שלכם ראוי לעוד אהבה וחמימות
          </h2>
          <p className="mt-4 text-lg text-on-dark/90">
            השאירו פרטים עכשיו, ותקבלו קישור אישי ותזכורת לפני המפגש.
          </p>
          <div className="mt-7">
            <MeetingPills dark />
          </div>
          <div className="mt-8">
            <CTA variant="pink">כן, אני רוצה מקום בשידור החינמי! ←</CTA>
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
            <p>Tovi Kablan - אסטרטגיה, ניהול קמפיין, עיצוב ופיתוח</p>
          </div>
        </div>
      </section>

      {/* 12. קהילה */}
      <section className="bg-brand-sage px-5 py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-right">
          <div>
            <h2 className="text-2xl font-extrabold">רוצים גם קהילה, לא רק מפגש אחד?</h2>
            <p className="mt-1">מצטרפים לקבוצת הוואטסאפ של יובל — תכנים ועדכונים שוטפים.</p>
          </div>
          <a
            href={WHATSAPP_URL}
            className="btn-pill shrink-0 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-primary-foreground"
          >
            להצטרפות לקבוצה ←
          </a>
        </div>
      </section>

      {/* 13. פוטר */}
      <footer className="px-5 pb-32 pt-8 text-center text-sm text-brand-clay">
        © יובל סודאי — פסיכותרפיה, ייעוץ זוגי ושיטת המפה הזוגית · עיצוב ובניית הדף: טובי קבלן
      </footer>

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
  );
}
