const ROOTS = {
  AUTH: "/auth",
  MAIN: "/",
};

export const ROUTES = {
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
  },
  main: {
    home: ROOTS.MAIN,
    contactUs: `${ROOTS.MAIN}contact-us`,
    faq: `${ROOTS.MAIN}faq`,
    products: `${ROOTS.MAIN}products`,
    cart: `${ROOTS.MAIN}cart`,
    profile: `${ROOTS.MAIN}profile`,
  },
};
