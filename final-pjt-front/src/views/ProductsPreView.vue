<template>
  <div class="homebackcolor">
    <v-container class="px-16">
      <v-row justify="center" align="center">
        <v-col cols="6" align="center">
          <v-container class="cursor" @click="intoDeposits">
            <v-img class="hover-effect" :src="depositsPic" height="400px" width="200px"></v-img>
            <h1 class="ibm-plex-sans-kr-bold highlight-text">예금</h1>
          </v-container>
        </v-col>
        <v-col cols="6" align="center">
          <v-container class="cursor" @click="intoSavings">
            <v-img class="hover-effect" :src="savingsPic" height="400px" width="200px"></v-img>
            <h1 class="ibm-plex-sans-kr-bold highlight-text">적금</h1>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import savingsPic from "@/assets/savings.png";
import depositsPic from "@/assets/deposits.png";

import { useRouter } from "vue-router";
const router = useRouter();

// 예금
const intoDeposits = function () {
  router.push({ name: "DepositProductsView" });
};
// 적금
const intoSavings = function () {
  router.push({ name: "SavingProductsView" });
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}

.highlight-text {
  display: inline-block;
  background-color: #ffe7ba; /* 부드러운 오렌지 계열 배경 */
  padding: 0.3rem 0.8rem;    /* 패딩을 줄여 깔끔한 느낌 */
  border-radius: 6px;        /* 모서리 둥글게 */
  font-size: 1.2rem;         /* 글자 크기 조정 */
  font-weight: 600;          /* 약간 덜 굵게 */
  color: #444444;            /* 중립적인 진한 회색 */
  transition: background-color 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 */
}

.highlight-text:hover {
  background-color: #ffd699; /* 마우스 호버 시 더 진한 색상 */
  transform: translateY(-3px); /* 약간 떠오르는 효과 */
}

.homebackcolor {
  background-color: #FFFFF0; /* 전체 배경색 설정 */
}

.hover-effect {
  transition: transform 0.3s, filter 0.3s;
}

.hover-effect:hover {
  transform: scale(1.15); /* 확대 정도 약간 감소 */
  filter: brightness(0.95); /* 더 은은하게 */
}
</style>
