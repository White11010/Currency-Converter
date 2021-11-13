<template>
  <div class="cc-currencies-page">
    <div class="cc-currencies-page__choose-menu">
      <p class="cc-currencies-page__base-currency">Base currency: {{baseCurrency}}</p>
      <button class="cc-currencies-page__choose-button" @click="isSelectVisible = !isSelectVisible">Change</button>
      <div 
        class="cc-currencies-page__currencies-list currencies-list"
        v-if="isSelectVisible"
      >
        <div 
          class="currencies-list__item"
          v-for="(currencyData, currencyKey) in this.VALUTES"
          :key="currencyKey"
          @click="baseCurrency=this.VALUTES[currencyKey].CharCode"
        >
          {{this.VALUTES[currencyKey].CharCode}}
        </div>
        <div 
          class="currencies-list__item"
          @click="baseCurrency='RUB'"
        >
          RUB
        </div>  
      </div>
    </div>
    <div class="cc-currencies-page__currency-list">
      <div 
        class="cc-currencies-page__currency"
        v-for="(currencyData, currencyKey) in this.VALUTES"
        :key="currencyKey"
      >
        <p v-if="baseCurrency == 'RUB'" class="currency-list__item"><span>{{this.VALUTES[currencyKey].CharCode}}</span><span>{{this.VALUTES[currencyKey].Value}}</span></p>
        <p v-else class="currency-list__item"><span>{{this.VALUTES[currencyKey].CharCode}}</span><span>{{(this.VALUTES[this.baseCurrency].Value/this.VALUTES[currencyKey].Value).toFixed(5)}}</span></p>
      </div>
    </div>

    
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  name: 'cc-currencies-page',
  data() {
    return{
      isSelectVisible: false,
      baseCurrency: ''
    }
  },
  computed: {
    ...mapGetters([
      "VALUTES"
    ]),
  }, 
  methods:{
    ...mapActions([
      "GET_CURRENCIES_FROM_API"
    ]),
    getDefaultCurrency() {
      let userLang = (navigator.language || navigator.userLanguage || navigator.systemLanguage).substr(0,2);
      userLang == "ru" ? this.baseCurrency = "RUB" :  this.baseCurrency = "USD";
    }
  },
  created() {
    this.GET_CURRENCIES_FROM_API();
    this.getDefaultCurrency();
    document.onclick = (e) => {
      if (e.target.className != "cc-currencies-page__choose-button") this.isSelectVisible = false;
    }
  }
}
</script>

<style>
  .cc-currencies-page{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cc-currencies-page__base-currency{
    font-size: 1.2rem;
    padding: 1.5rem;
  }
  .cc-currencies-page__choose-menu{
    display: flex;
    align-items: center;
    position: relative;
  }
  .cc-currencies-page__currencies-list{
    position: absolute;
    bottom: -238px;
    right: -50%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem 2.5rem;   
    background-color: rgb(69, 180, 134);
    color: white;
    padding: 1rem;
  }
  .currencies-list__item{
    cursor: pointer;
  }
  .cc-currencies-page__choose-button{
    font-size: 1.2rem;
    box-sizing: border-box;
    padding: 0.25rem;
    background-color: rgb(69, 180, 134);
    border: none;
    color: white;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  .cc-currencies-page__choose-button:hover{
    box-shadow: 0 0 0.5rem rgba(69, 180, 134, 0.9);
  }
  .cc-currencies-page__currency{
    width: 9rem;
    display: flex;
    justify-content:space-between;
  }
  .cc-currencies-page__currency-list{
    padding-top: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 10rem;
  }
  .currency-list__item{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  
</style>