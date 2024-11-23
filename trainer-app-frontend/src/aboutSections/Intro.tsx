import ArrowRight from "@/assets/icons/ArrowRight.svg";

export const Intro = () => {
  return (
    <section className="pt-8 pb-20 bg-[radial-gradient(ellipse_250%_100%_at_bottom_left,#183EC2,#EAEEFE_45%)] overflow-x-clip">
      <div className="container">
        <div className="">
          <div className="md:flex items-center">
            <div className="md:w-[478px]">
              <a href="/#" className="hover:text-gray-600">
                <button className="btn btn-text gap-1 border border-[#222]/40">
                  <span>Get Started Now!</span>
                  <ArrowRight className="h-5 w-5 fill-black" />
                </button>
              </a>
              <h1 className="h1tags mt-6">About Us</h1>
              <p className="ptags mt-6">
                We're FitSho. We're here to help you achieve your fitness goals.{" "}
                <br />
                <br />
                Our app is designed to help you track your progress and stay
                motivated. We're here to help you become a healthier, stronger
                you.
                <br />
                Fitsho is created by a team of fitness enthusiasts who are here
                to help you achieve your fitness goals.
                <br />
                <br />
                This app is originally designed by{" "}
                <a
                  href="https://github.com/A-Shalchian"
                  className="underline hover:text-gray-300"
                >
                  Arash Shalchian{" "}
                </a>
                , and developed by a team of developers.
              </p>
            </div>
            <div>{/* Place for image*/}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
