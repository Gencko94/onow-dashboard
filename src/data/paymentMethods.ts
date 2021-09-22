import { PAYMENT_GATEWAY } from "../interfaces/settings/payment-methods/payment-methods";

export const paymentGateways: PAYMENT_GATEWAY[] = [
  {
    name: { ar: "بووكي", en: "Bookey" },
    logo: "/images/bookeey.png",
    registration_link: "",
    info: {},
    supported_methods: [
      {
        logo: "/images/visa.svg",
        name: {
          ar: "بطاقات الإتمان",
          en: "Credit Cards",
        },
        settlementWindow: {
          ar: "5 ايام عمل",
          en: "5 working days",
        },
        fee: {
          ar: "2.5% للعملية , لا يوجد حد ادنى",
          en: "2.5% per transaction, no minimum.",
        },
      },
      {
        logo: "/images/knet.svg",
        name: {
          ar: "كي نت",
          en: "K-Net",
        },
        settlementWindow: {
          ar: "3 ايام عمل",
          en: "3 working days",
        },
        fee: {
          ar: "1% للعملية , لا يوجد حد ادنى",
          en: "1% per transaction, a minimum of 100 fills.",
        },
      },
    ],
  },
];
