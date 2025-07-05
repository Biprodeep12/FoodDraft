import { useAuth } from "@/Context/userContext";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { Bookmark, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

    return(
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-3xl font-extrabold">
            Food<span className="text-emerald-500">Draft</span>
          </Link>
          <div className="flex flex-row flex-nowrap items-center gap-5">
          <Link href="/bookmark" className="p-2 cursor-pointer text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg">
            <Bookmark className="h-5 w-5" />
          </Link>
            {user && 
              <div className="relative">
                <div className="cursor-pointer w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                {user?.photoURL ?
                  <Image
                    src={user.photoURL || '/default-avatar.png'}
                    alt={user.displayName || 'User'}
                    width={40}
                    height={40}
                  />
                  :
                  <User size={25} color='black'/>}
                </div>
                  <div className="rounded-lg bg-white p-3 shadow flex flex-col items-center gap-2 absolute top-14 right-0 w-48 text-sm">
                    <div className="py-2 w-full text-center">{user.displayName || 'User'}</div>
                    <div className="w-full bg-gray-200 h-[1px]"></div>
                    <div className="py-2 w-full text-center hover:bg-gray-100 cursor-pointer">Profile Settings</div>
                    <div className="w-full bg-gray-200 h-[1px]"></div>
                    <button onClick={handleLogout} className="text-red-500 font-bold p-2 hover:bg-gray-100 cursor-pointer w-full">Logout</button>
                  </div>
              </div>}
          </div>
        </div>
      </nav>
    )
}

export default Navbar;