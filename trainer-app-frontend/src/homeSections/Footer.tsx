import logo from "@/assets/images/logo-fitsho.png";
import Image from "next/image";
import SocialInsta from "@/assets/icons/social-insta.svg";
import SocialLinkedin from "@/assets/icons/social-linkedin.svg";
import SocialYoutube from "@/assets/icons/social-youtube.svg";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:blur  before:w-full before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute">
          <a href="#">
            <Image
              src={logo}
              alt="Fitsho Logo"
              height={40}
              className="relative"
            />
          </a>
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Customers</a>
          <a href="#">Pricing</a>
          <a href="#">Help</a>
          <a href="#">Careers</a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <a href="https://www.instagram.com/ilestarash/">
            <SocialInsta />
          </a>
          <a href="https://www.linkedin.com/in/arash-shalchian-230b06268/">
            <SocialLinkedin />
          </a>
          <a href="https://www.youtube.com/@arashshalchian">
            <SocialYoutube />
          </a>
        </div>
        <p className="mt-6">&copy; 2024 FitSho, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};
