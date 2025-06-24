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