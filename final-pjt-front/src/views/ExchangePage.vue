<template>
  <div class="homebackcolor">
    <v-container align="center">
      <h1 class="header-text">환율 계산기</h1>
      <!-- 조건을 입력해주세요 문구, exchangeAfter 값이 "조건을 입력해주세요"일 때만 보이도록 수정 -->
      <p v-if="exchangeAfter === '조건을 입력해주세요.'" class="sub-text">조건을 입력해주세요.</p>

      <v-form>
        <!-- 기준 선택 -->
        <v-col cols="5">
          <v-select
            class="custom-select"
            v-model="state"
            :items="states"
            label="기준"
          ></v-select>
        </v-col>
        <!-- 통화 선택 -->
        <v-col cols="5">
          <v-select
            class="custom-select"
            v-model="country"
            :items="store.curName"
            label="통화 선택"
          ></v-select>
        </v-col>

        <!-- "원하는 금액을 입력하세요"는 기준과 통화 선택 후에 보이도록 조건 추가 -->
        <p v-if="state && country" class="ibm-plex-sans-kr-regular my-5">원하는 금액을 입력하세요.</p>

        <!-- 금액 입력 -->
        <v-col cols="5">
          <v-text-field
            class="custom-text-field"
            v-model="exchangeBefore"
            :label="exchangeDetail.cur_unit"
            @input="validateInput"
          ></v-text-field>
        </v-col>

        <div class="mt-5 result-text">
          <!-- 결과 출력 -->
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
const exchangeAfter = ref("");
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
    exchangeAfter.value = "";
  }
};

const validateInput = () => {
  // 숫자가 아닌 입력을 처리하는 부분
  if (isNaN(exchangeBefore.value) || exchangeBefore.value === "") {
    exchangeAfter.value = "유효하지 않은 입력입니다.";
  } else {
    calculateExchange();
  }
};

watch([state, country], () => {
  updateExchangeDetail();
});

watch(exchangeBefore, calculateExchange);
</script>


<style lang="scss" scoped>
@use 'sass:map'; 
$colors: (
  primary: #4682B4,  // 주요 색상: Steel Blue
  secondary: #B0C4DE, // 부드러운 라이트 스틸 블루 (보조 색상)
  accent: #5F9EA0,    // 카디널 블루 (포인트 색상)
  background: #e2e5e7,  // 연한 하늘색 (배경색)
  text-primary: #2C3E50,  // 어두운 네이비 (글자 색)
  text-secondary: #7F8C8D,  // 부드러운 회색 (보조 글자 색)
  highlight: #1E90FF // 도드라지는 푸른색 (강조 색상)
);

* {
  font-family: Pretendard, sans-serif;
}

.header-text {
  font-weight: bold;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 55%,
    lighten(#6681a5, 35%) 50%
  );
  padding: 10px;
  border-radius: 8px;
  width: fit-content;
  margin-bottom: 50px;
}

.sub-text {
  color: map.get($colors, 'text-secondary');
  margin: 10px 0;
  font-size: 1.1rem;
}

.custom-select {
  background-color: lighten(map.get($colors, 'background'), 10%); // 부드러운 노란색
  color: map.get($colors, 'text-primary'); // 어두운 회색 텍스트
  font-weight: bold;
  border: 2px solid map.get($colors, 'accent'); // 따뜻한 브라운 테두리
  border-radius: 10px;
  padding: 10px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
  }
}
.custom-text-field {
  background-color: lighten(map.get($colors, 'background'), 10%); // 연한 배경색
  color: map.get($colors, 'text-primary'); // 어두운 회색 텍스트
  font-weight: bold;
  border: 2px solid map.get($colors, 'accent'); // 따뜻한 브라운 테두리
  border-radius: 10px;
  padding: 10px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus-within {
    border-color: map.get($colors, 'highlight'); // 강조 색상
    box-shadow: 0 0 10px map.get($colors, 'highlight');
  }
}


.custom-select .v-select__selections,
.custom-text-field .v-text-field__slot {
  padding: 12px;
  font-size: 1.1rem;
}

.result-text {
  background-color: transparent; // 배경 투명  color: map.get($colors, 'text-primary'); // 어두운 회색 텍스트
  padding: 0;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  border: none; // 테두리 제거  border-radius: 12px;
  box-shadow: none;

  h2 {
    color: map.get($colors, 'highlight'); // 강조 색상으로 텍스트를 두드러지게
    margin: 10px 0;
    font-size: 1.6rem;
  }
}

.v-btn {
  background-color: map.get($colors, 'primary');
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: map.get($colors, 'highlight');
}

.homebackcolor{
  background-color: #FFFFF0;
}
</style>