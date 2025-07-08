import Navbar from "@/components/navbar";
import { useProduct } from "@/Context/productContext";
import { Bookmark, BookmarkCheck, Loader2, ShoppingCart} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { collection, addDoc, deleteDoc, doc, getDocs, query as firestoreQuery, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useMessages } from "@/Context/messagesContext";
import { useAuth } from "@/Context/userContext";

interface Product {
  product_name: string;
  code: string;
  image_front_url?: string;
  nutrition_grades_tags?: string[];
}

export default function BookMark() {
  const { setBarcode } = useProduct();
  const { setMessage, setMessageError } = useMessages();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [bookmarkedCodes, setBookmarkedCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) {
        setProducts([]);
        setBookmarkedCodes([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "products"));
        const fetchedProducts: Product[] = [];
        const codes: string[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProducts.push({
            code: data.code,
            product_name: data.name,
            image_front_url: data.image,
            nutrition_grades_tags: data.nutriscore ?? [],
          });
          codes.push(data.code);
        });

        setProducts(fetchedProducts);
        setBookmarkedCodes(codes);
      } catch (error) {
        setMessageError(true);
        setMessage("Failed to fetch products. Error: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user?.uid) {
        setMessage("Please log in to bookmark products.");
        setMessageError(true);
      } else {
        setMessage('');
        setMessageError(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [user]);

  const getNutritionGradeColor = (grade: string) => {
    switch (grade?.toLowerCase()) {
      case "a": return "bg-emerald-500 text-white";
      case "b": return "bg-yellow-500 text-white";
      case "c": return "bg-orange-500 text-white";
      case "d": return "bg-red-500 text-white";
      case "e": return "bg-red-600 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getNutritionGrade = useCallback((grade: string | undefined) => {
    if (!grade) return "X";

    const validGrades = ["A", "B", "C", "D", "E"];
    const upperGrade = grade.toUpperCase();

    return validGrades.includes(upperGrade) ? upperGrade : "X";
  }, []);

  const toggleBookmark = async (
  code: string,
  name: string,
  image: string | undefined,
  nutriscore: string[] | undefined
  ) => {
  if (!user?.uid) {
    setMessage("Please log in to bookmark products.");
    setMessageError(true);
    return;
  }

  try {
    const productsRef = collection(db, "users", user.uid, "products");
    const q = firestoreQuery(productsRef, where("code", "==", code));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(productsRef, {
        code,
        name,
        image,
        nutriscore: nutriscore ?? [],
      });
      setBookmarkedCodes((prev) => [...prev, code]);
      setMessage("Product bookmarked successfully!");
      setMessageError(false);
    } else {
      const docId = querySnapshot.docs[0].id;
      await deleteDoc(doc(db, "users", user.uid, "products", docId));
      setBookmarkedCodes((prev) => prev.filter((c) => c !== code));
      setMessage("Product removed from bookmark!");
      setMessageError(true);
      window.location.reload();
    }
  } catch (error) {
    setMessage("Error toggling bookmark: " + error);
    setMessageError(true);
  }
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-gray-200 hover:border-emerald-200 overflow-hidden relative">

      {product.nutrition_grades_tags?.[0] && (
        <div className="absolute top-2 left-2 z-10">
          <span className={`w-8 h-8 p-1 rounded-xl flex items-center justify-center text-base font-bold ${getNutritionGradeColor(product.nutrition_grades_tags[0])}`}>
            {getNutritionGrade(product.nutrition_grades_tags?.[0])}
          </span>
        </div>
      )}

      <button onClick={()=>toggleBookmark(product.code,product.product_name,product.image_front_url,product.nutrition_grades_tags)} className="absolute top-2 right-2 z-10 cursor-pointer rounded-xl bg-white hover:bg-gray-100 shadow">
          {bookmarkedCodes.includes(product.code) ? (
           <BookmarkCheck className="w-8.5 h-8.5 p-2 text-emerald-500" />
           ) : (
           <Bookmark className="w-8.5 h-8.5 p-2 text-gray-400" />
           )}
      </button>

      <div className="relative aspect-square bg-gray-50">
        <Image
          src={product.image_front_url || "/placeholder.svg"}
          alt={product.product_name || "Product image"}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="p-3 flex flex-col">
        <div className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600">
          {product.product_name || "Unnamed Product"}
        </div>
        <button onClick={() => setBarcode(product.code)} className="w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-3 rounded-lg transition flex items-center justify-center gap-1.5 text-xs">
          <ShoppingCart className="h-3.5 w-3.5" />
          View Details
        </button>
      </div>
    </div>
  );

    return(
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500 rounded-xl">
              <Bookmark className="h-6 w-6 text-white" />
            </div>
              <div className="text-sm text-gray-600">{products.length} Products Saved</div>
          </div>
        </div>

        {loading ? (
        <div className="flex justify-center my-10">
          <div className="flex mx-auto gap-2 px-6 py-3 items-center cursor-pointer bg-emerald-500 text-white rounded-xl">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading...
          </div>
        </div>
        ): !user?.uid ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <Bookmark className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="text-xl font-semibold">Login to BookMark your Products</div>
            <div className="text-gray-600 mb-5">Save your Products</div>
            <button onClick={()=>window.location.href='/auth'} className="mx-auto font-bold gap-2 px-6 py-3 cursor-pointer bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transtion-all duration-200 text-white rounded-xl">
              Sign In / Sign Up
            </button>
          </div>) : products.length === 0 ?(
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <Bookmark className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="text-xl font-semibold">No Bookmarks found</div>
            <div className="text-gray-600">Try Bookmarking Products</div>
          </div>
        ):(
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {products.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))}
        </div>)}
      </div>
    </div>    
    )
}