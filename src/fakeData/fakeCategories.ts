import { string } from "yup/lib/locale";
import { MINI_CATEGORY } from "../interfaces/categories/categories";

export const miniCategories: MINI_CATEGORY[] = [
  {
    id: 1,
    image: "/images/product.webp",
    name: {
      ar: "الملابس",
      en: "Clothes",
    },
    slug: "/clothes",
    children: [
      {
        id: 3,
        image: "/images/product.webp",
        name: {
          ar: "رجالي",
          en: "Men",
        },
        slug: "/clothes/men",
        children: [],
      },
    ],
  },
  {
    id: 2,
    image: "/images/product.webp",
    name: {
      ar: "المنظفات",
      en: "Detergants",
    },
    slug: "/clothes",
    children: [
      {
        id: 4,
        image: "/images/product.webp",
        name: {
          ar: "مساحيق الغسيل",
          en: "Washing Powders",
        },
        slug: "/clothes",
        children: [],
      },
    ],
  },
];
