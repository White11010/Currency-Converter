<template>
  <div class="cc-converter-page" v-on:keyup.enter="onEnter">
    <div class="cc-converter-page__input-form form">
      <p class="form-__nstruction">
        Input string in format "15 usd in rub" to convert
      </p>
      <input class="form__input" type="text" v-model="inputString" />
      <p class="form__result">{{ result }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "cc-converter-page",
  data() {
    return {
      inputString: "",
      inputArray: [],
      isInputValid: false,
      result: "",
    };
  },
  computed: {
    ...mapGetters(["VALUTES"]),
  },
  watch: {
    inputString() {
      this.inputParse();
    },
  },
  methods: {
    ...mapActions(["GET_CURRENCIES_FROM_API"]),
    inputParse() {
      this.inputArray = this.inputString.split(" ");
    },
    inputValidate() {
      let check1 = false;
      let check2 = false;
      let currencyCodes = Object.keys(this.VALUTES);

      //Проверка первой элемента строки
      if (isNaN(this.inputArray[0])) {
        this.result = "Input should started from a number!";
        return false;
      }
      //Проверка третьего элемента строки
      if (this.inputArray[2].toLowerCase() != "in") {
        this.result = 'You should input "in" on the 3d position';
        return false;
      }
      //Проверка второго и четвертого элемента строки
      if (
        this.inputArray[1].toUpperCase() != "RUB" &&
        this.inputArray[3].toUpperCase() != "RUB"
      ) {
        currencyCodes.forEach((key) => {
          if (this.inputArray[1].toUpperCase() == key) {
            check1 = true;
          }
          if (this.inputArray[3].toUpperCase() == key) {
            check2 = true;
          }
        });
      } else if (
        this.inputArray[1].toUpperCase() == "RUB" &&
        this.inputArray[3].toUpperCase() == "RUB"
      ) {
        check1 = true;
        check2 = true;
      } else if (this.inputArray[1].toUpperCase() == "RUB") {
        check1 = true;
        currencyCodes.forEach((key) => {
          if (this.inputArray[3].toUpperCase() == key) {
            check2 = true;
          }
        });
      } else if (this.inputArray[3].toUpperCase() == "RUB") {
        check2 = true;
        currencyCodes.forEach((key) => {
          if (this.inputArray[1].toUpperCase() == key) {
            check1 = true;
          }
        });
      }

      if (check1 && check2) return true;

      this.result = "Please, input right currencies codes";
      return false;
    },
    onEnter() {
      if (this.inputArray.length == 4) {
        this.isInputValid = this.inputValidate();
        if (!this.isInputValid) {
          return;
        }
      } else {
        this.result = "Write input in correct format";
        return;
      }

      let currencyValue1;
      let currencyValue2;

      if (
        this.inputArray[1].toUpperCase() != "RUB" &&
        this.inputArray[3].toUpperCase() != "RUB"
      ) {
        for (let key in this.VALUTES) {
          if (this.inputArray[1].toUpperCase() == key) {
            currencyValue1 = this.VALUTES[key].Value;
          }
          if (this.inputArray[3].toUpperCase() == key) {
            currencyValue2 = this.VALUTES[key].Value;
          }
        }
      } else if (
        this.inputArray[1].toUpperCase() == "RUB" &&
        this.inputArray[3].toUpperCase() == "RUB"
      ) {
        currencyValue1 = 1;
        currencyValue2 = 1;
      } else if (this.inputArray[1].toUpperCase() == "RUB") {
        currencyValue1 = 1;
        for (let key in this.VALUTES) {
          if (this.inputArray[3].toUpperCase() == key) {
            currencyValue2 = this.VALUTES[key].Value;
          }
        }
      } else if (this.inputArray[3].toUpperCase() == "RUB") {
        currencyValue2 = 1;
        for (let key in this.VALUTES) {
          if (this.inputArray[1].toUpperCase() == key) {
            currencyValue1 = this.VALUTES[key].Value;
          }
        }
      }

      this.result =
        this.inputArray[0] +
        " " +
        this.inputArray[1].toUpperCase() +
        " = " +
        ((this.inputArray[0] * currencyValue1) / currencyValue2).toFixed(3) +
        " " +
        this.inputArray[3].toUpperCase();
      //   }
    },
  },
  mounted() {
    this.GET_CURRENCIES_FROM_API();
  },
};
</script>

<style>
.cc-converter-page {
  height: calc(100%-80px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.cc-converter-page__input-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  font-size: 1.5rem;
}
.cc-converter-page__input-form > * {
  margin: 1.5rem 0;
}

.form__input {
  font-size: 1.5rem;
  width: 80%;
  border: none;
  outline: none;
  border-bottom: 1px solid black;
}
</style>
