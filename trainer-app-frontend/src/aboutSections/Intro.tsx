import { GenericSection } from "./components/GenericSection";

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
    />
  );
};
