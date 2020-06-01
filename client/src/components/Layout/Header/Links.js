export default {
  signedOut: [
    {
      name: "Home",
      link: "/",
      loadComponent: true,
    },
    {
      name: "Installations",
      link: "/installations",
      loadComponent: true,
    },
    {
      name: "About",
      link: "/about",
      loadComponent: true,
    },
    {
      name: "FAQs",
      link: "faqs",
      loadComponent: true,
    },
    {
      name: "Write",
      link: "/write",
      loadComponent: true,
    },
    {
      name: "Login",
      call: "login",
      loadComponent: false,
    },
  ],
  signedIn: [
    {
      name: "Home",
      link: "/",
      loadComponent: true,
    },
    {
      name: "Installations",
      link: "/installations",
      loadComponent: true,
    },
    {
      name: "About",
      link: "/about",
      loadComponent: true,
    },
    {
      name: "FAQs",
      link: "faqs",
      loadComponent: true,
    },
    {
      name: "Logout",
      call: "logout",
      loadComponent: false,
    },
  ],
};
