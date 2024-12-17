"use client";
import { useState } from "react";
import ArrowRight from "@/assets/icons/ArrowRight.svg";
import Logo from "@/assets/images/logo-fitsho.png";
import Image from "next/image";
import MenuIconDark from "@/assets/icons/MenuIconDark.svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center bg-black text-sm text-white py-3 gap-10">
        <p className="text-white/60 hidden md:block ">
          Elevate your routine and maximize your performance
        </p>
        <div className="inline-flex gap-1 items-center">
          <a href="/login" className="hover:text-white/60">
            Get Started For Free
            <ArrowRight className="h-5 w-5 inline-flex justify-center items-center" />
          </a>
        </div>
      </div>
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
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="/about" className="hover-nav">
                About
              </a>
              <a href="#" className="hover-nav">
                Features
              </a>
              <a href="#" className="hover-nav">
                Updates
              </a>
              <a href="#" className="hover-nav">
                Plans
              </a>
              <a href="#" className="hover-nav">
                Help
              </a>
              <a href="/login" className="">
                <button
                  className="bg-black text-white px-4 py-2 
              rounded-lg font-medium inline-flex items-center justify-center tracking-tight btn-hover"
                >
                  Get for free
                </button>
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
              <button
                className="bg-black text-white px-4 py-2 
              rounded-lg font-medium inline-flex items-center justify-center tracking-tight"
              >
                Get Started
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
