import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    valutes: {},
    currenciesList: {},
    baseCurrency: "RUB",
  },
  mutations: {
    SET_CURRENCIES_TO_STATE: (state, res) => {
      state.valutes = res.Valute;
      state.valutes["RUB"] = {
        CharCode: "RUB",
        Value: 1,
      };
    },
    SET_CURRENCIES_LIST_WITHOUT_BASE_TO_STATE: (state) => {
      state.currenciesList = JSON.parse(JSON.stringify(state.valutes));
      delete state.currenciesList[state.baseCurrency];
    },
    SET_BASE_CURRENCY_TO_STATE: (state, currency) => {
      state.baseCurrency = currency;
    },
  },
  actions: {
    GET_CURRENCIES_FROM_API({ commit }) {
      return axios("https://www.cbr-xml-daily.ru/daily_json.js", {
        method: "GET",
      })
        .then((res) => {
          commit("SET_CURRENCIES_TO_STATE", res.data);
          commit("SET_CURRENCIES_LIST_WITHOUT_BASE_TO_STATE");
          return res;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    CHANGE_BASE_CURRENCY({ commit }, baseCurrency) {
      console.log(baseCurrency);
      commit("SET_BASE_CURRENCY_TO_STATE", baseCurrency);
      commit("SET_CURRENCIES_LIST_WITHOUT_BASE_TO_STATE");
    },
  },
  getters: {
    VALUTES(state) {
      return state.valutes;
    },
    CURRENCIES_WITHOUT_BASE(state) {
      return state.currenciesList;
    },
    BASE_CURRENCY(state) {
      return state.baseCurrency;
    },
  },
  modules: {},
});
