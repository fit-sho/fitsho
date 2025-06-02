import { twMerge } from "tailwind-merge";

export const SectionTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h2
      className={twMerge(
        "text-4xl md:text-[54px] leading-[42px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-t from-[#002121] to-[#001E80] text-transparent bg-clip-text pb-2",
        className
      )}
    >
      {title}
    </h2>
  );
};
