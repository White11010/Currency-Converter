import { createStore } from "vuex";
import axios from "axios";


export default createStore({
  state: {
    valutes: [],
  },
  mutations: {
    SET_CURRENCIES_TO_STATE: (state, res) => {
      state.valutes = res.Valute; 
    }
  },
  actions: {
    GET_CURRENCIES_FROM_API({commit}) {
      return axios('https://www.cbr-xml-daily.ru/daily_json.js', {
        method: "GET"
      })
      .then((res) => {
        commit('SET_CURRENCIES_TO_STATE', res.data);
        return res;
      }) 
      .catch((error) => {
        console.log(error);
        return error;
      })
    }
  },
  getters: { 
    VALUTES(state) {
      return state.valutes;
    } 
  }, 
  modules: {},
});
