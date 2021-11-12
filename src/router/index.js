import { createRouter, createWebHashHistory } from "vue-router";
import ccConverterPage from "../components/cc-converter-page";
import ccCurrenciesPage from "../components/cc-currencies-page";

const routes = [
  {
    path: "/",
    name: "Converter",
    component: ccConverterPage,
  },
  {
    path: "/currencies",
    name: "Currencies",
    component: ccCurrenciesPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
