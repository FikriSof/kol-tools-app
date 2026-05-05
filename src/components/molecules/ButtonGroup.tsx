import Image from "@/components/atoms/Image";
import Link from "@/components/atoms/Link";

export default function ButtonGroup() {
  return (
    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
      <Link
        variant="primary"
        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={16}
          height={16}
        />
        Deploy Now
      </Link>
      <Link
        variant="outline"
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Documentation
      </Link>
    </div>
  );
}
