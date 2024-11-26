<template>

  <div class="home-wrapper">
    <v-carousel show-arrows="hover" hide-delimiters height="auto" cycle>
      <v-carousel-item
        class="home-car-image"
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        cover
      >
        <!-- 짝수 - 왼쪽 아래 -->
        <v-chip
          variant="elevated"
          size="x-large"
          v-if="i === 2 || i === 0 || i ===4"
          class="home-chip-right"
          @click="goThere(item)"
          style="color: #000000;"
        >
        <strong>{{ item.content }}↗</strong></v-chip
        >
        <!-- 홀수 - 오른쪽 아래 -->
        <v-chip
          variant="elevated"
          size="x-large"
          v-else
          class="home-chip-left"
          @click="goThere(item)"
          style="color: #000000;"
          ><strong>{{ item.content }}↗</strong></v-chip
        >
      </v-carousel-item>
    </v-carousel>



    <div class="popular-products-div">
      <div class="popular-products">
        <h2 class="section-title">인기 예금 상품</h2>
        
                <v-card-actions class="right-align-actions">
          <v-btn @click="intoDeposits">More >></v-btn>
        </v-card-actions>

          <v-row>
           <v-col
              v-for="(deposit, index) in popularDeposits"
              :key="index"
              cols="12"
              sm="6"
              md="3"
            >
              <v-card class="product-card">
                <v-card-title class="card-title ibm-plex-sans-kr-regular"><strong>{{ deposit.name }}</strong></v-card-title>
                <v-card-subtitle>
                  <v-avatar size="24" class="mr-2">
                    <img :src="getBankIcon(deposit.company)" alt="Bank Icon" />
                  </v-avatar>
                  {{ deposit.company }}
                </v-card-subtitle>
                <v-card-text class="mt-3 pb-0 ibm-plex-sans-kr-regular">가입 방법 : {{ deposit.join_way }}</v-card-text>
                <v-card-text class="ibm-plex-sans-kr-regular">만기 후 이자율 : {{ deposit.mtrt_int }}</v-card-text>
                <!-- Card Description (optional) -->
                
              
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>

  

    <div class="popular-products-div">
  <div class="popular-products">
    <h2 class="section-title">인기 적금 상품</h2>
    <v-card-actions class="right-align-actions">
  <v-btn @click="intoSavings" >More >></v-btn>
</v-card-actions>

    <v-row>
      <v-col
        v-for="(saving, index) in popularSavings"
        :key="index"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card class="product-card">
          <v-card-title class="card-title ibm-plex-sans-kr-regular"><strong>{{ saving.name }}</strong></v-card-title>
          <v-card-subtitle>
            <v-avatar size="24" class="mr-2">
              <img :src="getBankIcon(saving.company)" alt="Bank Icon" />
            </v-avatar>
            {{ saving.company }}
            
          </v-card-subtitle>
          <v-card-text class="mt-3 pb-0 ibm-plex-sans-kr-regular">가입 방법 : {{ saving.join_way }}</v-card-text>
          <v-card-text class="ibm-plex-sans-kr-regular">만기 후 이자율 : {{ saving.mtrt_int }}</v-card-text>
          <!-- Card Description (optional) -->
          
        </v-card>
      </v-col>
    </v-row>
  </div>
</div>

  </div>
  
</template>

<script setup lang="ts">
import router from "@/router";
import { ref, onMounted } from 'vue';
import axios from 'axios';

import Kyungnam from "@/assets/bank/Kyungnam.jpg";
import Gwangju from "@/assets/bank/Gwangju.jpg";
import Kookmin from "@/assets/bank/Kookmin.jpg";
import Nonghyup from "@/assets/bank/Nonghyup.jpg";
import Daegu from "@/assets/bank/Daegu.jpg";
import Busan from "@/assets/bank/Busan.jpg";
import Suhyup from "@/assets/bank/Suhyup.jpg";
import StandardChartered from "@/assets/bank/StandardChartered.jpg";
import Shinhan from "@/assets/bank/Shinhan.jpg";
import Woori from "@/assets/bank/Woori.jpg";
import Jeonbuk from "@/assets/bank/Jeonbuk.jpg";
import Jeju from "@/assets/bank/Jeju.jpg";
import IBK from "@/assets/bank/IBK.jpg";
import Kakao from "@/assets/bank/Kakao.jpg";
import Kbank from "@/assets/bank/Kbank.png";
import Toss from "@/assets/bank/Toss.jpg";
import Hana from "@/assets/bank/Hana.jpg";
import KDB from "@/assets/bank/KDB.jpg";

const bankIcon = {
  경남은행: Kyungnam,
  광주은행: Gwangju,
  국민은행: Kookmin,
  농협은행주식회사: Nonghyup,
  대구은행: Daegu,
  부산은행: Busan,
  수협은행: Suhyup,
  한국스탠다드차타드은행: StandardChartered,
  신한은행: Shinhan,
  우리은행: Woori,
  전북은행: Jeonbuk,
  제주은행: Jeju,
  중소기업은행: IBK,
  "주식회사 카카오뱅크": Kakao,
  "주식회사 케이뱅크": Kbank,
  "토스뱅크 주식회사": Toss,
  하나은행: Hana,
  한국산업은행: KDB,
};

const getBankIcon = function (korCoNm) {
  return bankIcon[korCoNm] || "defaultIcon";
};
const popularDeposits = ref([])
const popularSavings = ref([])
// 예금
const intoDeposits = function () {
  router.push({ name: "DepositProductsView" });
};
// 적금
const intoSavings = function () {
  router.push({ name: "SavingProductsView" });
};


const goThere = function (item: any) {
  router.push({ name: item.name });
};
const items = [
  {
    src: "/001.png",
    name: "map",
    content: "가까운 은행 지점 찾기 ",
  },
  {
    src: "/002.png",
    name: "RecommendView",
    content: "금융 상품 추천받기 ",
  },
  {
    src: "/003.png",
    name: "ProductsPreView",
    content: "예금 상품 비교하러 가기 ",
  },
  {
    src: "/004.png",
    name: "ExchangePage",
    content: "환율 계산하러 가기 ",
  },
  {
    src: "/005.png",
    name: "ArticleView",
    content: "자유 게시판으로 가기 ",
  },
];

onMounted(async () => {
  try {
    // API 호출
    const response = await axios.get('http://127.0.0.1:8000/products/api/popular-products/')
    
    // 데이터 바인딩
    popularDeposits.value = response.data.deposits
    popularSavings.value = response.data.savings

    console.log(popularDeposits)
    console.log(popularSavings)

  } catch (error) {
    console.error('Error fetching popular products:', error)
  }
})

const goItemDetail = (item) => {
  console.log(item);  // 또는 해당 상품 상세 페이지로 이동
};
</script>

<style scoped lang="scss">
* {
  font-family: Pretendard-regular;
}

// $colors: (
//   first: #59452c,
//   second: #8c704f,
//   third: #d9bb96,
//   forth: #402a17,
//   fifth: #f2f2f2,
// );
$colors: (
  first: #FFFFF0,    // 아이보리 (Ivory)
  second: #FFFFF0,   // 베이지 (Beige)
  third: #FFFFF0,    // 연한 브라운 (Light Brown)
  forth1:#FFFFF0,
  fifth1:#FFFFF0,
);

* {
  font-family: Pretendard-regular;
}
.homebackcolor{
  background-color: #FFFFF0;
}
.home-wrapper {
  margin-top: 60px;
  background-color: map-get($colors, third);
  margin-bottom: 60px;
  
}

.v-image {
  width: 300px;
  max-width: fit-content;
}
.home-car-image {
  width: 80%;   // 너비 조정
  margin: 0 auto;
}

.home-chip-left {
  position: absolute;
  left: 100px;
  bottom: 100px;
  background-color: map-get($map: $colors, $key: forth1);
  color: map-get($map: $colors, $key: fifth1);
}

.home-chip-right {
  position: absolute;
  right: 100px;
  bottom: 100px;
  background-color: map-get($map: $colors, $key: forth1);
  color: map-get($map: $colors, $key: fifth1);
}
.product-card {
  cursor: pointer;
  transition: transform 0.3s;
  background-color: #fff5cc;  /* Soft yellow background similar to your image */
  border-radius: 15px;  /* Rounded corners */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Soft shadow */
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: scale(1.05);  /* Hover effect to scale the card */
}

.card-title {
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 10px;
}

.card-text {
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #666;  /* Subtle text color */
}

.popular-products {
  width: 80%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.popular-products-div {
  display: flex;
  justify-content: center;
  padding: 30px;
}

.section-title {
  margin-top: 50px;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  color: #333;
}
.ibm-plex-sans-kr-regular {
  white-space: nowrap;          /* 줄 바꿈 방지 */
  overflow: hidden;             /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis;      /* 말줄임표(...) 적용 */
  max-width: 250px;             /* 최대 너비 설정 (원하는 값으로 조정) */
}
.right-align-actions {
  display: flex;             /* Flexbox 활성화 */
  justify-content: flex-end; /* 컨텐츠를 오른쪽 정렬 */
}

</style>