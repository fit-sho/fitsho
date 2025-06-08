"use client";
import { useState, useEffect } from "react";
import ArrowRight from "@/assets/icons/ArrowRight.svg";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/assets/images/logo-fitsho.png";
import Image from "next/image";
import MenuIconDark from "@/assets/icons/MenuIconDark.svg";
import Link from "next/link";
import { supabase } from "@/utils/supabase";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const pathname = usePathname();
  const router = useRouter();
  
  // Check authentication status
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setStatus(data.session ? "authenticated" : "unauthenticated");
      
      // Set up auth state listener
      const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
        setSession(newSession);
        setStatus(newSession ? "authenticated" : "unauthenticated");
      });
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    checkSession();
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
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
              
              {status === "authenticated" ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2"
                  >
                    {session?.user?.user_metadata?.avatar_url ? (
                      <div className="relative w-8 h-8">
                        <Image
                          src={session.user.user_metadata.avatar_url}
                          alt={session.user.user_metadata?.full_name || "User"}
                          fill
                          sizes="32px"
                          className="rounded-full object-cover"
                          quality={80}
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {session.user.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  className="bg-indigo-500 text-white px-10 py-3 
                rounded-lg font-bold inline-flex items-center justify-center tracking-tight btn-hover group"
                  href="/login"
                >
                  Login
                  <ArrowRight className="h-7 w-6 inline-flex justify-center items-center ml-2 fill-current group-hover:text-white/60" />
                </a>
              )}
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
              
              {status === "authenticated" ? (
                <>
                  <Link href="/profile" className="text-gray-800 hover:text-gray-600">Profile</Link>
                  <Link href="/dashboard" className="text-gray-800 hover:text-gray-600">Dashboard</Link>
                  <button
                    onClick={signOut}
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <a
                  className="bg-indigo-500 text-white px-10 py-3 
                rounded-lg font-bold inline-flex items-center justify-center tracking-tight btn-hover group"
                  href="/login"
                >
                  Get Started
                  <ArrowRight className="h-7 w-6 inline-flex justify-center items-center ml-2 fill-current group-hover:text-white/60" />
                </a>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
