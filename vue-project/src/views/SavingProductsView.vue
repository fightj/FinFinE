<template>
    <v-container>
      <v-container>
        <v-row class="align-center">
          <v-col>
            <v-tabs class="mb-3" v-model="type" variant="outlined" divided>
              <v-tab class="ibm-plex-sans-kr-regular" @click="loaddata_free()"><h3>자유 적립식</h3></v-tab>
              <v-tab class="ibm-plex-sans-kr-regular" @click="loaddata_period()"><h3>정액 적립식</h3></v-tab>
            </v-tabs>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-select class="ps-16 ms-16 ibm-plex-sans-kr-regular" v-model="bank" :items="bankList" label="은행" variant="outlined"></v-select>
          </v-col>
        </v-row>
      </v-container>
      <v-data-table-virtual height="600" :items="savingData" class="elevation-2" item-class="hoverable-row">
        <!-- userPeriod에 따라 다른 기간을 선택하여 표시 -->
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
        <template v-slot:item.상품명="{ item }">
          <v-btn class="mx-auto custom-btn" @click="showDetails(item.상품명)">{{ item.상품명 }}</v-btn>
        </template>
      </v-data-table-virtual>
  
      <v-dialog v-model="dialog" width="1000">
        <v-card class="mx-auto" width="1000">
          <template v-slot:title>
            <v-row class="mb-0">
              <v-img :src="bankIcon" class="mt-10 ms-3" style="height: 40px; width: 30px"></v-img>
              <v-col class="pb-0 mt-6" cols="10">
                <span class="font-weight-black text-h5">{{ savingStore.getSavingDetail.fin_prdt_nm }}</span>
                <v-card-subtitle>{{ savingStore.getSavingDetail.kor_co_nm }} ({{ savingStore.getSavingDetail.dcls_month }})</v-card-subtitle>
              </v-col>
              <!-- 찜시작 -->
              <!-- <v-col class="py-0 my-0">
                <v-card-actions v-if="savingStore.getSavingDetail.interest_user && !savingStore.getSavingDetail.interest_user.includes(userStore.userInfo.id)" class="mt-3">
                  <div>
                    <v-img @click="saveEvent(savingStore.getSavingDetail.fin_prdt_cd, savingStore.getSavingDetail.fin_prdt_nm, savingStore.getSavingDetail)" :src="empty" class="button-image hover-effect" style="width: 50px" />
                    <div class="pe-2" align="center">{{ savingStore.getSavingDetail.interest_user?.length }}</div>
                  </div>
                </v-card-actions>
                <v-card-actions v-else class="mt-3">
                  <div>
                    <v-img @click="deleteEvent(savingStore.getSavingDetail.fin_prdt_cd, savingStore.getSavingDetail.fin_prdt_nm, savingStore.getSavingDetail)" :src="jar" class="button-image hover-effect" style="width: 50px" />
                    <div class="pe-2" align="center">{{ savingStore.getSavingDetail.interest_user?.length }}</div>
                  </div>
                </v-card-actions>
              </v-col> -->
              <!-- 찜끝 -->
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
              <v-card-text class="">
                {{ savingStore.getSavingDetail.join_deny == 1 ? "제한없음" : savingStore.getSavingDetail.join_deny == 2 ? "서민전용" : savingStore.getSavingDetail.join_deny == 3 ? "일부제한" : "기타" }}
              </v-card-text>
            </v-col>
          </v-row>
          <hr />
          <v-row justify="center" align="center">
            <v-col cols="3" class="d-flex justify-center">
              <v-card-text class="text-style" align="center">최고 한도</v-card-text>
            </v-col>
            <v-col>
              <v-card-text class="">
                {{
                  savingStore.getSavingDetail.max_limit === null
                    ? "한도 없음"
                    : `${new Intl.NumberFormat("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                      }).format(savingStore.getSavingDetail.max_limit)}`
                }}
              </v-card-text>
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
          <v-row justify="center" align="center">
            <!-- <v-col>
              <ChartComponent v-if="savingStore.getSavingDetailOption" :data="savingStore.getSavingDetailOption" :title="savingStore.getSavingDetail.fin_prdt_nm" :chartType="charttype" />
            </v-col> -->
          </v-row>
          <hr />
          <v-card-actions class="justify-center">
            <v-btn class="mb-6" @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { onMounted, watch, ref, watchEffect, computed } from "vue";
  import { useSavingStore } from "@/stores/saving";
  import {  useCommunityStore } from "@/stores/community";
  import bankIcon from "@/assets/bank-icon.png";
//   import swal from "sweetalert";
//   import jar from "@/assets/jar.png";
//   import empty from "@/assets/empty.png";
//   import ChartComponent from "@/components/SavingChartComponent.vue";

  const charttype = ref("F");
  const userStore =  useCommunityStore();
  const dialog = ref(false);
  const activeButton = ref("free");
  
  const savingStore = useSavingStore();
  const savingData = ref([]);
  onMounted(() => {
    bank.value = "모든은행";
    savingStore.getAllSaving();
    charttype.value = "F";
  });
  
  const type = ref("");
  const loaddata_free = function () {
    let i = 1;
    activeButton.value = "free";
    if (savingStore.allSaving && savingStore.allSaving.length > 0) {
      savingData.value = savingStore.allSaving
        .map((element) => {
          const option6 = element.savingoption_set.find((option) => option.save_trm === 6 && option.rsrv_type_nm === "자유적립식");
          const intrRate6 = option6 ? option6.intr_rate : null;
          const option12 = element.savingoption_set.find((option) => option.save_trm === 12 && option.rsrv_type_nm === "자유적립식");
          const intrRate12 = option12 ? option12.intr_rate : null;
          const option24 = element.savingoption_set.find((option) => option.save_trm === 24 && option.rsrv_type_nm === "자유적립식");
          const intrRate24 = option24 ? option24.intr_rate : null;
          const option36 = element.savingoption_set.find((option) => option.save_trm === 36 && option.rsrv_type_nm === "자유적립식");
          const intrRate36 = option36 ? option36.intr_rate : null;
  
          // 모든 이자율 값이 null인지 확인
          if (intrRate6 === null && intrRate12 === null && intrRate24 === null && intrRate36 === null) {
            return null; // 모두 null이면 null을 반환
          }
  
          return {
            NO: i++,
            공시제출일: element.dcls_month,
            은행: element.kor_co_nm,
            상품명: element.fin_prdt_nm,
            "6개월": intrRate6,
            "12개월": intrRate12,
            "24개월": intrRate24,
            "36개월": intrRate36,
          };
        })
        .filter((data) => data !== null); // null이 아닌 값만 필터링
    }
  };
  const loaddata_period = function () {
    let i = 1;
    activeButton.value = "period";
    if (savingStore.allSaving && savingStore.allSaving.length > 0) {
      savingData.value = savingStore.allSaving
        .map((element) => {
          const option6 = element.savingoption_set.find((option) => option.save_trm === 6 && option.rsrv_type_nm === "정액적립식");
          const intrRate6 = option6 ? option6.intr_rate : null;
          const option12 = element.savingoption_set.find((option) => option.save_trm === 12 && option.rsrv_type_nm === "정액적립식");
          const intrRate12 = option12 ? option12.intr_rate : null;
          const option24 = element.savingoption_set.find((option) => option.save_trm === 24 && option.rsrv_type_nm === "정액적립식");
          const intrRate24 = option24 ? option24.intr_rate : null;
          const option36 = element.savingoption_set.find((option) => option.save_trm === 36 && option.rsrv_type_nm === "정액적립식");
          const intrRate36 = option36 ? option36.intr_rate : null;
  
          // 모든 이자율 값이 null인지 확인
          if (intrRate6 === null && intrRate12 === null && intrRate24 === null && intrRate36 === null) {
            return null; // 모두 null이면 null을 반환
          }
  
          return {
            NO: i++,
            공시제출일: element.dcls_month,
            은행: element.kor_co_nm,
            상품명: element.fin_prdt_nm,
            "6개월": intrRate6,
            "12개월": intrRate12,
            "24개월": intrRate24,
            "36개월": intrRate36,
          };
        })
        .filter((data) => data !== null); // null이 아닌 값만 필터링
    }
  };
  
  const bankList = ref(["모든은행"]);
  const bank = ref("");
  watch(
    () => savingStore.allSaving,
    () => {
      if (type.value == 0) {
        bank.value = "모든은행";
        // 자유 적금
        charttype.value = "F";
        loaddata_free();
      } else if (type.value == 1) {
        bank.value = "모든은행";
        // 정기 적금
        charttype.value = "T";
        loaddata_period();
        console.log(bankList.value);
      }
    },
    { immediate: true }
  );
  
  watchEffect(() => {
    if (savingStore.bankList && savingStore.bankList.length > 0) {
      savingStore.bankList.forEach((item) => {
        bankList.value.push(item);
      });
    }
  });
  watch(bank, () => {
    if (type.value == 0) {
      // 자유 적금
      loaddata_free();
    } else if (type.value == 1) {
      // 정기 적금
      loaddata_period();
    }
    if (bank.value !== "모든은행") {
      savingData.value = savingData.value.filter((item) => {
        return item.은행 === bank.value;
      });
    }
  });
  
  watch(type, () => {
    if (type.value == 0) {
      // 자유 적금
      // bank.value = "모든은행";
      loaddata_free();
    } else if (type.value == 1) {
      // 정기 적금
      // bank.value = "모든은행";
      loaddata_period();
    }
    if (bank.value !== "모든은행") {
      savingData.value = savingData.value.filter((item) => {
        return item.은행 === bank.value;
      });
    }
  });
  
  const showDetails = (productName) => {
    findDetail(productName);
    // 로딩 데이터 확인 후 출력될 다이얼로그 데이터에 삽입
    dialog.value = true;
  };
  
  const findDetail = function (productName) {
    savingStore.getSavingData(productName);
    savingStore.getSavingOptionData(productName);
  };
  
  const saveEvent = function (productCode, productName, productInfo) {
    console.log(`꿀바르기!`);
    // 적금 쪽 확인
    swal("꿀통에 저장했습니다!", "PROFILE에서 꿀통을 확인하세요!", "success", {
      button: false,
      timer: 1500,
    });
    savingStore.getHoney(productCode, productName);
    // 추가 토글
    savingStore.toggleData(productInfo);
  };
  
  const deleteEvent = function (productCode, productName) {
    console.log(`꿀버리기...`);
    // 적금 쪽 확인
    swal("꿀통에서 제거했습니다", "꿀통이 가벼워졌어요", "info", {
      button: false,
      timer: 1500,
    });
    savingStore.getHoney(productCode, productName);
    // 제거 토글
    savingStore.toggleData(productInfo);
  };
  
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
//   const userPeriod = userStore.userProfile.desirePeriod;
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
  
  .button-image {
    transition: transform 0.3s, filter 0.3s;
    cursor: pointer;
  }
  
  .hover-effect:hover {
    transform: scale(1.2);
    filter: brightness(1.1);
  }
  </style>