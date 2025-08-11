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
  LogOut 
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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

    window.addEventListener('authStateChanged', handleAuthChange);
    
    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      setIsUserMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
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
            <Menu
              className="h-5 w-5 md:hidden cursor-pointer"
              onClick={toggleMenu}
            />
            <nav className="hidden md:flex gap-5 lg:gap-7 text-black/60 items-center">
              <a href="/features" className="hover-nav">
                Features
              </a>
              
              {loading ? (
                <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
              ) : user ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="hover-nav">
                    Dashboard
                  </Link>
                  {user.role === 'ADMIN' && (
                    <Link href="/admin" className="hover-nav">
                      Admin
                    </Link>
                  )}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials(user.firstName, user.lastName)}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {user.role.toLowerCase()}
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isUserMenuOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                        
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserIcon className="w-4 h-4" />
                          Profile Settings
                        </Link>
                        
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        
                        {user.role === 'ADMIN' && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="w-4 h-4" />
                            Admin Panel
                          </Link>
                        )}
                        
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
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
                    className="bg-indigo-500 text-white px-6 py-3 
                  rounded-lg font-bold inline-flex items-center justify-center tracking-tight btn-hover group"
                    href="/signup"
                  >
                    Get Started
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:text-white/60" />
                  </Link>
                </div>
              )}
            </nav>
          </div>
          {/* Mobile menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-3 flex flex-col gap-4 text-black/60 items-center">
              {loading ? (
                <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
              ) : user ? (
                <>
                  <div className="flex flex-col items-center gap-3 py-4 border-b border-gray-200">
                    <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {getInitials(user.firstName, user.lastName)}
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {user.role.toLowerCase()}
                      </div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>
                  
                  <a 
                    href="/features" 
                    className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </a>
                  
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile Settings
                  </Link>
                  
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  
                  {user.role === 'ADMIN' && (
                    <Link 
                      href="/admin" 
                      className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors mt-4 pt-4 border-t border-gray-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="bg-indigo-500 text-white px-10 py-3 
                  rounded-lg font-bold inline-flex items-center justify-center tracking-tight btn-hover group"
                    href="/signup"
                  >
                    Get Started
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:text-white/60" />
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
