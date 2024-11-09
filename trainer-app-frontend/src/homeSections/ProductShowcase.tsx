import Image from "next/image";
import productImage from "@/assets/images/product-image.png";
import pyramidImage from "@/assets/images/pyramid.png";
import starImage from "@/assets/images/star.png";
import tubeImage from "@/assets/images/tube.png";

export const ProductShowcase = () => {
  return (
    <section className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip">
      <div className="container">
        <div className="max-w-[540px] mx-auto">
          <div className="flex justify-center">
            <div className="tag">Boost your Productivty</div>
          </div>
          <h2
            className="text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter 
          bg-gradient-to-t from-[#002121] to-[#001E80] text-transparent bg-clip-text mt-5"
          >
            A more effective way to track progress
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            Effortlessly track your progress and stay motivated with our fully
            functional, responsive and user-friendly fitness app. Fitsho is your
            companion in achieving a healthier, stronger life.
          </p>
        </div>
        <div className="relative">
          <Image src={productImage} alt="Product Showcase" className="mt-10" />
          <Image
            src={pyramidImage}
            alt="Pyramid Image"
            className="hidden md:block absolute -right-36 -top-32 "
            height={262}
            width={262}
          />
          <Image
            src={tubeImage}
            alt="Tube Image"
            className="hidden md:block absolute bottom-24 -left-36"
            height={248}
            width={248}
          />
        </div>
      </div>
    </section>
  );
};
