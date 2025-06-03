"use client";
import { useState } from "react";
import ArrowRight from "@/assets/icons/ArrowRight.svg";
import { usePathname } from "next/navigation";
import Logo from "@/assets/images/logo-fitsho.png";
import Image from "next/image";
import MenuIconDark from "@/assets/icons/MenuIconDark.svg";
import LogoutButton from "@/components/LogoutButton";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      {pathname === "/" && (
        <div className="flex justify-center items-center bg-black text-sm text-white py-3 gap-5">
          <p className="text-neutral-100 hidden md:block ">
            Elevate your routine and maximize your performance
          </p>
          <div className="inline-flex gap-1 items-center mt-[2px] ">
            <a href="/login" className="hover:text-white/60 underline group">
              Get Started For Free
              <ArrowRight className="h-5 w-5 inline-flex justify-center items-center ml-0.5 fill-current group-hover:text-white/60" />
            </a>
          </div>
        </div>
      )}

      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <a href="/#" className="hover:scale-125">
              <Image src={Logo} alt="Fitsho Logo" height={40} width={40} />
            </a>
            <MenuIconDark
              className="h-5 w-5 md:hidden cursor-pointer"
              onClick={toggleMenu}
            />
            <nav className="hidden md:flex gap-5 lg:gap-12 text-black/60 items-center">
              <a href="#" className="hover-nav">
                Features
              </a>
              <a href="#" className="hover-nav">
                Updates
              </a>
              <a href="#" className="hover-nav">
                Learning Center
              </a>
              <a href="#" className="hover-nav">
                Pricing
              </a>
              <LogoutButton />

              <a
                className="bg-indigo-500 text-white px-10 py-3 
              rounded-lg font-bold inline-flex items-center justify-center tracking-tight btn-hover group"
                href="/login"
              >
                Login
                <ArrowRight className="h-7 w-6 inline-flex justify-center items-center ml-2 fill-current group-hover:text-white/60" />
              </a>
            </nav>
          </div>
          {/* Mobile menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-3 flex flex-col gap-4 text-black/60 items-center">
              <a href="/about">About</a>
              <a href="#">Features</a>
              <a href="#">Updates</a>
              <a href="#">Plans</a>
              <a href="#">Help</a>
              <a
                className="bg-indigo-500 text-white px-10 py-3 
              rounded-lg font-bold inline-flex items-center justify-center tracking-tight btn-hover group"
                href="/login"
              >
                Get Started
                <ArrowRight className="h-7 w-6 inline-flex justify-center items-center ml-2 fill-current group-hover:text-white/60" />
              </a>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
