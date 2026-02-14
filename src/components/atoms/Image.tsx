import NextImage, { type ImageProps as NextImageProps } from "next/image";

export interface ImageProps extends NextImageProps {
    className?: string;
}

export default function Image({ className = "", ...props }: ImageProps) {
    return <NextImage className={className} {...props} />;
}
