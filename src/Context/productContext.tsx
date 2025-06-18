import React, { createContext, useContext, useEffect, useState } from 'react';

interface NutrientComponent {
  id: string;
  points: number;
  points_max: number;
  unit: string;
  value: number | null;
}

interface NutriscoreData {
  grade: string;
  score: number;
  positive: NutrientComponent[];
  negative: NutrientComponent[];
}

interface ProductData {
  nutriscore: NutriscoreData;
  productName: string;
}


interface ProductContextType {
  barcode: string;
  product: ProductData | null;
  setBarcode: (code: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [barcode, setBarcode] = useState<string>('');
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    if (!barcode) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.net/api/v2/product/${barcode}?fields=product_name,nutriscore_data`
        );
        const data = await res.json();
        setProduct(data.product);
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
