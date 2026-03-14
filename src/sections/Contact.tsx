import { useEffect, useRef, useState, useCallback, type ReactElement } from "react";
import emailjs from "@emailjs/browser";
import { useLang } from "../hooks/useLang";

// ─── ENV vars injected by Vite ─────────────────────────────────────────────
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 h
const LS_KEY = "lastEmailSent";

const EMAIL_REGEX = /^[\w.!#$%&'*+/=?^_`{|}~-]+@[\w-]+(\.\w+)+$/i;

// ─── Types ─────────────────────────────────────────────────────────────────
type SubjectOption = { value: string; label: string };
type Validations = {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  subjectRequired: string;
  messageRequired: string;
};
type ContactForm = {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  subjectOptions: SubjectOption[];
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
  spam: string;
  spamUnit: string;
  cooldownLabel: string;
  validations: Validations;
};
type Network = { id: string; label: string; url: string };
type Networks = { label: string; items: Network[] };
type Values = { name: string; email: string; subject: string; message: string };
type StatusKind = "idle" | "submitting" | "success" | "error" | "spam" | "cooldown";

// ─── Helper ────────────────────────────────────────────────────────────────
function formatCountdown(ms: number): string {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1_000);
  return [h, m, s].map(n => String(n).padStart(2, "0")).join(":");
}

// ─── Network icons (SVG) ───────────────────────────────────────────────────
const NETWORK_ICONS: Record<string, ReactElement> = {
  linkedin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  github: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
};

// ─── Component ─────────────────────────────────────────────────────────────
export default function Contact() {
  const { t } = useLang();
  const form = t<ContactForm>("contact.form");
  const networks = t<Networks>("contact.networks");

  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<Values>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<StatusKind>("idle");
  const [remaining, setRemaining] = useState(0);

  // ── On mount: check localStorage for cooldown ──────────────────────────
  useEffect(() => {
    const last = localStorage.getItem(LS_KEY);
    if (!last) return;
    const diff = Date.now() - parseInt(last, 10);
    if (diff < COOLDOWN_MS) {
      setRemaining(COOLDOWN_MS - diff);
      setStatus("cooldown");
    }
  }, []);

  // ── Countdown ticker ───────────────────────────────────────────────────
  useEffect(() => {
    if (status !== "cooldown" && status !== "spam") return;
    if (remaining <= 0) { setStatus("idle"); return; }

    const tick = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1000) { clearInterval(tick); setStatus("idle"); return 0; }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [status, remaining]);

  // ── Field change ──────────────────────────────────────────────────────
  const handleChange = useCallback(
    (field: keyof Values) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
        if (status === "success" || status === "error") setStatus("idle");
      },
    [errors, status]
  );

  // ── Validate ───────────────────────────────────────────────────────────
  function validate(): Partial<Record<keyof Values, string>> {
    const v = form.validations;
    const trim = (s: string) => s.trim();
    const err: Partial<Record<keyof Values, string>> = {};
    if (!trim(values.name)) err.name = v.nameRequired;
    if (!trim(values.email)) err.email = v.emailRequired;
    else if (!EMAIL_REGEX.test(trim(values.email))) err.email = v.emailInvalid;
    if (!values.subject) err.subject = v.subjectRequired;
    if (!trim(values.message)) err.message = v.messageRequired;
    return err;
  }

  // ── Submit ─────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const last = localStorage.getItem(LS_KEY);
    if (last) {
      const diff = Date.now() - parseInt(last, 10);
      if (diff < COOLDOWN_MS) {
        setRemaining(COOLDOWN_MS - diff);
        setStatus("spam");
        return;
      }
    }

    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus("submitting");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY);
      localStorage.setItem(LS_KEY, String(Date.now()));
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setRemaining(COOLDOWN_MS);
    } catch {
      setStatus("error");
    }
  }

  const isBusy = status === "submitting";
  const inCooldown = status === "cooldown";

  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="section__inner contact__inner">

        {/* ── Left: Copy + Networks (always visible) ───────────────────── */}
        <div className="contact__copy">
          <span className="section__kicker">{t("contact.kicker")}</span>
          <h2 id="contact-title" className="section__title">{t("contact.title")}</h2>
          <p className="section__subtitle">{t("contact.intro")}</p>

          <div className="contact__networks">
            <p className="contact__networks-label">{networks.label}</p>
            <ul className="contact__network-list">
              {networks.items.map(item => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    className="contact__network-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label}. ${t("common.externalNewTab")}`}
                    data-network={item.id}
                  >
                    <span className="contact__network-icon">
                      {NETWORK_ICONS[item.id] ?? null}
                    </span>
                    <span className="contact__network-text">{item.label}</span>
                    <span className="contact__network-arrow" aria-hidden>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right: Form OR Retro Cooldown ───────────────────────────── */}
        {inCooldown ? (
          <div className="contact-cooldown">
            <span className="contact-cooldown__icon">📭</span>
            <p className="contact-cooldown__label">{form.cooldownLabel}</p>
            <span className="contact-cooldown__timer" aria-live="polite">
              {formatCountdown(remaining)}
            </span>
          </div>
        ) : (
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div className="contact-form__field">
              <label htmlFor="contact-name">{form.nameLabel}</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                placeholder={form.namePlaceholder}
                autoComplete="name"
                disabled={isBusy}
                aria-describedby={errors.name ? "err-name" : undefined}
              />
              {errors.name && <p id="err-name" className="form-error" role="alert">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="contact-form__field">
              <label htmlFor="contact-email">{form.emailLabel}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                placeholder={form.emailPlaceholder}
                autoComplete="email"
                disabled={isBusy}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && <p id="err-email" className="form-error" role="alert">{errors.email}</p>}
            </div>

            {/* Subject */}
            <div className="contact-form__field">
              <label htmlFor="contact-subject">{form.subjectLabel}</label>
              <select
                id="contact-subject"
                name="subject"
                value={values.subject}
                onChange={handleChange("subject")}
                disabled={isBusy}
                aria-describedby={errors.subject ? "err-subject" : undefined}
                className={values.subject === "" ? "contact-form__select--placeholder" : ""}
              >
                <option value="" disabled>{form.subjectPlaceholder}</option>
                {form.subjectOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.subject && <p id="err-subject" className="form-error" role="alert">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div className="contact-form__field">
              <label htmlFor="contact-message">{form.messageLabel}</label>
              <textarea
                id="contact-message"
                name="message"
                value={values.message}
                onChange={handleChange("message")}
                placeholder={form.messagePlaceholder}
                rows={6}
                disabled={isBusy}
                aria-describedby={errors.message ? "err-message" : undefined}
              />
              {errors.message && <p id="err-message" className="form-error" role="alert">{errors.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`btn btn--primary contact-form__submit${isBusy ? " btn--loading" : ""}`}
              disabled={isBusy}
            >
              {isBusy ? (
                <>
                  <span className="contact-form__spinner" aria-hidden />
                  {form.submitting}
                </>
              ) : form.submit}
            </button>

            {/* Feedback */}
            {status === "success" && (
              <p className="contact-form__status contact-form__status--success" role="status" aria-live="polite">
                {form.success}
              </p>
            )}
            {status === "error" && (
              <p className="contact-form__status contact-form__status--error" role="alert">
                {form.error}
              </p>
            )}
            {status === "spam" && (
              <p className="contact-form__status contact-form__status--spam" role="alert" aria-live="polite">
                {form.spam}{" "}
                <strong className="contact-form__countdown">{formatCountdown(remaining)}</strong>
                {" "}{form.spamUnit}
              </p>
            )}

          </form>
        )}

      </div>
    </section>
  );
}
