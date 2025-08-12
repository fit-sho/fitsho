import logo from "@/assets/images/logo-fitsho.png";
import Image from "next/image";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

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
          <a href="/features">Features</a>
          <a href="#">Customers</a>
          <a href="#">Pricing</a>
          <a href="#">Help</a>
          <a href="#">Careers</a>
        </nav>
        <div className="mt-6 flex justify-center gap-6">
          <a href="https://www.instagram.com/ilestarash/">
            <FaInstagram className="h-5 w-5" aria-label="Instagram" />
          </a>
          <a href="https://www.linkedin.com/in/arash-shalchian-230b06268/">
            <FaLinkedin className="h-5 w-5" aria-label="LinkedIn" />
          </a>
          <a href="https://www.youtube.com/@arashshalchian">
            <FaYoutube className="h-5 w-5" aria-label="YouTube" />
          </a>
        </div>
        <p className="mt-6">&copy; 2025 FitSho, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};
