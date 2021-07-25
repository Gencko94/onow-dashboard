// import { CATEGORY } from '../interfaces/categories/categories';
import { MINI_CATEGORY } from "../interfaces/categories/categories";
import { MINI_PRODUCT } from "../interfaces/products/products";

export const product1: MINI_PRODUCT = {
  id: 1,
  name: {
    en: "Body Lotion",
    ar: "مرطب للجسم",
  },
  image: "/images/product.webp",
  price: "2",
};
export const category1: MINI_CATEGORY = {
  id: 1,
  name: {
    en: "Category 1 example",
    ar: "مثال 1",
  },

  image: "/images/logo.png",
  slug: "/categories/category/1",
};
export const categories = [
  {
    id: 1,
    name: {
      en: "Category 1 example",
      ar: "مثال 1",
    },
    children: [
      {
        id: 1,
        name: {
          en: "Category 1 example",
          ar: "مثال 1",
        },
      },
      {
        id: 2,
        name: {
          en: "Category 1 example",
          ar: "مثال 2",
        },
      },
    ],
  },
];
