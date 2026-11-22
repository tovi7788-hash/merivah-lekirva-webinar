import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import yuvalLogo from "@/assets/yuval-logo.png.asset.json";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// הוובינר של 18.11 הסתיים. להחליף בקישור ההרשמה לוובינר של 25.11 ואז להחזיר את הכפתור.
const ZOOM_REGISTER_URL = "https://us06web.zoom.us/webinar/register/WN_yGDggiizS7S9jJhc3S7GwA";
const WHATSAPP_URL = "https://chat.whatsapp.com/Kh9aZcX6IkRE6XYOl8tFf4";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "תודה שנרשמתם — ממריבה לקרבה עם יובל סודאי" },
      { name: "description", content: "הרשמתכם לשידור ממריבה לקרבה התקבלה. נפגשים בזום ביום רביעי 25.11.2026 בשעה 20:30." },
      { property: "og:title", content: "תודה שנרשמתם — ממריבה לקרבה עם יובל סודאי" },
      { property: "og:description", content: "נפגשים בזום ביום רביעי 25.11.2026 בשעה 20:30. הצטרפו לקבוצת הוואטסאפ של יובל." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_location: window.location.href,
        page_title: document.title,
        page_path: "/thank-you",
      });
      window.gtag("event", "generate_lead", {
        event_category: "webinar_registration",
        event_label: "ממריבה לקרבה",
      });
    }
    // TODO: כשיהיה Google Ads Conversion ID + Label (AW-XXXXXXX/XXXXXXXXXXX),
    // להוסיף כאן עוד קריאה: gtag('event', 'conversion', { send_to: 'AW-XXXXXXX/XXXXXXXXXXX' });
  }, []);

  return (
    <main className="flex min-h-svh flex-col bg-background">
      <header className="border-b border-border px-6 py-5">
        <Link to="/" className="mx-auto flex max-w-6xl items-center gap-3 font-bold text-brand-blue">
          <img
            src={yuvalLogo.url}
            alt="יובל סודאי — פסיכותרפיסט ויועץ זוגי מוסמך"
            className="h-12 w-auto sm:h-14"
          />
        </Link>
      </header>
      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:py-24">
        <img
          src={yuvalLogo.url}
          alt="יובל סודאי — פסיכותרפיסט ויועץ זוגי מוסמך"
          className="mb-6 h-28 w-auto sm:h-32"
        />
        <h1 className="font-display-tight text-5xl sm:text-7xl">איזה יופי שנרשמתם! 🎉</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">
          קיבלנו את הפרטים שלכם. לחצו למטה כדי להשלים את ההרשמה בזום — ותקבלו גם תזכורת לפני המועד בוואטסאפ.
        </p>
        <Button
          asChild
          className="btn-pill mt-6 h-auto w-full max-w-md whitespace-normal bg-brand-blue px-8 py-5 text-lg font-bold text-on-dark shadow-card hover:bg-brand-blue-deep"
        >
          <a href={ZOOM_REGISTER_URL} target="_blank" rel="noopener noreferrer">
            השלימו את ההרשמה בזום ←
          </a>
        </Button>
        <ul className="mt-8 flex flex-wrap justify-center gap-2.5 text-[0.95rem] font-semibold">
          {["📅 יום רביעי | 25.11.2026 (ט״ו כסלו)", "🕣 בשעה 20:30", "💻 בזום, מהבית"].map((detail) => (
            <li key={detail} className="rounded-full border border-border bg-card px-4 py-2 text-brand-blue shadow-soft">
              {detail}
            </li>
          ))}
        </ul>
        <div className="mt-10 w-full max-w-xl rounded-2xl border border-border bg-card px-6 py-7 text-center shadow-soft">
          <p className="text-lg font-bold leading-relaxed text-brand-blue sm:text-xl">
            קישור הכניסה האישי שלך יישלח אליך בוואטסאפ ובמייל
          </p>
          <p className="mt-2 text-sm leading-relaxed text-brand-clay sm:text-base">
            אין צורך לעשות שום דבר נוסף כרגע.
          </p>
        </div>
        {/* WhatsApp — הכפתור הראשי בשורה: solid ובולט, מעל הקישורים המשניים */}
        <Button
          asChild
          className="btn-pill mt-8 h-auto w-full max-w-md whitespace-normal bg-whatsapp-deep px-8 py-5 text-lg font-bold text-on-dark shadow-card hover:brightness-95"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            הצטרפו לקבוצת הוואטסאפ ←
          </a>
        </Button>
        {/* קישורים משניים — outline, פחות בולטים */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
          <Button
            asChild
            variant="outline"
            className="btn-pill h-auto px-5 py-2.5 text-sm border-brand-pink text-brand-pink-deep hover:bg-brand-pink-soft"
          >
            <a href="https://lev-good.github.io/Subscribe-to-the-Yuval-Sudai-newsletter/" target="_blank" rel="noopener noreferrer">
              הצטרפו לרשימת התפוצה במייל ←
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="btn-pill h-auto px-5 py-2.5 text-sm text-brand-blue hover:bg-brand-cream"
          >
            <a href="https://www.youtube.com/channel/UCfHMlvKDkMKrEh-obzm78cw" target="_blank" rel="noopener noreferrer">
              עקבו ביוטיוב ←
            </a>
          </Button>
        </div>
        <Button asChild variant="link" className="mt-5 h-auto text-base text-brand-blue">
          <Link to="/">חזרה לעמוד הראשי</Link>
        </Button>
      </section>
      <footer className="border-t border-border px-5 py-8 text-center text-sm text-brand-clay">
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
      </footer>
    </main>
  );
}