// src/stores/exchange.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue'

export const useExchangeStore = defineStore('exchange', () => {
  const curName = ref([])
  const exchangeInfo = ref([])
  const getExchangeInfo = function() {
    axios({
      method:'get',
      url: 'http://127.0.0.1:8000/exchange/'
    })
    .then((response) => {
      response.data.forEach(item => {
        curName.value.push(item.cur_nm)
        exchangeInfo.value.push(item)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return { curName, exchangeInfo, getExchangeInfo }
})