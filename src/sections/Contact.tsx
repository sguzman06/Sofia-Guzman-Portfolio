import { useRef, useState } from "react";
import { useLang } from "../hooks/useLang";

type ContactForm = {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  subject: string;
  bodyTemplate: string;
  mailto: string;
  success: string;
  error: string;
  validations: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
  };
  fallbackLabel: string;
  fallbackCta: string;
};

type Network = {
  id: string;
  label: string;
  url: string;
};

type Networks = {
  label: string;
  items: Network[];
};

type Values = {
  name: string;
  email: string;
  message: string;
};

const EMAIL_REGEX = /^[\w.!#$%&'*+/=?^_`{|}~-]+@[\w-]+(\.[\w-]+)+$/i;

export default function Contact(){
  const { t } = useLang();
  const form = t<ContactForm>("contact.form");
  const networks = t<Networks>("contact.networks");

  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (field: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const replaceTemplate = (template: string, data: Values) =>
    template
      .replaceAll("{name}", data.name.trim())
      .replaceAll("{email}", data.email.trim())
      .replaceAll("{message}", data.message.trim());

  const focusField = (field: keyof Values) => {
    if (field === "name") {
      nameRef.current?.focus();
    } else if (field === "email") {
      emailRef.current?.focus();
    } else {
      messageRef.current?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed: Values = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };
    const nextErrors: Partial<Record<keyof Values, string>> = {};
    if (!trimmed.name) {
      nextErrors.name = form.validations.nameRequired;
    }
    if (!trimmed.email) {
      nextErrors.email = form.validations.emailRequired;
    } else if (!EMAIL_REGEX.test(trimmed.email)) {
      nextErrors.email = form.validations.emailInvalid;
    }
    if (!trimmed.message) {
      nextErrors.message = form.validations.messageRequired;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.name) {
        focusField("name");
      } else if (nextErrors.email) {
        focusField("email");
      } else if (nextErrors.message) {
        focusField("message");
      }
      return;
    }

    const body = encodeURIComponent(replaceTemplate(form.bodyTemplate, trimmed));
    const subject = encodeURIComponent(form.subject);
    const href = `${form.mailto}?subject=${subject}&body=${body}`;
    try {
      window.location.href = href;
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="section__inner contact__inner">
        <div className="contact__copy">
          <span className="section__kicker">{t("contact.kicker")}</span>
          <h2 id="contact-title" className="section__title">{t("contact.title")}</h2>
          <p className="section__subtitle">{t("contact.intro")}</p>
          <div className="contact__networks">
            <p className="contact__networks-label">{networks.label}</p>
            <ul className="contact__network-list">
              {networks.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    className="contact__network-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label}. ${t("common.externalNewTab")}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form__field">
            <label htmlFor="contact-name">{form.nameLabel}</label>
            <input
              id="contact-name"
              ref={nameRef}
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange("name")}
              placeholder={form.namePlaceholder}
              autoComplete="name"
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name && (
              <p id="contact-name-error" className="form-error" role="alert">{errors.name}</p>
            )}
          </div>
          <div className="contact-form__field">
            <label htmlFor="contact-email">{form.emailLabel}</label>
            <input
              id="contact-email"
              ref={emailRef}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange("email")}
              placeholder={form.emailPlaceholder}
              autoComplete="email"
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="form-error" role="alert">{errors.email}</p>
            )}
          </div>
          <div className="contact-form__field">
            <label htmlFor="contact-message">{form.messageLabel}</label>
            <textarea
              id="contact-message"
              ref={messageRef}
              name="message"
              value={values.message}
              onChange={handleChange("message")}
              placeholder={form.messagePlaceholder}
              rows={6}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
            />
            {errors.message && (
              <p id="contact-message-error" className="form-error" role="alert">{errors.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn--primary contact-form__submit">{form.submit}</button>
          <p className="contact-form__status" aria-live="polite">
            {status === "success" && form.success}
            {status === "error" && form.error}
          </p>
          <p className="contact-form__fallback">
            {form.fallbackLabel}{" "}
            <a href={form.mailto} className="contact-form__fallback-link">{form.fallbackCta}</a>
          </p>
        </form>
      </div>
    </section>
  );
}
