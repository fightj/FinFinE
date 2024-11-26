<template>
    <div class="homebackcolor">
      <div class="tab-container">
  <v-tabs 
    class="custom-bg right-tab" 
    variant="outlined" 
    divided 
    :class="{ 'bg-financial': state === 'financial' }"
  >
    <v-tab 
      class="ibm-plex-sans-kr-regular custom-tab" 
      @click="state = 'financial'"
      :class="{ 'active-tab': state === 'financial' }"
    >
      <h4>나와 비슷한 사용자들이 가입한 상품</h4>
    </v-tab>
  </v-tabs>
  <v-tabs 
    class="custom-bg right-tab" 
    variant="outlined" 
    divided 
    :class="{ 'bg-age': state === 'age' }"
  >
    <v-tab 
      class="ibm-plex-sans-kr-regular custom-tab" 
      @click="state = 'age'"
      :class="{ 'active-tab': state === 'age' }"
    >
      <h4>{{ age }}대가 가장 많이 가입한 상품</h4>
    </v-tab>
  </v-tabs>
</div>
      <v-data-table-virtual v-if="state === 'financial'" height="600" :items="recommendFirst" class="elevation-2" item-class="hoverable-row" fixed-header>
        <template v-slot:item.상품명="{ item }">
          <v-btn class="mx-auto custom-btn" @click="showDetails(item.상품명)">{{ item.상품명 }}</v-btn>
        </template>
        <template v-if="userPeriod && userPeriod === 6" v-slot:item.6개월="{ value }">
          <v-chip :color="getColor(value)">{{ value }}</v-chip>
        </template>
        <template v-else-if="userPeriod && userPeriod === 12" v-slot:item.12개월="{ value }">
          <v-chip :color="getColor(value)">{{ value }}</v-chip>
        </template>
        <template v-else-if="userPeriod && userPeriod === 24" v-slot:item.24개월="{ value }">
          <v-chip :color="getColor(value)">{{ value }}</v-chip>
        </template>
        <template v-else-if="userPeriod && userPeriod === 36" v-slot:item.36개월="{ value }">
          <v-chip :color="getColor(value)">{{ value }}</v-chip>
        </template>
        <template v-else v-slot:item.6개월="{ value }">
          <v-chip :color="getColor(value)">{{ value }}</v-chip>
        </template>
      </v-data-table-virtual>
      <v-data-table-virtual v-if="state === 'age'" height="600" :items="recommendSecond" class="elevation-2" item-class="hoverable-row" fixed-header>
        <template v-slot:item.상품명="{ item }">
          <v-btn class="mx-auto custom-btn" @click="showDetails(item.상품명)">{{ item.상품명 }}</v-btn>
        </template>
        <template v-if="userPeriod && userPeriod === 6" v-slot:item.6개월="{ value }">
          <v-chip :color="getColor(value)">{{ value }}</v-chip>
        </template>
        <template v-else-if="userPeriod && userPeriod === 12" v-slot:item.12개월="{ value }">
          <v-chip :color="getColor(value)">{{ value }}</v-chip>
        </template>
        <template v-else-if="userPeriod && userPeriod === 24" v-slot:item.24개월="{ value }">
          <v-chip :color="getColor(value)">{{ value }}</v-chip>
        </template>
        <template v-else-if="userPeriod && userPeriod === 36" v-slot:item.36개월="{ value }">
          <v-chip :color="getColor(value)">{{ value }}</v-chip>
        </template>
        <template v-else v-slot:item.6개월="{ value }">
          <v-chip :color="getColor(value)">{{ value }}</v-chip>
        </template>
      </v-data-table-virtual>
      <!-- ----------------------------------------------------------------------- -->
      <v-dialog v-if="productType === '예금'" v-model="dialog" width="1000">
        <v-card class="mx-auto" width="1000">
          <template v-slot:title>
            <v-row class="mb-0">
              <v-img :src="bankIcon" class="mt-10 ms-3" style="height: 40px; width: 30px"></v-img>
              <v-col class="pb-0 mt-6" cols="10">
                <span class="font-weight-black text-h5">{{ depositStore.getDepositDetail.fin_prdt_nm }}</span>
                <v-card-subtitle>{{ depositStore.getDepositDetail.kor_co_nm }} ({{ depositStore.getDepositDetail.dcls_month }})</v-card-subtitle>
              </v-col>
              <!-- 꿀바르기 버튼 시작-->
              <v-col class="py-0 my-0">
                <v-card-actions v-if="depositStore.getDepositDetail.interest_user && !depositStore.getDepositDetail.interest_user.includes(userStore.userInfo.id)" class="mt-3">
                  <div>
                    <v-img @click="depositSaveEvent(depositStore.getDepositDetail.fin_prdt_cd, depositStore.getDepositDetail.fin_prdt_nm, depositStore.getDepositDetail)" :src="empty" class="button-image hover-effect" style="width: 50px" />
                    <div class="pe-2" align="center">{{ depositStore.getDepositDetail.interest_user?.length }}</div>
                  </div>
                </v-card-actions>
                <v-card-actions v-else class="mt-3">
                  <div>
                    <v-img @click="depositDeleteEvent(depositStore.getDepositDetail.fin_prdt_cd, depositStore.getDepositDetail.fin_prdt_nm, depositStore.getDepositDetail)" :src="jar" class="button-image hover-effect" style="width: 50px" />
                    <div class="pe-2" align="center">{{ depositStore.getDepositDetail.interest_user?.length }}</div>
                  </div>
                </v-card-actions>
              </v-col>
              <!-- 꿀 바르기 버튼 끝 -->
            </v-row>
          </template>
          <hr />
  
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">가입 방법</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="">{{ depositStore.getDepositDetail.join_way }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">만기 후 이자율</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="me-12">{{ depositStore.getDepositDetail.mtrt_int }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">우대 조건</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="me-12">{{ depositStore.getDepositDetail.spcl_cnd }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">가입 대상</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="">{{ depositStore.getDepositDetail.join_member }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">가입 제한</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="">{{ join_limit }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">최고 한도</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="">{{ join_member }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">기타 유의사항</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="me-12">{{ depositStore.getDepositDetail.etc_note }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-card-actions class="justify-center">
            <v-btn class="mb-6" @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 적금 디테일 페이지 -->
      <v-dialog v-if="productType === '적금'" v-model="dialog" width="1000">
        <v-card class="mx-auto" width="1000">
          <template v-slot:title>
            <v-row class="mb-0">
              <v-img :src="bankIcon" class="mt-10 ms-3" style="height: 40px; width: 30px"></v-img>
              <v-col class="pb-0 mt-6" cols="10">
                <span class="font-weight-black text-h5">{{ savingStore.getSavingDetail.fin_prdt_nm }}</span>
                <v-card-subtitle>{{ savingStore.getSavingDetail.kor_co_nm }} ({{ savingStore.getSavingDetail.dcls_month }})</v-card-subtitle>
              </v-col>
              <!-- 꿀바르기 버튼 시작-->
              <v-col class="py-0 my-0">
                <v-card-actions v-if="savingStore.getSavingDetail.interest_user && !savingStore.getSavingDetail.interest_user.includes(userStore.userInfo.id)" class="mt-3">
                  <div>
                    <v-img @click="savingSaveEvent(savingStore.getSavingDetail.fin_prdt_cd, savingStore.getSavingDetail.fin_prdt_nm, savingStore.getSavingDetail)" :src="empty" class="button-image hover-effect" style="width: 50px" />
                    <div class="pe-2" align="center">{{ savingStore.getSavingDetail.interest_user?.length }}</div>
                  </div>
                </v-card-actions>
                <v-card-actions v-else class="mt-3">
                  <div>
                    <v-img @click="savingDeleteEvent(savingStore.getSavingDetail.fin_prdt_cd, savingStore.getSavingDetail.fin_prdt_nm, savingStore.getSavingDetail)" :src="jar" class="button-image hover-effect" style="width: 50px" />
                    <div class="pe-2" align="center">{{ savingStore.getSavingDetail.interest_user?.length }}</div>
                  </div>
                </v-card-actions>
              </v-col>
              <!-- 꿀 바르기 버튼 끝 -->
            </v-row>
          </template>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">가입 방법</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="">{{ savingStore.getSavingDetail.join_way }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
  
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">만기 후 이자율</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="me-12">{{ savingStore.getSavingDetail.mtrt_int }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">우대 조건</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="me-12">{{ savingStore.getSavingDetail.spcl_cnd }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">가입 대상</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="">{{ savingStore.getSavingDetail.join_member }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">가입 제한</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="">{{ join_limit }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">최고 한도</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="">{{ join_member }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">기타 유의사항</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="me-12">{{ savingStore.getSavingDetail.etc_note }}</v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-card-actions class="justify-center">
            <v-btn class="mb-6" @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- ----------------------------------------------------------------------- -->
    </div>
  </template>
  
  <script setup>
  import { useRecommendStore } from "@/stores/recommend";
  import { useDepositStore } from "@/stores/deposit";
  import { useSavingStore } from "@/stores/saving";
  import { useCommunityStore } from "@/stores/community";
  import { onMounted, ref, computed } from "vue";
  import bankIcon from "@/assets/bank-icon.png";
  import jar from "@/assets/jar.png";
  import empty from "@/assets/empty.png";
  // getColor 함수 정의
  const getColor = (value) => {
    if (value >= 3) {
      return "green";
    } else if (value >= 2) {
      return "orange";
    } else {
      return "white";
    }
  };
  const store = useRecommendStore();
  const state = ref("financial");
  const depositStore = useDepositStore();
  const savingStore = useSavingStore();
  const userStore = useCommunityStore();
  const userPeriod = userStore.userProfile.desirePeriod;
  const dialog = ref(false);
  const age = ref(Math.floor(userStore.userProfile.age / 10) * 10);
  const Financial = () => {
    state.value = "financial";
  };
  const Age = () => {
    state.value = "age";
  };
  
  onMounted(() => {
    store.getRecommendFirst();
    store.getRecommendSecond();
  });
  
  const join_member = ref("");
  const join_limit = ref("");
  
  const recommendFirst = ref([]);
  const recommend1 = function () {
    recommendFirst.value = store.recommendFirst.map((element) => {
      console.log("element", element);
      if (element.fin_prdt_nm.includes("예금")) {
        const type = "예금";
        const option6 = element.depositoption_set.find((option) => option.save_trm === 6);
        const intrRate6 = option6 ? option6.intr_rate : null;
        const option12 = element.depositoption_set.find((option) => option.save_trm === 12);
        const intrRate12 = option12 ? option12.intr_rate : null;
        const option24 = element.depositoption_set.find((option) => option.save_trm === 24);
        const intrRate24 = option24 ? option24.intr_rate : null;
        const option36 = element.depositoption_set.find((option) => option.save_trm === 36);
        const intrRate36 = option36 ? option36.intr_rate : null;
        return {
          유형: type,
          공시제출일: element.dcls_month,
          은행: element.kor_co_nm,
          상품명: element.fin_prdt_nm,
          "6개월": intrRate6,
          "12개월": intrRate12,
          "24개월": intrRate24,
          "36개월": intrRate36,
        };
      } else if (element.fin_prdt_nm.includes("적금")) {
        const type = "적금";
        const option6 = element.savingoption_set.find((option) => option.save_trm === 6);
        const intrRate6 = option6 ? option6.intr_rate : null;
        const option12 = element.savingoption_set.find((option) => option.save_trm === 12);
        const intrRate12 = option12 ? option12.intr_rate : null;
        const option24 = element.savingoption_set.find((option) => option.save_trm === 24);
        const intrRate24 = option24 ? option24.intr_rate : null;
        const option36 = element.savingoption_set.find((option) => option.save_trm === 36);
        const intrRate36 = option36 ? option36.intr_rate : null;
        return {
          유형: type,
          공시제출일: element.dcls_month,
          은행: element.kor_co_nm,
          상품명: element.fin_prdt_nm,
          "6개월": intrRate6,
          "12개월": intrRate12,
          "24개월": intrRate24,
          "36개월": intrRate36,
        };
      }
    });
  };
  const recommendSecond = ref([]);
  const recommend2 = function () {
    recommendSecond.value = store.recommendSecond.map((element) => {
      console.log("element", element);
      if (element.fin_prdt_nm.includes("예금")) {
        const type = "예금";
        const option6 = element.depositoption_set.find((option) => option.save_trm === 6);
        const intrRate6 = option6 ? option6.intr_rate : null;
        const option12 = element.depositoption_set.find((option) => option.save_trm === 12);
        const intrRate12 = option12 ? option12.intr_rate : null;
        const option24 = element.depositoption_set.find((option) => option.save_trm === 24);
        const intrRate24 = option24 ? option24.intr_rate : null;
        const option36 = element.depositoption_set.find((option) => option.save_trm === 36);
        const intrRate36 = option36 ? option36.intr_rate : null;
        return {
          유형: type,
          공시제출일: element.dcls_month,
          은행: element.kor_co_nm,
          상품명: element.fin_prdt_nm,
          "6개월": intrRate6,
          "12개월": intrRate12,
          "24개월": intrRate24,
          "36개월": intrRate36,
        };
      } else if (element.fin_prdt_nm.includes("적금")) {
        const type = "적금";
        const option6 = element.savingoption_set.find((option) => option.save_trm === 6);
        const intrRate6 = option6 ? option6.intr_rate : null;
        const option12 = element.savingoption_set.find((option) => option.save_trm === 12);
        const intrRate12 = option12 ? option12.intr_rate : null;
        const option24 = element.savingoption_set.find((option) => option.save_trm === 24);
        const intrRate24 = option24 ? option24.intr_rate : null;
        const option36 = element.savingoption_set.find((option) => option.save_trm === 36);
        const intrRate36 = option36 ? option36.intr_rate : null;
        return {
          유형: type,
          공시제출일: element.dcls_month,
          은행: element.kor_co_nm,
          상품명: element.fin_prdt_nm,
          "6개월": intrRate6,
          "12개월": intrRate12,
          "24개월": intrRate24,
          "36개월": intrRate36,
        };
      }
    });
  };
  
  onMounted(() => {
    recommend1();
    recommend2();
  });
  
  //////////////////////////////////////////////////////////////////////////
  const productType = ref("");
  const showDetails = (productName) => {
    if (productName.includes("예금")) {
      findDepositDetail(productName);
      productType.value = "예금";
    } else {
      findSavingDetail(productName);
      productType.value = "적금";
    }
    // 로딩 데이터 확인 후 출력될 다이얼로그 데이터에 삽입
    dialog.value = true;
  };
  const findDepositDetail = function (productName) {
    depositStore.getDepositData(productName);
    const deposit_member = computed(() => {
      return formatCurrency(depositStore.getDepositDetail.max_limit);
    });
  
    const deposit_limit = computed(() => {
      if (depositStore.getDepositDetail.join_deny === 1) {
        return `가입 제한 없음`;
      } else if (depositStore.getDepositDetail.join_deny === 2) {
        return `서민 전용`;
      } else if (depositStore.getDepositDetail.join_deny === 3) {
        return `일부 제한`;
      }
    });
    join_member.value = deposit_member.value;
    join_limit.value = deposit_limit.value;
  };
  const findSavingDetail = function (productName) {
    savingStore.getSavingData(productName);
    const saving_member = computed(() => {
      return formatCurrency(savingStore.getSavingDetail.max_limit);
    });
  
    const saving_limit = computed(() => {
      if (savingStore.getSavingDetail.join_deny === 1) {
        return `가입 제한 없음`;
      } else if (savingStore.getSavingDetail.join_deny === 2) {
        return `서민 전용`;
      } else if (savingStore.getSavingDetail.join_deny === 3) {
        return `일부 제한`;
      }
    });
    join_member.value = saving_member.value;
    join_limit.value = saving_limit.value;
  };
  
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "한도 없음";
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };
  
  const depositSaveEvent = function (productCode, productName, productInfo) {
    console.log(`찜하기!`);
    // 예금 쪽 확인
    swal("찜목록에 저장했습니다!", "PROFILE에서 찜목록을 확인하세요!", "success", {
      button: false,
      timer: 1500,
    });
    depositStore.getHoney(productCode, productName);
    // 추가 토글
    depositStore.toggleData(productInfo);
  };
  const depositDeleteEvent = function (productCode, productName, productInfo) {
    console.log(`찜 취소..`);
    // 예금 쪽 확인
    swal("찜목록에서 제거했습니다", "찜목록이 가벼워졌어요", "info", {
      button: false,
      timer: 1500,
    });
  
    depositStore.getHoney(productCode, productName);
    // 제거 토글
    depositStore.toggleData(productInfo);
  };
  
  const savingSaveEvent = function (productCode, productName, productInfo) {
    console.log(`찜하기!`);
    // 적금 쪽 확인
    swal("찜목록에 저장했습니다!", "PROFILE에서 찜목록을 확인하세요!", "success", {
      button: false,
      timer: 1500,
    });
    savingStore.getHoney(productCode, productName);
    // 추가 토글
    savingStore.toggleData(productInfo);
  };
  
  const savingDeleteEvent = function (productCode, productName) {
    console.log(`찜 취소..`);
    // 적금 쪽 확인
    swal("찜목록에서 제거했습니다", "찜목록이 가벼워졌어요", "info", {
      button: false,
      timer: 1500,
    });
    savingStore.getHoney(productCode, productName);
    // 제거 토글
    savingStore.toggleData(productInfo);
  };
  //////////////////////////////////////////////////////////////////////////
  </script>
  
  <style scoped>
  .hoverable-row {
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .hoverable-row:hover {
    background-color: #f5f5f5;
  }
  
  .custom-link {
    color: black;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
  
  .custom-link:hover {
    color: darkblue;
  }
  hr {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 40px;
    margin-right: 40px;
    box-shadow: 1px 1px 1px rgba(193, 193, 193, 0.435);
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .text-style {
    font-weight: bolder;
    font-size: medium;
  }
  .btn-style {
    font-size: large;
    background-color: rgba(255, 174, 0, 0.661);
    border-radius: 5%px;
  }
  
  .custom-btn {
    background-color: #f5f5f5;
    box-shadow: none;
  }
  
  .custom-btn:hover {
    background-color: #f0f0f0; /* 마우스를 올렸을 때 연한 회색 배경색으로 변경 */
  }
  
  .tab-container {
  display: flex;
  justify-content: space-around;  /* 두 탭을 적당히 떨어뜨림 */
  align-items: center;            /* 수직 정렬 */
  border-radius: 10px;            /* 모서리 둥글게 */
  padding: 8px 20px;              /* 상하/좌우 여백 */
  gap: 50px;                      /* 탭 사이의 간격 */
  margin-top: 50px;
  margin-bottom: 50px;
}


.custom-bg {
  background-color: #f0e4d3;    
  border-radius: 8px;           /* 탭의 모서리 둥글게 */
  padding: 8px 16px;            /* 내부 여백 */
}

.custom-tab {
  background-color: transparent;
  transition: background-color 0.3s ease;
}



  .button-image {
    transition: transform 0.3s, filter 0.3s;
    cursor: pointer;
  }
  
  
  .homebackcolor{
  background-color: #FFFFF0;
  width: 80%;             /* 너비를 80%로 설정 */
  margin: 0 auto;         /* 가운데 정렬 (선택 사항) */
}

.bg-financial {
  background-color: #ffcc00; /* 예시: 금융 관련 탭 배경색 */
}

.bg-age {
  background-color: #ffcc00; /* 예시: 나이대 관련 탭 배경색 */
}

  </style>
  