"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition, useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
    defaultValue?: string;
    placeholder?: string;
    className?: string;
}

export function SearchInput({ defaultValue = "", placeholder, className }: SearchInputProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [, startTransition] = useTransition();
    const [value, setValue] = useState(defaultValue);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value;
        setValue(newValue);

        const params = new URLSearchParams();
        if (newValue) params.set("search", newValue);
        params.set("page", "1");

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`);
        });
    }

    return (
        <Input
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={className}
        />
    );
}
