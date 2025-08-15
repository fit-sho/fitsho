"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/assets/images/logo-fitsho.png";
import Image from "next/image";
import Link from "next/link";
import { authClient, User } from "@/lib/client-auth";
import {
  ArrowRight,
  Menu,
  ChevronDown,
  User as UserIcon,
  LayoutDashboard,
  Settings,
  LogOut,
  Dumbbell,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const pathname = usePathname();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const checkAuth = async () => {
    try {
      const currentUser = await authClient.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("authStateChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authStateChanged", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const controlNavbar = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);

          if (scrollDifference > 5) {
            if (currentScrollY < lastScrollY || currentScrollY < 10) {
              if (scrollTimeout) {
                clearTimeout(scrollTimeout);
                setScrollTimeout(null);
              }
              setIsVisible(true);
            } else if (
              currentScrollY > lastScrollY &&
              currentScrollY > 100 &&
              !scrollTimeout
            ) {
              const timeout = setTimeout(() => {
                setIsVisible(false);
                setIsUserMenuOpen(false);
                setIsMenuOpen(false);
                setScrollTimeout(null);
              }, 500);

              setScrollTimeout(timeout);
            }

            setLastScrollY(currentScrollY);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });

    return () => {
      window.removeEventListener("scroll", controlNavbar);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      setIsUserMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-20 border-b border-slate-800/50 bg-slate-900/95 backdrop-blur-sm transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {pathname === "/" && (
        <div className="flex items-center justify-center gap-5 bg-black py-3 text-sm text-white">
          <p className="hidden text-neutral-100 md:block">
            Elevate your routine and maximize your performance
          </p>
          <div className="mt-[2px] inline-flex items-center gap-1">
            <a href="/login" className="group underline hover:text-white/60">
              Get Started For Free
              <ArrowRight className="ml-0.5 inline-flex h-5 w-5 items-center justify-center fill-current group-hover:text-white/60" />
            </a>
          </div>
        </div>
      )}

      <div className="bg-slate-900/95 py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <a href="/#" className="hover:scale-125">
              <Image src={Logo} alt="Fitsho Logo" height={40} width={40} />
            </a>
            <Menu
              className="h-5 w-5 cursor-pointer md:hidden"
              onClick={toggleMenu}
            />
            <nav className="hidden items-center gap-5 text-white/80 md:flex lg:gap-7">
              <a href="/features" className="hover-nav">
                Features
              </a>

              {loading ? (
                <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-200"></div>
              ) : user ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="hover-nav">
                    Dashboard
                  </Link>
                  <Link href="/workout" className="hover-nav">
                    Workout
                  </Link>
                  {user.role === "ADMIN" && (
                    <Link href="/admin" className="hover-nav">
                      Admin
                    </Link>
                  )}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-800/50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
                        {getInitials(user.firstName, user.lastName)}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs capitalize text-slate-400">
                          {user.role.toLowerCase()}
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform ${
                          isUserMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-slate-700 bg-slate-800 py-2 shadow-lg">
                        <div className="border-b border-slate-700 px-4 py-2">
                          <div className="text-sm font-medium text-white">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-slate-400">
                            {user.email}
                          </div>
                        </div>

                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserIcon className="h-4 w-4" />
                          Profile Settings
                        </Link>

                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>

                        {user.role === "ADMIN" && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-700"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4" />
                            Admin Panel
                          </Link>
                        )}

                        <div className="mt-2 border-t border-slate-700 pt-2">
                          <button
                            onClick={handleSignOut}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-900/20"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    className="btn-hover group inline-flex items-center justify-center rounded-lg bg-indigo-500 px-6 py-3 font-bold tracking-tight text-white"
                    href="/signup"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:text-white/60" />
                  </Link>
                </div>
              )}
            </nav>
          </div>
          {/* Mobile menu */}
          {isMenuOpen && (
            <nav className="mt-3 flex flex-col items-center gap-4 text-white/80 md:hidden">
              {loading ? (
                <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-200"></div>
              ) : user ? (
                <>
                  <div className="flex flex-col items-center gap-3 border-b border-slate-700 py-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 text-lg font-semibold text-white">
                      {getInitials(user.firstName, user.lastName)}
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-white">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs capitalize text-slate-400">
                        {user.role.toLowerCase()}
                      </div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>

                  <a
                    href="/features"
                    className="flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </a>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="h-4 w-4" />
                    Profile Settings
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <Link
                    href="/workout"
                    className="flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Dumbbell className="h-4 w-4" />
                    Workout
                  </Link>

                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="mt-4 flex items-center gap-2 border-t border-slate-700 pt-4 text-red-400 transition-colors hover:text-red-300"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="btn-hover group inline-flex items-center justify-center rounded-lg bg-indigo-500 px-10 py-3 font-bold tracking-tight text-white"
                    href="/signup"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:text-white/60" />
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
