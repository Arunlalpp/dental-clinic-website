import RevealText from "./RevealText";

interface Props {
  eyebrow?: string;
  lines: string[];
  className?: string;
  headingClassName?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  lines,
  className = "",
  headingClassName = "",
  align = "left",
}: Props) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="mb-5 font-mono text-eyebrow uppercase text-pink">{eyebrow}</p>
      )}
      <RevealText
        as="h2"
        lines={lines}
        className={`font-display text-display-md uppercase text-ink ${headingClassName}`}
      />
    </div>
  );
}
