import dumbell from "@/assets/images/dumbbell_no_background.png";
import Image from "next/image";
import ArrowRight from "@/assets/icons/ArrowRight.svg";

export const Hero = () => {
  return (
    <section className="pt-8 pb-20 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_80%)] overflow-x-clip">
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="text-sm md:text-base lg:text-lg inline-flex border border-[#222]/25 px-3 py-1 md:px-4 md:py-2 lg:px-5 lg:py-3 rounded-lg tracking-tight">
              Test the Beta version now!
            </div>
            <h1 className="text-5xl md:text-7xl font-bold md:font-extrabold tracking-tighter bg-gradient-to-t from-[#002121] to-[#001E80] text-transparent bg-clip-text mt-6">
              Fitsho Fitness App
            </h1>
            <p className="text-xl text-[#010D3E] md:text-2xl lg:text-3xl tracking-tight mt-6">
              Discover personalized workouts, nutrition tips, and daily
              motivation to reach your fitness goals. Fitsho is your companion
              in achieving a healthier, stronger, and more confident version of
              yourself.
            </p>
            <div className="flex gap-4 items-center mt-[30px]">
              <button className="btn btn-primary ">Get Started</button>
              <button className="btn btn-text gap-1 border border-[#222]/10">
                <span>Learn More</span>
                <ArrowRight className="h-5 w-5 fill-black" />
              </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[300px] lg:h-[478px] md:flex-1 relative">
            <Image
              src={dumbell}
              alt="Dumbell"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-1 rotate-[-5deg]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
