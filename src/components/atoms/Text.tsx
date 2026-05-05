import type { HTMLAttributes, ReactNode } from "react";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "small" | "large";
  muted?: boolean;
  children: ReactNode;
}

export default function Text({
  variant = "body",
  muted = false,
  children,
  className = "",
  ...props
}: TextProps) {
  const variantStyles = {
    large: "text-lg leading-8",
    body: "text-base leading-7",
    small: "text-sm leading-6",
  };

  const colorStyles = muted
    ? "text-zinc-600 dark:text-zinc-400"
    : "text-zinc-900 dark:text-zinc-100";

  return (
    <p
      className={`${variantStyles[variant]} ${colorStyles} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
