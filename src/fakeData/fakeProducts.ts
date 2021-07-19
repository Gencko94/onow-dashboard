import { PRODUCT } from "../interfaces/products/products";

export const product1: PRODUCT = {
  active: true,
  category: {
    name: {
      ar: "fdsa",
      en: "fdsa",
    },
    id: 1,
  },
  sku: "123",
  quantity: 1,

  description: {
    ar: "fdsa",
    en: "fdsa",
  },
  id: 1,
  images: ["/images/product.webp"],
  image: "/",
  name: {
    ar: "fds",
    en: "fdsa",
  },
  price: 1,
  price_by_options: false,
  slug: "slug",
  options: [
    {
      id: 1,
      name: { en: "Size", ar: "المقاس" },
      select_type: "single",
      required: true,
      max_picks: 1,
      values: [
        {
          id: 1,
          name: {
            ar: "صغير",
            en: "Small",
          },
          price: "0.3",
          quantity: 2,
          sku: "fdsa",
        },
      ],
    },
  ],
  allow_attachments: true,
  allow_side_notes: true,
  branch_availability: { all: true, branches: [] },
  max_qty_per_user: 2,
  prep_time: 2,
};

export const products: PRODUCT[] = [product1];
