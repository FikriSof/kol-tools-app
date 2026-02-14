import type { AnchorHTMLAttributes, ReactNode } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: "primary" | "secondary" | "outline";
    children: ReactNode;
}

export default function Link({
    variant = "primary",
    children,
    className = "",
    ...props
}: LinkProps) {
    const baseStyles =
        "flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-base font-medium transition-colors md:w-[158px]";

    const variantStyles = {
        primary:
            "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]",
        secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
        outline:
            "border border-solid border-black/[.08] hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]",
    };

    return (
        <a
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </a>
    );
}
