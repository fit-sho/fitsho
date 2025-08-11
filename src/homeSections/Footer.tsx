import logo from "@/assets/images/logo-fitsho.png";
import Image from "next/image";
import SocialInsta from "@/assets/icons/socialIcons/social-insta.svg";
import SocialLinkedin from "@/assets/icons/socialIcons/social-linkedin.svg";
import SocialYoutube from "@/assets/icons/socialIcons/social-youtube.svg";

export const Footer = () => {
  return (
    <footer className="bg-black py-10 text-center text-sm text-[#BCBCBC]">
      <div className="container">
        <div className="relative inline-flex before:absolute before:bottom-0 before:top-2 before:w-full before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:blur before:content-['']">
          <a href="#">
            <Image
              src={logo}
              alt="Fitsho Logo"
              height={40}
              className="relative"
            />
          </a>
        </div>
        <nav className="mt-6 flex flex-col gap-6 md:flex-row md:justify-center">
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Customers</a>
          <a href="#">Pricing</a>
          <a href="#">Help</a>
          <a href="#">Careers</a>
        </nav>
        <div className="mt-6 flex justify-center gap-6">
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
        <p className="mt-6">&copy; 2025 FitSho, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};
