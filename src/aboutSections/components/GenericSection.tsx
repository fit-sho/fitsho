import ArrowRight from "@/assets/icons/ArrowRight.svg";
import { SectionDesc } from "@/components/SectionDesc";
import { SectionTitle } from "@/components/SectionTitle";

interface GenericSectionProps {
  title: string;
  description: string | JSX.Element;
  buttonText?: string;
  buttonLink?: string;
  image?: JSX.Element;
  bgGradient: string;
}
export const GenericSection = ({
  title,
  description,
  buttonText,
  buttonLink,
  image,
  bgGradient,
  reverse, // for reversing the order of image and text
}: GenericSectionProps & { reverse?: boolean }) => {
  return (
    <section className={`pt-8 pb-20 ${bgGradient} overflow-x-clip`}>
      <div className="container">
        {/* When the reverse prop is used this will change the image only for md size*/}
        <div
          className={`flex flex-col md:flex-row ${
            reverse ? "md:flex-row-reverse " : ""
          }`}
        >
          {/* When the reverse prop is used this will change the image up and down wise for phone*/}
          <div className="w-full md:w-1/2 px-6 order-2 md:order-none">
            {image && image}
          </div>
          <div className="w-full md:w-1/2 px-6 order-1 md:order-none">
            {buttonText && buttonLink && (
              <a href={buttonLink} className="hover:text-gray-600">
                <button className="btn btn-text gap-1 border border-[#222]/40">
                  <span>{buttonText}</span>
                  <ArrowRight className="h-5 w-5 fill-black" />
                </button>
              </a>
            )}
            <SectionTitle title={title} className="mt-6" />
            {typeof description === "string" ? (
              <SectionDesc description={description} className="mt-6" />
            ) : (
              <div className="mt-6">{description}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
