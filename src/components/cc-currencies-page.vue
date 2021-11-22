<template>
  <div class="cc-currencies-page">
    <div class="cc-currencies-page__choose-menu">
      <h3 class="cc-currencies-page__base-currency">
        Base currency: {{ this.BASE_CURRENCY }}
      </h3>
      <button
        class="cc-currencies-page__choose-button"
        @click="isSelectVisible = !isSelectVisible"
      >
        Change
      </button>
      <div
        class="cc-currencies-page__currencies-list currencies-list"
        v-if="isSelectVisible"
      >
        <div
          class="currencies-list__item"
          v-for="(currencyData, currencyKey) in this.CURRENCIES_WITHOUT_BASE"
          :key="currencyKey"
          @click="changeBaseCurrency(currencyData.CharCode)"
        >
          {{ this.VALUTES[currencyKey].CharCode }}
        </div>
      </div>
    </div>
    <div class="cc-currencies-page__rates-list rates-list">
      <div
        class="rates-list__item"
        v-for="(currencyData, currencyKey) in this.CURRENCIES_WITHOUT_BASE"
        :key="currencyKey"
      >
        <p class="currency-list__item">
          <span>{{ this.VALUTES[currencyKey].CharCode }}</span
          ><span>{{
            (
              this.VALUTES[currencyKey].Value /
              this.VALUTES[this.BASE_CURRENCY].Value
            ).toFixed(5)
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "cc-currencies-page",
  data() {
    return {
      isSelectVisible: false,
      // baseCurrency: 'RUB'
    };
  },
  computed: {
    ...mapGetters(["VALUTES", "CURRENCIES_WITHOUT_BASE", "BASE_CURRENCY"]),
  },
  methods: {
    ...mapActions(["GET_CURRENCIES_FROM_API", "CHANGE_BASE_CURRENCY"]),
    changeBaseCurrency(currency) {
      this.CHANGE_BASE_CURRENCY(currency);
    },
  },
  created() {
    this.GET_CURRENCIES_FROM_API();
    document.onclick = (e) => {
      if (e.target.className != "cc-currencies-page__choose-button")
        this.isSelectVisible = false;
    };
  },
};
</script>

<style>
.cc-currencies-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cc-currencies-page__base-currency {
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1.5rem;
}
.cc-currencies-page__choose-menu {
  display: flex;
  align-items: center;
  position: relative;
}
.cc-currencies-page__currencies-list {
  position: absolute;
  top: 4rem;
  right: -50%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem 2.5rem;
  background-color: rgb(69, 180, 134);
  color: white;
  padding: 1rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}
.currencies-list__item {
  cursor: pointer;
}
.cc-currencies-page__choose-button {
  font-size: 1.2rem;
  box-sizing: border-box;
  padding: 0.5rem;
  background-color: rgb(69, 180, 134);
  border: none;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
}
.cc-currencies-page__choose-button:hover {
  box-shadow: 0 0 0.5rem rgba(69, 180, 134, 0.9);
}
.rates-list__item {
  width: 9rem;
  display: flex;
  justify-content: space-between;
}
.cc-currencies-page__rates-list {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 10rem;
}
.currency-list__item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 576px) {
  .cc-currencies-page__rates-list {
    box-sizing: border-box;
    width: 100%;
    gap: 1rem 22vw;
  }
  .rates-list__item {
    margin: 0 auto;
  }
  .cc-currencies-page__currencies-list {
    grid-template-columns: repeat(4, 1fr);
    right: 0 !important;
  }
}
</style>
