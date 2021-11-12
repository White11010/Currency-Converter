<template>
  <div class="cc-converter-page">
    Converter page
    <input type="text" v-model="inputString">
    <p>{{inputString}}</p>
    <span v-for="(word, index) in inputArray" :key="index">{{index}}: {{word}} </span>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  name: 'cc-converter-page',
  data() {
    return {
      inputString: '',
      inputArray: [],
      isInputValid: false,
      // inputValue: null,
      // inputCurrency1: '',
      // inputCurrency2: '',
    }
  },
  computed: {
    ...mapGetters([
      "VALUTES"
    ])
  },
  watch: {
    inputString() {
      this.inputParse();
    }
  },
  methods: {
    ...mapActions([
      "GET_CURRENCIES_FROM_API"
    ]),
    inputParse() {
      this.inputArray = this.inputString.split(' ');
      this.inputValidate();
    },
    inputValidate() {
      let check = false;
      for (let key in this.VALUTES.keys) {
        if (this.inputArray[1].toUpperCase() == key) {
          check = true;
          break;
        }
      }
      console.log(check);
    },
  },
  mounted() {
    this.GET_CURRENCIES_FROM_API();
  }
}
</script>

<style>

</style>