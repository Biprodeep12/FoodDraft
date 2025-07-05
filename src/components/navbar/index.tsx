import { Bookmark } from "lucide-react";
import Link from "next/link";


const Navbar = () => {
    return(
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-3xl font-extrabold">
            Food<span className="text-emerald-500">Draft</span>
          </Link>
          <Link href="/bookmark" className="p-2 cursor-pointer text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg">
            <Bookmark className="h-5 w-5" />
          </Link>
        </div>
      </nav>
    )
}

export default Navbar;