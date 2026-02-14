import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import Logo from "@/components/molecules/Logo";
import ButtonGroup from "@/components/molecules/ButtonGroup";

export default function Hero() {
    return (
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <Logo />
            <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                <Heading level={1} className="max-w-xs">
                    To get started, edit the page.tsx file.
                </Heading>
                <Text variant="large" muted className="max-w-md">
                    Looking for a starting point or more instructions? Head over to{" "}
                    <a
                        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        className="font-medium text-zinc-950 dark:text-zinc-50"
                    >
                        Templates
                    </a>{" "}
                    or the{" "}
                    <a
                        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                        className="font-medium text-zinc-950 dark:text-zinc-50"
                    >
                        Learning
                    </a>{" "}
                    center.
                </Text>
            </div>
            <ButtonGroup />
        </main>
    );
}
