// import { CATEGORY } from '../interfaces/categories/categories';
import { MINI_CATEGORY } from "../interfaces/categories/categories";
import { MINI_PRODUCT, PRODUCT } from "../interfaces/products/products";
export const fakeProduct: PRODUCT = {
  id: 1,
  active: false,
  allow_attachments: false,
  allow_side_notes: false,
  branch_availability: { all: true, branches: [] },
  name: { en: "Product 1", ar: "برودكت 1" },
  category: { id: 1, name: { en: "Category 1", ar: "كاتيغوري 1" } },
  description: {
    en: "Description",
    ar: "وصف",
  },
  image: "",
  images: [],
  max_qty_per_user: 1,
  options: [],
  prep_time: 0,
  price: 1,
  price_by_options: false,
  quantity: 1,
  sku: "sku",
  slug: "slug",
};
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
