import { twMerge } from "tailwind-merge";

export const SectionDesc = ({
  description,
  className,
}: {
  description: string;
  className?: string;
}) => {
  return (
    <p
      className={twMerge(
        "text-[26px] md:text-3xl lg:text-4xl leading-[30px] tracking-tight text-[#010D3E]",
        className
      )}
    >
      {description}
    </p>
  );
};
