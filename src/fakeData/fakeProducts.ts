import { PRODUCT } from "../interfaces/products/products";

export const product1: PRODUCT = {
  category: {
    name: "test",
    id: 1,
  },
  quantity: 1,
  category_id: ["1"],
  description: {
    ar: "fdsa",
    en: "fdsa",
  },
  id: 1,
  images: [
    {
      is_default: false,
      url: "/images/product.webp",
    },
  ],
  name: {
    ar: "fds",
    en: "fdsa",
  },
  price: 1,
  price_by_options: false,
  slug: "slug",
  options: [
    {
      name: { en: "Size", ar: "المقاس" },
      select_type: "single",
      required: true,
      max_picks: 1,
      values: [
        {
          name: {
            ar: "صغير",
            en: "Small",
          },
          price: "0.3",
          qty: 2,
          sku: "fdsa",
        },
      ],
    },
  ],
  allow_attachments: true,
  allow_side_notes: true,
  branch_availability: { all: true, branches: [] },
  max_qty_per_user: 2,
  prep_time: {
    time: 2,
    unit: "minutes",
  },
};

export const products: PRODUCT[] = [product1];
