import { GenericSection } from "./components/GenericSection";
import introimg from "@/assets/images/aboutImages/img.jpg";
import Image from "next/image";

export const Intro = () => {
  return (
    <GenericSection
      title="About Us"
      description={
        <p className="text-[22px] md:text-2xl lg:text-3xl leading-[30px] tracking-tight text-[#010D3E]">
          We're FitSho. We're here to help you achieve your fitness goals.
          <br />
          <br />
          Our app is designed to help you track your progress and stay
          motivated. We're here to help you become a healthier, stronger you.
          <br />
          Fitsho is created by a team of fitness enthusiasts who are here to
          help you achieve your fitness goals.
          <br />
          <br />
          This app is originally designed by{" "}
          <a
            href="https://github.com/A-Shalchian"
            className="underline hover:text-gray-300"
          >
            Arash Shalchian
          </a>
          , and developed by a team of developers.
        </p>
      }
      bgGradient="bg-[radial-gradient(ellipse_250%_100%_at_bottom_right,#183EC2,#EAEEFE_45%)]"
      // image={
      //   <div
      //     className="flex flex-col md:flex-row
      //    items-start md:items-start mt-5"
      //   >
      //     <div className="w-full flex justify-center md:justify-end md:ml-[250px]">
      //       <Image
      //         src={introimg}
      //         alt="Introduction to FitSho"
      //         className="rounded-lg shadow-lg mt-10"
      //         width={550}
      //         height={300}
      //       />
      //     </div>
      //   </div>
      // }
      reverse
    />
  );
};
