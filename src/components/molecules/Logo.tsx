import Image from "@/components/atoms/Image";

export interface LogoProps {
    className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
    return (
        <Image
            className={`dark:invert ${className}`}
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
        />
    );
}
