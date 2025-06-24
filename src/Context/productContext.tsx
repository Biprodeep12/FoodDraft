import React, { createContext, useContext, useEffect, useState } from 'react';


export interface ProductData {
  code: string;
  product: {
    nutriments: {
      carbohydrates: number;
      carbohydrates_100g: number;
      carbohydrates_unit: string;
      carbohydrates_value: number;
      energy: number;
      energy_100g: number;
      energy_unit: string;
      energy_value: number;
      "energy-kcal": number;
      "energy-kcal_100g": number;
      "energy-kcal_unit": string;
      "energy-kcal_value": number;
      "energy-kcal_value_computed": number;
      fat: number;
      fat_100g: number;
      fat_unit: string;
      fat_value: number;
      "fruits-vegetables-legumes-estimate-from-ingredients_100g": number;
      "fruits-vegetables-legumes-estimate-from-ingredients_serving": number;
      "fruits-vegetables-nuts-estimate-from-ingredients_100g": number;
      "fruits-vegetables-nuts-estimate-from-ingredients_serving": number;
      "nova-group": number;
      "nova-group_100g": number;
      "nova-group_serving": number;
      "nutrition-score-fr": number;
      "nutrition-score-fr_100g": number;
      proteins: number;
      proteins_100g: number;
      proteins_unit: string;
      proteins_value: number;
      salt: number;
      salt_100g: number;
      salt_unit: string;
      salt_value: number;
      "saturated-fat": number;
      "saturated-fat_100g": number;
      "saturated-fat_unit": string;
      "saturated-fat_value": number;
      sodium: number;
      sodium_100g: number;
      sodium_unit: string;
      sodium_value: number;
      sugars: number;
      sugars_100g: number;
      sugars_unit: string;
      sugars_value: number;
    };
    nutriscore_data: {
      components: {
        negative: {
          id: string;
          points: number;
          points_max: number;
          unit: string;
          value: number;
        }[];
        positive: {
          id: string;
          points: number;
          points_max: number;
          unit: string;
          value: number | null;
        }[];
      };
      count_proteins: number;
      count_proteins_reason: string;
      grade: string;
      is_beverage: number;
      is_cheese: number;
      is_fat_oil_nuts_seeds: number;
      is_red_meat_product: number;
      is_water: number;
      negative_points: number;
      negative_points_max: number;
      positive_nutrients: string[];
      positive_points: number;
      positive_points_max: number;
      score: number;
    };
    nutrition_grades: string;
    product_name: string;
    selected_images: {
      front: {
        display: {
          en: string;
        };
        small: {
          en: string;
        };
        thumb: {
          en: string;
        };
      };
    };
  };
  status: number;
  status_verbose: string;
}

interface ProductContextType {
  barcode: string;
  product: ProductData | null;
  setBarcode: (code: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [barcode, setBarcode] = useState<string>('3017624010701');
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    if (!barcode) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.net/api/v2/product/${barcode}?fields=product_name,nutriscore_data,nutriments,nutrition_grades,selected_images`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [barcode]);

  return (
    <ProductContext.Provider value={{ barcode, product, setBarcode }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProduct must be used within ProductProvider');
  return context;
};
