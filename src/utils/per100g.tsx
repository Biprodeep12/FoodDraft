import { ProductData } from "@/types/product";

export interface NutrientStatusDetailed {
  safe: { name: string; value: number; unit: string }[];
  notSafe: { name: string; value: number; unit: string }[];
}

export const evaluateNutrientSafety = (product: ProductData): NutrientStatusDetailed => {
  const nutriments = product.product.nutriments;

  const safe: { name: string; value: number; unit: string }[] = [];
  const notSafe: { name: string; value: number; unit: string }[] = [];

  const safeRanges = {
    carbohydrates: { min: 20, max: 60 },
    energyKcal: { min: 100, max: 400 },
    fat: { max: 17 },
    fiber: { min: 3 },
    proteins: { min: 5 },
    saturatedFat: { max: 1.5 },
    sodium: { max: 120 },
    sugars: { max: 5 },
  };

  const classify = (
  name: string,
  value: number,
  unit: string,
  isSafe: boolean
) => {
  const item = { name, value, unit };
  if (isSafe) {
    safe.push(item);
  } else {
    notSafe.push(item);
  }
};


  const carbs = nutriments.carbohydrates_100g;
  classify(
    "carbohydrates",
    carbs,
    nutriments.carbohydrates_unit,
    carbs >= safeRanges.carbohydrates.min && carbs <= safeRanges.carbohydrates.max
  );

  const energyKcal = nutriments["energy-kcal_100g"];
  classify(
    "energy-kcal",
    energyKcal,
    nutriments["energy-kcal_unit"],
    energyKcal >= safeRanges.energyKcal.min && energyKcal <= safeRanges.energyKcal.max
  );

  const fat = nutriments.fat_100g;
  classify(
    "fat",
    fat,
    nutriments.fat_unit,
    fat <= safeRanges.fat.max
  );

  const fiber = nutriments["fruits-vegetables-nuts-estimate-from-ingredients_100g"];
  classify(
    "fiber",
    fiber,
    "g",
    fiber >= safeRanges.fiber.min
  );

  const proteins = nutriments.proteins_100g;
  classify(
    "proteins",
    proteins,
    nutriments.proteins_unit,
    proteins >= safeRanges.proteins.min
  );

  const saturatedFat = nutriments["saturated-fat_100g"];
  classify(
    "saturated-fat",
    saturatedFat,
    nutriments["saturated-fat_unit"],
    saturatedFat <= safeRanges.saturatedFat.max
  );

  const sodium = nutriments.sodium_100g * 1000;
  classify(
    "sodium",
    sodium,
    "mg",
    sodium <= safeRanges.sodium.max
  );

  const sugars = nutriments.sugars_100g;
  classify(
    "sugars",
    sugars,
    nutriments.sugars_unit,
    sugars <= safeRanges.sugars.max
  );

  return { safe, notSafe };
};
