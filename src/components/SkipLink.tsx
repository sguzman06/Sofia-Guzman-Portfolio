import { useLang } from "../hooks/useLang";

type Props = {
  target: string;
};

export default function SkipLink({ target }: Props) {
  const { t } = useLang();
  return (
    <a className="skip-link" href={target}>
      {t("common.skipLink")}
    </a>
  );
}
