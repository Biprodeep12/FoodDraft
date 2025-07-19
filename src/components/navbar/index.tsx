import { useAuth } from "@/Context/userContext";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { Bookmark, LogIn, LogOut, Menu, User, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { user } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

    return(
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between md:h-20 h-16 items-center">
          <Link href="/" className="flex items-center gap-2 md:text-4xl text-3xl font-extrabold">
            Food<span className="text-emerald-500">Draft</span>
          </Link>
          <div className="sm:flex hidden flex-row flex-nowrap items-center gap-5">
            {user ?
              <div ref={dropdownRef} className="relative">
                {user?.photoURL ?
                 <button onClick={()=>setOpenDropdown(!openDropdown)} className="cursor-pointer w-9 h-9 hover:scale-105 transition-all duration-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <Image
                    src={user.photoURL || '/default-avatar.png'}
                    alt={user.displayName || 'User'}
                    width={50}
                    height={50}
                    />
                 </button>
                  :
                 <button onClick={()=>setOpenDropdown(!openDropdown)} className="cursor-pointer">
                   <User  size={25} color='black'/>
                 </button>}
                  <div className={`rounded-lg bg-white p-3 shadow ${openDropdown?'flex opacity-100':'hidden opacity-0'} transition-all duration-200 flex-col gap-[5px] absolute top-14 right-0 w-[200px]`}>
                    <Link href="/profile" target="_blank" className="w-full text-left py-[7px] px-7 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                      <UserRound className="h-5 w-5" />
                      Profile
                    </Link>
                    <Link href="/bookmark" target="_blank" className="w-full text-left py-[7px] px-7 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                      <Bookmark className="h-5 w-5" />
                      Bookmarks
                    </Link>
                    <div className="w-full bg-gray-200 h-[1px]"></div>
                    <button onClick={handleLogout} className="text-red-500 font-bold text-left py-[7px] px-7 hover:bg-gray-100 cursor-pointer w-full flex items-center gap-2">
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
              </div>
              :
              <Link href="/bookmark" className="p-2 cursor-pointer text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg">
                <Bookmark className="h-5 w-5" />
              </Link>
         }
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl cursor-pointer bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 hover:text-emerald-600 transition-colors duration-300"
              aria-label="Toggle mobile menu"
              >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <div
              className={`md:hidden fixed bg-white/10 backdrop-blur-lg border-b border-white/20 px-4 w-full transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? "max-h-90 opacity-100 pb-6" : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl mt-4 p-6 shadow-xl border border-white/20">
                <div className="flex flex-col space-y-4">
                  <Link href="/bookmark" target="_blank"
                    className="text-left flex items-center gap-3 text-gray-700 hover:text-emerald-600 font-semibold transition-colors duration-300 py-2 px-4 rounded-xl hover:bg-emerald-50"
                  >
                    <Bookmark className="h-5 w-5"/>
                    Bookmarks
                  </Link>
                  {user ?
                  <>
                  <a href="/profile" target="_blank">
                    <div className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 font-semibold transition-colors duration-300 py-2 px-4 rounded-xl hover:bg-emerald-50">
                      {user?.photoURL ? (
                        <Image
                          src={user.photoURL || '/default-avatar.png'}
                          alt={user.displayName || 'User'}
                          width={40}
                          height={40}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <User size={25} color='black' />
                      )}
                      Profile
                    </div>
                  </a>
                  <button className="flex items-center gap-3 text-red-500 hover:text-emerald-600 font-semibold transition-colors duration-300 py-2 px-4 rounded-xl hover:bg-emerald-50">
                    <LogOut className="h-5 w-5" />
                    <span onClick={handleLogout}>Logout</span>
                  </button>
                  </>
                  :
                  <Link href='/auth' className="flex items-center gap-3 text-emerald-500 font-semibold transition-colors duration-300 py-2 px-4 rounded-xl hover:bg-emerald-50">
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                 </Link>
                 }
                </div>
              </div>
            </div>
      </nav>
    )
}

export default Navbar;