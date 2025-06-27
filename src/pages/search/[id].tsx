import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export default function SearchPage({
  initialProducts,
  initialMeta,
}: PageProps) {
  const router = useRouter();
  const { query } = router;
  const { setBarcode } = useProduct();
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [meta, setMeta] = useState<Meta | undefined>(initialMeta);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] =useState("")

  const onSearch = () =>{
    if(!searchInput.trim()) return;
    router.push(
        {
            pathname: router.pathname,
            query: {
                ...router.query,
                id: searchInput,
            },
        },
        undefined,
        {shallow: true},
    )
  }

  const fetchProducts = async (pageToFetch: number) => {
    if (!query.id) return;

    setLoading(true);
    setError(undefined);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v2/search?categories_tags_en=${query.id}&nutrition_grades_tags=&page=${pageToFetch||1}&fields=product_name,code,image_front_url,nutrition_grades_tags`
      );

      const data: ApiResponse = await res.json();

      setProducts((prev) =>
        pageToFetch === 1 ? data.products : [...prev, ...data.products]
      );

      setMeta({
        page: data.page,
        page_count: data.page_count,
        page_size: data.page_size,
        count: data.count,
      });

      setPage(data.page);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.id) {
      fetchProducts(1);
    }
  }, [query.id]);

  const loadMore = () => {
    if (meta && page < meta.page_count) {
      fetchProducts(page + 1);
    }
  };

  const getNutritionGradeColor = (grade: string) => {
    switch (grade.toLowerCase()) {
      case "a":
        return "bg-emerald-500 text-white"
      case "b":
        return "bg-yellow-500 text-white"
      case "c":
        return "bg-orange-500 text-white"
      case "d":
        return "bg-red-500 text-white"
      case "e":
        return "bg-red-600 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
  <div className="min-h-screen bg-gray-50">

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex flex-row items-center gap-2 text-3xl font-extrabold cursor-pointer">
              Food<span className="text-emerald-500">Draft</span>
            </Link>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors">
                <Star className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 flex flex-row justify-center gap-5">
          <div className="relative max-w-xl w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchInput}
              onChange={(e)=>setSearchInput(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
            />
          </div>
          <button onClick={onSearch} className="rounded-xl bg-emerald-500 py-2 px-2.5 cursor-pointer hover:shadow-sm">
            <Search className="h-6 w-6 text-white"/>
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500 rounded-xl shadow-sm">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-gray-900">Search Results</span>
                  <span className="text-sm text-gray-600 mt-1">{products.length*20} products found</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {loading && page === 1 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-emerald-100 rounded-full animate-pulse"></div>
              <Loader2 className="h-6 w-6 text-emerald-500 animate-spin absolute top-3 left-3" />
            </div>
            <span className="mt-3 text-gray-600">Loading products...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="text-red-800 font-medium">{error}</div>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {products.map((product) => (
            <div
              key={product.code}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-gray-200 hover:border-emerald-200 overflow-hidden relative"
            >
              <button className="absolute cursor-pointer top-2 right-2 z-10 w-7 h-7 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-emerald-50 shadow-sm border border-gray-200">
                <Star className="h-3.5 w-3.5 text-gray-600 hover:text-emerald-500" />
              </button>

              {product.nutrition_grades_tags?.length && (
                <div className="absolute top-2 left-2 z-10">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${getNutritionGradeColor(product.nutrition_grades_tags[0])}`}
                  >
                    {product.nutrition_grades_tags[0].toUpperCase()}
                  </span>
                </div>
              )}

              <div className="relative aspect-square bg-gray-50">
                {product.image_front_url && (
                  <Image
                    src={product.image_front_url || "/placeholder.svg"}
                    alt={product.product_name || "Product image"}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-200"
                  />
                )}
              </div>

              <div className="p-3 flex flex-col">
                <div className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
                  {product.product_name || "Unnamed Product"}
                </div>

                <button onClick={()=>setBarcode(product.code)} className="w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 text-xs group/btn">
                  <ShoppingCart className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {meta && page < meta.page_count && (
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-3">
              <button
                onClick={loadMore}
                disabled={loading}
                className="inline-flex gap-2 cursor-pointer items-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Products
                    <Plus/>
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500">
                Showing {products.length} of {meta.page_count * 20} products
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
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
