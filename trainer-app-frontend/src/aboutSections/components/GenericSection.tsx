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
}: GenericSectionProps) => {
  return (
    <section className={`pt-8 pb-20 ${bgGradient} overflow-x-clip`}>
      <div className="container">
        <div className="">
          <div className="md:flex items-center">
            <div className="md:w-[478px]">
              {/* Render button if text and link are provided */}
              {buttonText && buttonLink && (
                <a href={buttonLink} className="hover:text-gray-600">
                  <button className="btn btn-text gap-1 border border-[#222]/40">
                    <span>{buttonText}</span>
                    <ArrowRight className="h-5 w-5 fill-black" />
                  </button>
                </a>
              )}

              {/* Render title */}
              <SectionTitle title={title} className="mt-6" />
              {/* Render SectionDesc only if description is a string */}
              {typeof description === "string" && (
                <SectionDesc description={description} className="mt-6" />
              )}
              {/* Render JSX description if provided */}
              {typeof description !== "string" && (
                <div className="mt-6">{description}</div>
              )}
            </div>
            <div>{image && image}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
