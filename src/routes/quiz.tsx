import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { Flower } from "@/components/landing/Flower";
import { RegistrationForm } from "@/components/landing/RegistrationForm";
import { Button } from "@/components/ui/button";
import yuvalPhoto from "@/assets/yuval-workshop.jpeg.asset.json";
import { calculateQuizScore, getQuizResult, quizQuestions, type QuizGender } from "@/lib/relationship-quiz";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "איפה הזוגיות שלכם ממש עומדת? — שאלון עם יובל סודאי" },
      { name: "description", content: "חמש שאלות על הקשר שלכם, תובנה אישית והזמנה לשידור החינמי ממריבה לקרבה עם יובל סודאי, 18.11.2026 בשעה 20:30 בזום." },
      { property: "og:title", content: "איפה הזוגיות שלכם ממש עומדת? — שאלון עם יובל סודאי" },
      { property: "og:description", content: "שאלון זוגיות קצר על תקשורת, נראות וחיבור, בדרך לממריבה לקרבה עם יובל סודאי." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RelationshipQuiz,
});

const genderOptions: { value: QuizGender; label: string }[] = [
  { value: "woman", label: "אישה" },
  { value: "man", label: "גבר" },
  { value: "neutral", label: "פנייה ניטרלית" },
];

function RelationshipQuiz() {
  const [gender, setGender] = useState<QuizGender | null>(null);
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<number[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const score = calculateQuizScore(answers);
  const result = step === quizQuestions.length && score !== null ? getQuizResult(score) : null;
  const question = step >= 0 && step < quizQuestions.length ? quizQuestions[step] : undefined;
  const currentAnswer = answers[step];

  useEffect(() => {
    if (step >= 0) heading.current?.focus();
  }, [step]);

  function restart() {
    setAnswers([]);
    setStep(-1);
    setGender(null);
  }

  const visibilityTitle = gender === "woman"
    ? "עד כמה את מרגישה שבן או בת הזוג באמת רואים אותך?"
    : gender === "man"
      ? "עד כמה אתה מרגיש שבן או בת הזוג באמת רואים אותך?"
      : question?.title;
  const resultIntro = gender === "woman" ? "מהתשובות שלך עולה:" : gender === "man" ? "מהתשובות שלך עולה:" : "מהתשובות שלכם עולה:";

  return (
    <main className="min-h-svh bg-background">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-5">
        <Link to="/" className="flex items-center gap-2 font-bold text-brand-blue"><Flower size={30} />יובל סודאי</Link>
        <span className="text-sm text-brand-clay">המפה הזוגית</span>
      </header>
      <section className="mx-auto max-w-3xl px-5 pb-12 pt-7 text-center sm:pt-10">
        <Flower size={48} className="mx-auto mb-5" />
        <h1 className="font-display-tight text-5xl sm:text-7xl">איפה הזוגיות שלכם ממש עומדת?</h1>
        <p className="mt-4 text-lg text-brand-clay">תקשורת. נראות. חיבור. רגע לעצור ולהתבונן בקשר שלכם.</p>
      </section>

      <section aria-label="שאלון זוגיות" className="mx-auto max-w-3xl px-5 pb-16">
        {step === -1 && (
          <div className="border-y border-border py-8 sm:py-10">
            <h2 ref={heading} tabIndex={-1} className="text-center text-2xl font-bold outline-none">איך לפנות אליך?</h2>
            <div role="group" aria-label="בחירת מגדר" className="mt-6 grid gap-3 sm:grid-cols-3">
              {genderOptions.map((option) => (
                <Button key={option.value} variant="outline" aria-pressed={gender === option.value} onClick={() => setGender(option.value)} className={`h-auto min-h-14 whitespace-normal text-base ${gender === option.value ? "border-brand-blue bg-brand-sage text-brand-blue" : "bg-card text-brand-ink"}`}>
                  {gender === option.value && <Check aria-hidden="true" />}{option.label}
                </Button>
              ))}
            </div>
            <div className="mt-8 text-center"><Button disabled={gender === null} onClick={() => setStep(0)} className="btn-pill h-auto max-w-full whitespace-normal shadow-soft">מתחילים <ArrowLeft aria-hidden="true" /></Button></div>
          </div>
        )}

        {question && (
          <div className="border-y border-border py-7 sm:py-10">
            <div className="mb-7 flex items-center justify-between gap-4">
              <p className="shrink-0 text-sm font-semibold text-brand-clay">שאלה {step + 1} מתוך 5</p>
              <div className="flex gap-2" aria-label={`${step} מתוך 5 שאלות הושלמו`}>
                {quizQuestions.map((_, index) => <span key={index} className={`h-1.5 w-7 rounded-full sm:w-10 ${index < step ? "bg-brand-blue" : index === step ? "bg-brand-pink" : "bg-border"}`} />)}
              </div>
            </div>
            <h2 ref={heading} tabIndex={-1} className="min-h-20 text-2xl font-bold leading-snug outline-none sm:text-3xl">{step === 1 ? visibilityTitle : question.title}</h2>
            <div role="group" aria-label="בחירת תשובה" className="mt-6 grid gap-3">
              {question.answers.map((answer, index) => (
                <Button key={index} variant="outline" aria-pressed={currentAnswer === index} onClick={() => setAnswers((previous) => { const next = [...previous]; next[step] = index; return next; })} className={`h-auto min-h-20 justify-start gap-4 whitespace-normal px-5 py-4 text-right text-base leading-relaxed shadow-soft ${currentAnswer === index ? "border-brand-blue bg-brand-sage text-brand-blue" : "bg-card text-brand-ink"}`}>
                  <span aria-hidden="true" className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${currentAnswer === index ? "border-brand-blue bg-brand-blue text-primary-foreground" : "border-input"}`}>{currentAnswer === index && <Check />}</span>
                  <span>{answer}</span>
                </Button>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between gap-3">
              <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-brand-clay"><ArrowRight aria-hidden="true" />חזרה</Button>
              <Button disabled={currentAnswer === undefined} onClick={() => setStep(step + 1)} className="btn-pill h-auto whitespace-normal px-6 shadow-soft">{step === 4 ? "לתוצאה שלי" : "לשאלה הבאה"}<ArrowLeft aria-hidden="true" /></Button>
            </div>
          </div>
        )}

        {result && (
          <div>
            <div className="border-y border-border py-8 text-center">
              <p className="text-brand-clay">{resultIntro}</p>
              <h2 ref={heading} tabIndex={-1} className="font-display-tight mt-3 text-5xl outline-none sm:text-6xl">{result.title}</h2>
              <p className="mt-4 font-bold text-brand-blue">הציון שלך: <span dir="ltr">{score} / 20</span></p>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brand-ink">{result.insight}</p>
              <p className="mt-5 text-sm text-brand-clay">התוצאה מבוססת על ההתרשמות שלך ואינה אבחון או תחליף לייעוץ מקצועי.</p>
              <Button variant="ghost" onClick={restart} className="mt-4 text-brand-clay"><RotateCcw aria-hidden="true" />מילוי מחדש</Button>
            </div>
            <div className="py-10">
              <div className="flex items-center gap-5">
                <img src={yuvalPhoto.url} alt="יובל סודאי מוסר סדנה" className="size-24 shrink-0 rounded-full object-cover shadow-soft sm:size-28" />
                <div><p className="font-semibold text-brand-clay">שידור עם יובל סודאי</p><h2 className="font-display-tight mt-1 text-5xl sm:text-6xl">ממריבה לקרבה</h2></div>
              </div>
              <p className="mt-6 text-lg leading-relaxed">איך אומרים את מה שחשוב לנו — ומרגישים אהובים? מפגש על המפה הזוגית, המעגל שביניכם והדרך לשמוע ולהשמיע.</p>
              <ul className="mt-5 flex flex-wrap gap-3 text-base font-semibold text-brand-blue"><li>יום רביעי · 18.11.2026</li><li>20:30</li><li>בזום</li><li className="text-brand-clay">ללא עלות</li></ul>
            </div>
            <h2 className="mb-5 text-center text-2xl font-bold">נפגשים בממריבה לקרבה</h2>
            <RegistrationForm source="quiz" />
          </div>
        )}
      </section>
      <footer className="border-t border-border px-5 py-6 text-center text-sm text-brand-clay"><Button asChild variant="link" className="h-auto whitespace-normal text-brand-blue"><Link to="/">לשידור ממריבה לקרבה</Link></Button></footer>
    </main>
  );
}