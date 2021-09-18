import { MINI_CATEGORY } from "../interfaces/categories/categories";

export const miniCategories: MINI_CATEGORY[] = [
  {
    id: 7,
    image: "/images/product.webp",
    name: {
      ar: "الملابس",
      en: "Clothes",
    },
    slug: "/clothes",
    children: [
      {
        id: 6,
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
    id: 5,
    image: "/images/product.webp",
    name: {
      ar: "المنظفات",
      en: "Detergants",
    },
    slug: "/clothes",
    children: [
      {
        id: 9,
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
