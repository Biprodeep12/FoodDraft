import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { NextPageContext } from "next";
import { Filter, Loader2, Plus, Search, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useProduct } from "@/Context/productContext";
import Link from "next/link";

interface Product {
  product_name: string;
  code: string;
  image_front_url?: string;
  nutrition_grades_tags?: string[];
}

interface Meta {
  page: number;
  page_count: number;
  page_size: number;
  count: number;
}

interface ApiResponse {
  products: Product[];
  count: number;
  page: number;
  page_count: number;
  page_size: number;
}

interface PageProps {
  initialProducts?: Product[];
  initialMeta?: Meta;
  initialError?: string;
}

export default function SearchPage({ initialProducts, initialMeta }: PageProps) {
  const router = useRouter();
  const { query } = router;
  const { setBarcode } = useProduct();

  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [meta, setMeta] = useState<Meta | undefined>(initialMeta);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [searchInput, setSearchInput] = useState("");

  const fetchProducts = useCallback(async (pageToFetch = 1, replace = false) => {
    if (!query.id) return;

    setLoading(true);
    setError(undefined);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v2/search?categories_tags_en=${query.id}&nutrition_grades_tags=&page=${pageToFetch}&fields=product_name,code,image_front_url,nutrition_grades_tags`
      );

      const data: ApiResponse = await res.json();

      setProducts((prev) => (replace ? data.products : [...prev, ...data.products]));

      setMeta({
        page: data.page,
        page_count: data.page_count,
        page_size: data.page_size,
        count: data.count,
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [query.id]);

  useEffect(() => {
    if (query.id) fetchProducts(1, true);
  }, [query.id, fetchProducts]);

  const onSearch = () => {
    if (!searchInput.trim()) return;
    router.push({ pathname: router.pathname, query: { ...router.query, id: searchInput } }, undefined, { shallow: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const loadMore = () => {
    if (meta && meta.page < meta.page_count) {
      fetchProducts(meta.page + 1);
    }
  };

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

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-gray-200 hover:border-emerald-200 overflow-hidden relative">

      {product.nutrition_grades_tags?.[0] && (
        <div className="absolute top-2 left-2 z-10">
          <span className={`w-8 h-8 p-1 rounded-xl flex items-center justify-center text-base font-bold ${getNutritionGradeColor(product.nutrition_grades_tags[0])}`}>
            {getNutritionGrade(product.nutrition_grades_tags?.[0])}
          </span>
        </div>
      )}

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

  return (
    <div className="min-h-screen bg-gray-50">

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-3xl font-extrabold">
            Food<span className="text-emerald-500">Draft</span>
          </Link>
          <button className="p-2 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg">
            <Star className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-center gap-5 mb-6">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
            />
          </div>
          <button onClick={onSearch} disabled={loading} className="rounded-xl cursor-pointer bg-emerald-500 disabled:bg-emerald-300 py-2 px-3 hover:shadow-sm">
            {loading ? <Loader2 className="h-6 w-6 animate-spin text-white" /> : <Search className="h-6 w-6 text-white" />}
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500 rounded-xl">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Search Results</h2>
              <p className="text-sm text-gray-600">{products.length} Products Shown</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg hover:border-emerald-300 hover:bg-emerald-50">
            <Filter className="h-4 w-4 text-gray-500" />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {products.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))}
        </div>

        {meta && meta.page < meta.page_count && (
          <div className="flex flex-col items-center gap-3">
            <button onClick={loadMore} disabled={loading} className="flex gap-2 px-6 py-3 items-center cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl disabled:bg-gray-400">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                </>
              ) : (
                <>
                  Load More <Plus />
                </>
              )}
            </button>
            <p className="text-xs text-gray-500">Showing {products.length} of {meta.count} products</p>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-6 text-red-800 font-medium">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

SearchPage.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  if (!query.id) return { initialProducts: [], initialMeta: undefined };

  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v2/search?categories_tags_en=${query.id}&nutrition_grades_tags=&page=1&fields=product_name,code,image_front_url,nutrition_grades_tags`
    );

    const data: ApiResponse = await res.json();

    return {
      initialProducts: data.products,
      initialMeta: {
        page: data.page,
        page_count: data.page_count,
        page_size: data.page_size,
        count: data.count,
      },
    };
  } catch (err) {
    console.error("Error in getInitialProps:", err);
    return {
      initialProducts: [],
      initialMeta: undefined,
      initialError: "Failed to load products.",
    };
  }
};
