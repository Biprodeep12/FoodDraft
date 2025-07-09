import { useProduct } from "@/Context/productContext";
import { evaluateNutrientSafety } from "@/utils/per100g";
import { FlaskConical, Info, X } from "lucide-react";
import Image from "next/image";
import { IconNutri } from "./icons";
import { ProductAI } from "./ProductAI";
import { Loader } from "./loader";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/Context/userContext";
import { collection, doc, getDoc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface Nutrient {
  name: string;
  value: number;
  unit: string;
}

interface NutrientListProps {
  title: string;
  data: Nutrient[];
  color: "red" | "green";
}

const DrawerPop = () =>{
    const { barcode, product, loading, setBarcode } = useProduct();
    const { user } = useAuth();
    const [scanned,setScanned] =useState(0)

    const getNutriScoreColor = useCallback((grade: string | undefined) => {
    switch (grade?.toLowerCase()) {
    case "a": return "bg-green-500";
    case "b": return "bg-lime-500";
    case "c": return "bg-yellow-500";
    case "d": return "bg-orange-500";
    case "e": return "bg-red-500";
    default: return "bg-gray-400";
   }
   }, []);

   const productNutri = useMemo(() => {
   return product ? evaluateNutrientSafety(product) : null;
   }, [product]);

   const allowOneDecimal = useCallback((input: number): number => {
   return Math.round(input * 10) / 10;
   }, []);

  function closeDrawer(){
    setBarcode("");
  }

useEffect(() => {
  const updateNumberOfProductsScanned = async () => {
    if (!user?.uid) return;

    try {
      const scannedDocRef = doc(db, "users", user.uid, "scannedNo", "counter");
      const scannedDoc = await getDoc(scannedDocRef);

      if (scannedDoc.exists()) {
        await updateDoc(scannedDocRef, {
          scannedNo: increment(1),
        });
      } else {
        await setDoc(scannedDocRef, {
          scannedNo: 1,
        });
      }
    } catch (error) {
      console.error("Error updating scannedNo:", error);
    }
  };

  updateNumberOfProductsScanned();
  }, [product]);

  const NutrientList = React.memo(({ title, data, color }: NutrientListProps) => (
  <div className="bg-gray-50 rounded-md shadow-sm p-3">
    <div className="mb-3 text-lg font-bold">{title}</div>
    <div className="grid gap-2 mt-3">
    {data.length > 0 ? (
     data.map((nutri, index) => (
        <div key={index} className="flex flex-row justify-between">
          <span className="capitalize flex flex-row flex-nowrap gap-1 items-center">
            {IconNutri(nutri.name, color)}
            {nutri.name}
          </span>
          <span className={color === "red" ? "text-red-600" : "text-green-700"}>
            {allowOneDecimal(nutri.value)}{nutri.unit}
          </span>
       </div>
      ))
    )
    :
    <div className="flex w-full text-center font-extrabold italic">Not Found</div>
    }
    </div>
  </div>
  ));

  NutrientList.displayName = "NutrientList";

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
            className="inline-flex cursor-pointer h-10 w-10 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        {loading ?
        <Loader/>
        :
        <div className="flex-1 overflow-y-auto md:p-6">
          {product?.status === 1 ? (
            <div className="grid gap-8 max-md:pt-6">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                <div className="flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 p-4 shadow-md">
                  <Image
                    src={product.product.image_front_url || "/placeholder.svg"}
                    width={300}
                    height={300}
                    priority
                    alt={`Image of ${product.product.product_name}`}
                    className="aspect-square object-contain"
                  />
                </div>
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="text-4xl font-bold text-gray-900">
                    {product.product.product_name || "Product Name Not Found"}
                  </div>
                  <span className="mt-2 text-lg italic text-gray-600">Barcode: {product.code || "XXXXXXX"}</span>

                  <div className="text-2xl font-bold text-gray-900">Brand: <span className="text-gray-500">{product.product.brands || "Not Found"}</span></div>

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
                <div className="md:rounded-lg bg-white p-6 shadow-md">
                  <span className="text-2xl font-bold text-gray-800">Nutrients (per 100g/100ml)</span>
                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <NutrientList title="Negative Points" data={productNutri?.notSafe || []} color="red" />
                    <NutrientList title="Positive Points" data={productNutri?.safe || []} color="green" />
                  </div>
                </div>
              )}

              <div className="md:rounded-lg bg-white p-6 shadow-md">
                <span className="mb-4 text-2xl font-bold text-gray-800">All Nutrition Information (per 100g/100ml)</span>
                <div className="grid gap-2 md:grid-cols-2 bg-gray-50 rounded-md shadow-sm p-3 mt-4">
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
                   const value = product.product?.nutriments[`${nutri}_value` as keyof typeof product.product.nutriments];
                   const unit = product.product?.nutriments[`${nutri}_unit` as keyof typeof product.product.nutriments];
                    return (
                   <div key={nutri} className="flex flex-row justify-between">
                     <span className="capitalize flex flex-row flex-nowrap gap-1">
                       {IconNutri(nutri, "blue")}
                       {nutri}
                     </span>
                     <span>
                       {typeof value === "number" ? `${allowOneDecimal(value)}${unit || ""}` : "-"}
                     </span>
                   </div>
                   );
                 })}
                </div>
              </div>

              <div className="grid md:gap-4 gap-8 md:grid-cols-2 mt-5">
                <div className="md:rounded-lg bg-white p-6 shadow-md">
                  <span className="mb-4 text-2xl font-bold text-gray-800 flex flex-row items-center gap-2">Additives <FlaskConical className="text-orange-600"/></span>
                  <div className="grid gap-2 bg-gray-50 rounded-md shadow-sm p-3 mt-4">
                    {product.product.additives_tags && product.product.additives_tags.length > 0 ? (
                      product.product.additives_tags.map((tag) => {
                      const code = tag.replace("en:", "").toLowerCase();
                      return (
                        <div key={tag} className="flex flex-row justify-between">
                          <span className="capitalize flex flex-row flex-nowrap gap-1">
                            <Info className="text-gray-400"/>
                            {code}
                          </span>
                          <div onClick={()=> window.open(`https://world.openfoodfacts.org/additive/${code}`, '_blank', 'noopener,noreferrer')} className="text-blue-600 cursor-pointer hover:underline">View Details</div>
                        </div>
                      );
                    })
                    ) : (
                   <div className="flex w-full text-center font-extrabold italic">Not Found</div>
                    )}  
                 </div>
               </div>
                <div className="md:rounded-lg bg-white p-6 shadow-md">
                  <span className="mb-4 text-2xl font-bold text-gray-800">Ingredients</span>
                  <div className="flex flex-wrap gap-2 bg-gray-50 rounded-md shadow-sm p-3 mt-4">
                    {product.product.ingredients_tags && product.product.ingredients_tags.length > 0 ? (
                      product.product.ingredients_tags.map((tag, index) => {
                      const code = tag.replace("en:", "").toLowerCase();
                      const isLast = index === product.product.ingredients_tags.length - 1;
                      return (
                          <div key={tag} className="capitalize flex flex-row items-center flex-nowrap gap-2">
                            {code}
                            {!isLast && <div className="w-1 h-1 rounded-full bg-gray-700"></div>}
                          </div>
                      );
                    })
                    ) : (
                   <div className="flex w-full text-center font-extrabold italic">Not Found</div>
                    )}  
                 </div>
               </div>
             </div>

              <ProductAI nutri={product.product.product_name}/>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-gray-500">
              <p className="text-xl font-medium">Product not found. Please scan a different barcode.</p>
            </div>
          )}
        </div>}

      </div>
    </div>
    )
}

export default React.memo(DrawerPop);
