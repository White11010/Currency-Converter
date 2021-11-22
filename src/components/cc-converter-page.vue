<template>
  <div class="cc-converter-page">
    <div class="cc-converter-page__wrapper">
      <div class="cc-converter-page__calc-block calc">
        <h3 class="calc__title">I have</h3>
        <div class="calc__switcher">
          <div
            v-for="(currency, index) in this.firstBaseCurrencies"
            :key="index"
            class="calc__switcher-item"
            :class="{
              calc__switcher__item__active:
                currency == this.firstActiveCurrency,
            }"
            @click="
              setFirstActiveCurrency(currency);
              secondInputCalc();
            "
          >
            {{ currency }}
          </div>
          <div
            class="calc__switcher-button"
            :class="{ arrow__active: isFirstListVisible }"
            @click="
              isFirstListVisible = !isFirstListVisible;
              isSecondListVisible = false;
            "
          >
            <img
              class="calc__switcher-arrow"
              src="../assets/images/arrow-down.svg"
              alt="show-list"
            />
          </div>
          <div class="calc__list list" v-if="isFirstListVisible">
            <div
              class="list__item"
              v-for="currency in this.VALUTES"
              :key="currency.ID"
            >
              <p
                class="list__code"
                @click="setFirstOptionalCurrency(currency.CharCode)"
              >
                {{ currency.CharCode }}
              </p>
            </div>
          </div>
        </div>
        <div class="calc__input-area">
          <!-- Здесь используется :value, а не директива v-model, для ограничения максимальной длины вводимого числа. Связывание происходит через вызов метода updateFirstValue -->
          <input
            type="number"
            class="calc__input-field"
            :class="{ calc__input__field__small: isSmallFont }"
            :value="firstInput"
            @keydown="checkKeyCode"
            @input="updateFirstValue"
            @keyup="firstInputCalc()"
          />
          <p class="calc__rate">{{ firstRate }}</p>
        </div>
      </div>
      <div class="cc-converter-page__switcher">
        <img
          src="../assets/images/arrows-pic.svg"
          alt="switch"
          class="cc-converter-page__arrows"
          @click="reverse()"
        />
      </div>
      <div class="cc-converter-page__calc-block calc">
        <h3 class="calc__title">I want to buy</h3>
        <div class="calc__switcher">
          <div
            v-for="(currency, index) in this.secondBaseCurrencies"
            :key="index"
            class="calc__switcher-item"
            :class="{
              calc__switcher__item__active:
                currency == this.secondActiveCurrency,
            }"
            @click="
              setSecondActiveCurrency(currency);
              firstInputCalc();
            "
          >
            {{ currency }}
          </div>
          <div
            class="calc__switcher-button"
            :class="{ arrow__active: isSecondListVisible }"
            @click="
              isSecondListVisible = !isSecondListVisible;
              isFirstListVisible = false;
            "
          >
            <img
              class="calc__switcher-arrow"
              src="../assets/images/arrow-down.svg"
              alt="show-list"
            />
          </div>
          <div class="calc__list list second-list" v-if="isSecondListVisible">
            <div
              class="list__item"
              v-for="currency in this.VALUTES"
              :key="currency.ID"
            >
              <p
                class="list__code"
                @click="setSecondOptionalCurrency(currency.CharCode)"
              >
                {{ currency.CharCode }}
              </p>
            </div>
          </div>
        </div>
        <div class="calc__input-area">
          <!-- Здесь используется :value, а не директива v-model, для ограничения максимальной длины вводимого числа. Связывание происходит через вызов метода updateSecondValue -->
          <input
            type="number"
            class="calc__input-field"
            :class="{ calc__input__field__small: isSmallFont }"
            :value="secondInput"
            @keydown="checkKeyCode"
            @input="updateSecondValue"
            @keyup="secondInputCalc()"
          />
          <p class="calc__rate">{{ secondRate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "cc-converter-page",
  data() {
    return {
      firstBaseCurrencies: ["RUB", "USD", "EUR", "GBP"],
      secondBaseCurrencies: ["RUB", "USD", "EUR", "GBP"],
      firstActiveCurrency: "USD",
      secondActiveCurrency: "EUR",
      firstInput: null,
      secondInput: null,
      firstRate: null,
      secondRate: null,
      isFirstListVisible: false,
      isSecondListVisible: false,
      isSmallFont: false,
      isMaxLength: false,
      keyCode: null,
      inputMaxLength: 11,
    };
  },
  computed: {
    ...mapGetters(["VALUTES"]),
  },
  watch: {
    firstInput() {
      if (this.firstInput == 0 || this.firstInput == null) {
        this.reset();
      } else {
        this.setRates();
      }
    },
    secondInput() {
      if (this.secondInput == 0 || this.secondInput == null) {
        this.reset();
      } else {
        this.setRates();
        this.secondInput.toString().length >= 11 ||
        (this.firstInput != null && this.firstInput.toString().length >= 11)
          ? (this.isSmallFont = true)
          : (this.isSmallFont = false);
      }
    },
  },
  methods: {
    ...mapActions(["GET_CURRENCIES_FROM_API"]),
    //Сохраняем код нажатой клавиши в поле ввода для дальнейшей првоерки в методах updateFirstValue и updateSecondValue. Значение this.keyCodr сбрасывается в null в конце этиx методов после проверки.
    checkKeyCode(event) {
      this.keyCode = event.key;
    },
    updateFirstValue(event) {
      const value = event.target.value;
      if (
        String(value).length <= this.inputMaxLength ||
        this.keyCode === "Backspace"
      ) {
        this.firstInput = value;
      }
      this.$forceUpdate();
      this.keyCode = null;
    },
    updateSecondValue(event) {
      const value = event.target.value;
      if (
        String(value).length <= this.inputMaxLength ||
        this.keyCode === "Backspace"
      ) {
        this.secondInput = value;
      }
      this.$forceUpdate();
      this.keyCode = null;
    },
    //Optional Currency - четвертая валюта в массивах baseCurrencies. Она выбирается пользователем (по умолчанию - фунт стерлингов GBP)
    setFirstOptionalCurrency(code) {
      if (code !== "RUB" && code !== "USD" && code !== "EUR") {
        this.firstBaseCurrencies[3] = code;
        this.firstActiveCurrency = code;
      } else {
        this.firstActiveCurrency = code;
      }
      this.isFirstListVisible = false;
    },
    setSecondOptionalCurrency(code) {
      if (code !== "RUB" && code !== "USD" && code !== "EUR") {
        this.secondBaseCurrencies[3] = code;
        this.secondActiveCurrency = code;
      } else {
        this.secondActiveCurrency = code;
      }
      this.isSecondListVisible = false;
    },
    setFirstActiveCurrency(currency) {
      this.firstActiveCurrency = currency;
    },
    setSecondActiveCurrency(currency) {
      this.secondActiveCurrency = currency;
    },
    firstInputCalc() {
      this.secondInput = parseFloat(
        (
          (this.firstInput * this.VALUTES[this.firstActiveCurrency].Value) /
          this.VALUTES[this.secondActiveCurrency].Value
        ).toFixed(4)
      );
    },
    secondInputCalc() {
      this.firstInput = parseFloat(
        (
          (this.secondInput * this.VALUTES[this.secondActiveCurrency].Value) /
          this.VALUTES[this.firstActiveCurrency].Value
        ).toFixed(4)
      );
    },
    setRates() {
      this.firstRate =
        "1 " +
        this.firstActiveCurrency +
        " = " +
        parseFloat(
          (
            this.VALUTES[this.firstActiveCurrency].Value /
            this.VALUTES[this.secondActiveCurrency].Value
          ).toFixed(4)
        ) +
        " " +
        this.secondActiveCurrency;
      this.secondRate =
        "1 " +
        this.secondActiveCurrency +
        " = " +
        parseFloat(
          (
            this.VALUTES[this.secondActiveCurrency].Value /
            this.VALUTES[this.firstActiveCurrency].Value
          ).toFixed(4)
        ) +
        " " +
        this.firstActiveCurrency;
    },
    reverse() {
      [this.firstActiveCurrency, this.secondActiveCurrency] = [
        this.secondActiveCurrency,
        this.firstActiveCurrency,
      ];
      [this.firstBaseCurrencies[3], this.secondBaseCurrencies[3]] = [
        this.secondBaseCurrencies[3],
        this.firstBaseCurrencies[3],
      ];
      this.firstInputCalc();
    },
    reset() {
      this.firstInput = null;
      this.secondInput = null;
      this.firstRate = null;
      this.secondRate = null;
    },
  },
  mounted() {
    this.GET_CURRENCIES_FROM_API();
  },
};
</script>

<style>
.cc-converter-page {
  height: calc(100% - 5rem);
}
.cc-converter-page__wrapper {
  margin: 0 auto;
  width: min(100%, 1000px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  padding: 2rem 2rem 4rem 2rem;
}
.cc-converter-page__calc-block {
  flex: 1;
  margin: 0 3rem;
  display: flex;
  flex-direction: column;
}
.cc-converter-page__calc-block:last-child {
  padding-bottom: 1rem;
}
.calc__title {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
}
.calc__switcher {
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(100, 100, 100);
  position: relative;
}
.calc__switcher-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;
  cursor: pointer;
  border-right: 1px solid rgb(100, 100, 100);
}
.calc__switcher-item:first-child {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.calc__switcher-item:hover,
.calc__switcher-item:focus {
  background-color: rgba(69, 180, 134, 0.356);
}
.calc__switcher__item__active {
  background-color: rgb(69, 180, 134) !important;
}
.calc__switcher-button {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;
  cursor: pointer;
  user-select: none;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.calc__switcher-arrow {
  width: 1.5rem;
  height: auto;
}
.arrow__active {
  transform: rotate(180deg);
  background-color: rgb(69, 180, 134) !important;
}
.calc__input-area {
  min-height: 8rem;
  height: 20rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid rgb(100, 100, 100);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.calc__input-field {
  font-size: 3rem;
  height: 80%;
  width: 80%;
  border: none;
  outline: none;
}
.calc__input__field__small {
  font-size: 2rem !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
.cc-converter-page__switcher {
  width: 3rem;
  display: flex;
  align-items: center;
}
.cc-converter-page__arrows {
  width: 100%;
  height: auto;
  cursor: pointer;
  opacity: 0.8;
  user-select: none;
}
.cc-converter-page__arrows:hover {
  opacity: 0.5;
}
.calc__rate {
  padding-bottom: 1rem;
}
.calc__list {
  position: absolute;
  z-index: 999;
  top: 4rem;
  left: -25%;
  width: 150%;
  height: auto;
  background-color: rgb(69, 180, 134);
  color: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.list__item {
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
}
.list__code {
  cursor: pointer;
}
.list__code:hover {
  font-weight: 600;
}

@media screen and (max-width: 768px) {
  .cc-converter-page__wrapper {
    flex-direction: column;
  }
  .cc-converter-page__switcher {
    padding: 2rem 0;
    transform: rotate(90deg);
  }
  .calc__input-area {
    height: unset;
    flex: 1;
  }
  .cc-converter-page__calc-block {
    width: 100%;
  }
  .second-list {
    top: -20rem;
  }
}
@media screen and (max-width: 1070px) {
  .calc__list {
    left: -0.5rem;
    width: 100%;
    padding: 0.5rem;
  }
}
</style>
