import type { ElementType, HTMLAttributes, ReactNode } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

export default function Heading({
  level = 1,
  children,
  className = "",
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as ElementType;

  const levelStyles = {
    1: "text-3xl font-semibold leading-10 tracking-tight",
    2: "text-2xl font-semibold leading-9 tracking-tight",
    3: "text-xl font-semibold leading-8 tracking-tight",
    4: "text-lg font-semibold leading-7",
    5: "text-base font-semibold leading-6",
    6: "text-sm font-semibold leading-5",
  };

  return (
    <Tag
      className={`${levelStyles[level]} text-black dark:text-zinc-50 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
