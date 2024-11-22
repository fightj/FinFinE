<template>
  <div>
    <v-container align="center">
      <h1 class="ibm-plex-sans-kr-bold my-5">환율 계산기</h1>
      <v-form>
        <v-col cols="5">
          <v-select
            class="custom-select"
            v-model="state"
            :items="states"
            label="기준"
          ></v-select>
        </v-col>
        <v-col cols="5">
          <v-select
            class="custom-select"
            v-model="country"
            :items="store.curName"
            label="통화 선택"
          ></v-select>
        </v-col>
        <p class="ibm-plex-sans-kr-regular my-5">원하는 금액을 입력하세요.</p>
        <v-col cols="5">
          <v-text-field
            class="custom-text-field"
            v-model="exchangeBefore"
            :label="exchangeDetail.cur_unit"
          ></v-text-field>
        </v-col>
        <div class="mt-5 ibm-plex-sans-kr-regular">
          <v-text-field
            v-model="exchangeAfter"
            prefix="₩"
            label="KRW"
            style="display: none"
          ></v-text-field>
          <span v-if="typeof exchangeAfter === 'number'">
            <div>
              계산 결과는
              <h2>
                {{
                  new Intl.NumberFormat("ko-KR", {
                    style: "currency",
                    currency: "KRW",
                  }).format(Math.round(exchangeAfter))
                }}원
              </h2>
              입니다.
            </div>
          </span>
          <span v-else>{{ exchangeAfter }}</span>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useExchangeStore } from "@/stores/exchange";
const store = useExchangeStore();

const states = ["송금 받을 때", "송금 보낼 때", "매매 기준율"];
const state = ref("");
const country = ref("");
const exchangeDetail = ref({});
const exchangeBefore = ref("");
const exchangeAfter = ref("조건을 입력해주세요.");
// console.log(store.exchangeInfo)
onMounted(() => {
  store.getExchangeInfo();
});

const updateExchangeDetail = () => {
  exchangeDetail.value =
    store.exchangeInfo.find((item) => item.cur_nm === country.value) || {};
  calculateExchange();
};

const calculateExchange = function () {
  if (state.value == "송금 받을 때" && exchangeDetail.value.ttb) {
    exchangeDetail.value.ttb = exchangeDetail.value.ttb.replace(",", "");
    exchangeAfter.value =
      Number(exchangeBefore.value) * Number(exchangeDetail.value.ttb);
  } else if (state.value == "송금 보낼 때" && exchangeDetail.value.tts) {
    exchangeDetail.value.tts = exchangeDetail.value.tts.replace(",", "");
    exchangeAfter.value =
      Number(exchangeBefore.value) * Number(exchangeDetail.value.tts);
  } else if (state.value == "매매 기준율" && exchangeDetail.value.deal_bas_r) {
    exchangeDetail.value.deal_bas_r = exchangeDetail.value.deal_bas_r.replace(
      ",",
      ""
    );
    exchangeAfter.value =
      Number(exchangeBefore.value) * Number(exchangeDetail.value.deal_bas_r);
  } else if (!(state.value && country.value && exchangeBefore.value)) {
    exchangeAfter.value = "조건을 입력해주세요.";
  }
};

watch([state, country], () => {
  updateExchangeDetail();
});

watch(exchangeBefore, calculateExchange);
</script>

<style scoped>
.custom-select {
  background-color: #bbf3faaf; /* 원하는 배경 색상 */
  /* 테스트 색상 */
  color: #2c65af;
  font-weight: bold;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1); /* 그림자 */
  border-radius: 8px;
}
.custom-text-field {
  background-color: #bbf3faaf; /* 원하는 배경 색상 */
  color: #f7f4f1;
  font-weight: bold;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1); /* 그림자 */
  border-radius: 8px;
}
</style>