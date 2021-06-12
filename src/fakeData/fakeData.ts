// import { CATEGORY } from '../interfaces/categories/categories';
import { MINI_CATEGORY } from "../interfaces/categories/categories";
import { MINI_PRODUCT, PRODUCT } from "../interfaces/products/products";
import { FOOTER_DESIGN } from "../interfaces/website-layout/designs/footer-design";
import { HEADER_DESIGN } from "../interfaces/website-layout/designs/header-design";
import { PRODUCT_GRID_DESIGN } from "../interfaces/website-layout/designs/product-grid-design";

export const headerDesign1: HEADER_DESIGN = {
  id: 1,
  main: {
    order: ["logo", "search", "icons"],
    styles: {
      backgroundColor: "#252525",
    },
  },
  categoryBar: {
    enabled: true,
    styles: {
      backgroundColor: "#f1f1f1",
      textColor: "#252525",
    },
    categories: [
      {
        id: 1,
        name: "Category text 1",
      },
      {
        id: 2,
        name: "Category text 2",
      },
    ],
  },
  isSelected: true,
};
export const headerDesign2: HEADER_DESIGN = {
  id: 2,
  main: {
    order: ["logo", "search", "icons"],
    styles: {
      backgroundColor: "#252525",
    },
  },
  categoryBar: {
    enabled: true,
    styles: {
      backgroundColor: "#f1f1f1",
      textColor: "#252525",
    },
    categories: [
      {
        id: 1,
        name: "Category text 1",
      },
    ],
  },
  isSelected: false,
};
export const footerDesign1: FOOTER_DESIGN = {
  id: 1,
  isSelected: true,
  order: ["logo", "contact-form", "office-location", "nav-links"],
  navLinksOptions: {},
  officeLocationOptions: {},
  styles: {
    backgroundColor: "#252525",
    textColor: "#fff",
  },
};
export const productGridDesign1: PRODUCT_GRID_DESIGN = {
  id: 1,
  title: "New Arrivals",
  isSelected: true,
  ctaOptions: {
    enabled: true,
    text: "See All",
    styles: {
      backgroundColor: "#b72b2b",
      textColor: "#fff",
    },
  },
  gridOptions: {
    itemsPerRow: {
      large: 7,
      medium: 2,
      small: 2,
    },
  },
  itemsFrom: "category",
  category: null,
  products: [],
  type: "swiper",
  itemStyles: {
    outline: "shadow",
  },
};
export const productGridDesign2: PRODUCT_GRID_DESIGN = {
  id: 2,
  title: "New Arrivals",
  isSelected: true,
  ctaOptions: {
    enabled: true,
    text: "See All",
    styles: {
      backgroundColor: "#b72b2b",
      textColor: "#fff",
    },
  },
  gridOptions: {
    itemsPerRow: {
      large: 7,
      medium: 2,
      small: 2,
    },
  },
  itemsFrom: "category",
  category: null,
  products: [],

  type: "grid",
  itemStyles: {
    outline: "border",
  },
};
export const headerDesigns: HEADER_DESIGN[] = [
  {
    id: 1,
    main: {
      order: ["search", "logo", "icons"],
      styles: {
        backgroundColor: "#252525",
      },
    },
    categoryBar: {
      enabled: true,
      styles: {
        backgroundColor: "#f1f1f1",
        textColor: "#252525",
      },
      categories: [
        {
          id: 1,
          name: "Category text 1",
        },
        {
          id: 2,
          name: "Category text 2",
        },
      ],
    },
    isSelected: true,
  },

  {
    id: 2,
    main: {
      order: ["logo", "search", "icons"],
      styles: {
        backgroundColor: "#252525",
      },
    },
    categoryBar: {
      enabled: true,
      styles: {
        backgroundColor: "#f1f1f1",
        textColor: "#252525",
      },
      categories: [
        {
          id: 1,
          name: "Category text 1",
        },
      ],
    },
    isSelected: false,
  },
];
export const footerDesigns: FOOTER_DESIGN[] = [
  {
    id: 1,
    isSelected: true,
    order: ["logo", "contact-form", "office-location", "nav-links"],
    navLinksOptions: {},
    officeLocationOptions: {},
    styles: {
      backgroundColor: "#252525",
      textColor: "#fff",
    },
  },
];
export const productGridDesigns: PRODUCT_GRID_DESIGN[] = [
  {
    id: 1,
    title: "New Arrivals",
    isSelected: true,
    ctaOptions: {
      enabled: true,
      text: "See All",
      styles: {
        backgroundColor: "#b72b2b",
        textColor: "#fff",
      },
    },
    gridOptions: {
      itemsPerRow: {
        large: 7,
        medium: 4,
        small: 2,
      },
    },
    itemsFrom: "category",
    products: [],
    category: null,
    type: "swiper",
    itemStyles: {
      outline: "shadow",
    },
  },
  {
    id: 2,
    title: "New Arrivals",
    isSelected: true,
    ctaOptions: {
      enabled: true,
      text: "See All",
      styles: {
        backgroundColor: "#b72b2b",
        textColor: "#fff",
      },
    },
    gridOptions: {
      itemsPerRow: {
        large: 7,
        medium: 4,
        small: 2,
      },
    },
    itemsFrom: "category",
    products: [],
    category: null,
    type: "grid",
    itemStyles: {
      outline: "border",
    },
  },
];
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
