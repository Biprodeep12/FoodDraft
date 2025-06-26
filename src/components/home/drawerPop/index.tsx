import { useProduct } from "@/Context/productContext";
import { evaluateNutrientSafety } from "@/utils/per100g";
import { Info, X } from "lucide-react";
import Image from "next/image";
import { IconNutri } from "./icons";
import { ProductAI } from "./ProductAI";

const DrawerPop = () =>{
    const { barcode, product, setBarcode } = useProduct();

    const getNutriScoreColor = (grade: string | undefined) => {
    switch (grade?.toLowerCase()) {
      case "a":
        return "bg-green-500"
      case "b":
        return "bg-lime-500"
      case "c":
        return "bg-yellow-500"
      case "d":
        return "bg-orange-500"
      case "e":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  function closeDrawer(){
    setBarcode("");
  }

  const productNutri= product ? evaluateNutrientSafety(product) : null;

  const allowOneDecimal = (input: number): number => {
  return Math.round(input * 10) / 10;
  };


    return(
        <div
      className={`fixed inset-0 z-[1000] flex justify-end transition-all duration-300 ease-in-out ${
        barcode ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={closeDrawer} aria-hidden="true" />

      <div className="relative flex h-full w-full flex-col bg-white shadow-lg">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-row items-center gap-2 text-3xl font-extrabold">
            Food<span className="text-emerald-500">Draft</span>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close product details"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {product?.status === 1 ? (
            <div className="grid gap-8">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                <div className="flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 p-4 shadow-md">
                  <Image
                    src={product.product.selected_images.front.display.en || "/placeholder.svg"}
                    width={300}
                    height={300}
                    priority
                    alt={`Image of ${product.product.product_name}`}
                    className="aspect-square object-contain"
                  />
                </div>
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {product.product.product_name || "Product Name Not Found"}
                  </h1>
                  <p className="mt-2 text-lg italic text-gray-600">Barcode: {product.code || "XXXXXXX"}</p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:justify-start">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xl font-semibold text-gray-800">Nutri-score:</span>
                      <span
                        className={`inline-flex min-w-[90px] justify-center rounded-lg px-5 py-3 text-3xl font-extrabold uppercase text-white shadow-lg transition-all duration-200 hover:scale-105 ${getNutriScoreColor(
                          product.product.nutrition_grades,
                        )}`}
                        title="Nutri-score indicates the overall nutritional quality of food products."
                      >
                        {product.product.nutrition_grades || "N/A"}
                      </span>
                      <Info className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="hidden h-20 w-px bg-gray-200 md:block" /> 
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xl font-semibold text-gray-800">NOVA Group:</span>
                      <span
                        className="inline-flex min-w-[90px] justify-center rounded-lg border-2 border-gray-400 bg-gray-100 px-5 py-3 text-3xl font-extrabold text-gray-800 shadow-lg transition-all duration-200 hover:scale-105"
                        title="NOVA classification categorizes foods by their level of processing."
                      >
                        {product.product.nutriments["nova-group"] || "N/A"}
                      </span>
                      <Info className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>

              {product.product && (
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <span className="text-2xl font-bold text-gray-800">Nutrients (per 100g)</span>
                  <div className="grid gap-4 md:grid-cols-2 mt-5">
                    <div className="bg-gray-50 rounded-md shadow-sm p-3">
                      <span className="text-lg font-bold">Negative Points</span>
                      <div className="grid gap-2 mt-3">
                        {productNutri?.notSafe.map((nutri,index)=>(
                          <div key={index} className="flex flex-row justify-between">
                            <span className="capitalize flex flex-row flex-nowrap gap-1">{IconNutri(nutri.name,"red")}{nutri.name}</span>
                            <span className="text-red-600">{nutri.value? `${allowOneDecimal(nutri.value)}${nutri.unit}`:"NaN"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-md shadow-sm p-3">
                      <h3 className="mb-3 text-lg font-bold">Positive Points</h3>
                      <div className="grid gap-2 mt-3">
                        {productNutri?.safe.map((nutri,index)=>(
                          <div key={index} className="flex flex-row justify-between">
                            <span className="capitalize flex flex-row flex-nowrap gap-1">{IconNutri(nutri.name,"green")}{nutri.name}</span>
                            <span className="text-green-700">{nutri.value? `${allowOneDecimal(nutri.value)}${nutri.unit}`:"NaN"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">All Nutrition Information (per 100g)</h2>
                <div className="grid gap-4 md:grid-cols-2 bg-gray-50 rounded-md shadow-sm p-3">
                  {[
                  "energy-kcal",
                  "carbohydrates",
                  "proteins",
                  "fat",
                  "saturated-fat",
                  "sugars",
                  "fiber",
                  "sodium",
                  ].map((nutri) => {
                   const value = product.product.nutriments[`${nutri}_value` as keyof typeof product.product.nutriments];
                   const unit = product.product.nutriments[`${nutri}_unit` as keyof typeof product.product.nutriments];
                    return (
                   <div key={nutri} className="flex flex-row justify-between">
                     <span className="capitalize flex flex-row flex-nowrap gap-1">
                       {IconNutri(nutri, "blue")}
                       {nutri}
                     </span>
                     <span>
                       {typeof value === "number" ? `${allowOneDecimal(value)}${unit || ""}` : "NaN"}
                     </span>
                   </div>
                   );
                 })}
                </div>
              </div>
              <ProductAI nutri={product.product.product_name}/>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-gray-500">
              <p className="text-xl font-medium">Product not found. Please scan a different barcode.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    )

}
export default DrawerPop;