import { ProductData } from '@/types/product';
import React, { createContext, useContext, useEffect, useState } from 'react';


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
