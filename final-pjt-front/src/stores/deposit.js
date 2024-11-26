import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useCommunityStore } from "./community";

export const useDepositStore = defineStore(
  "deposit",
  () => {
    const userStore = useCommunityStore();
    const API_URL = "http://127.0.0.1:8000/products";
    const depositProductsData = ref([]);
    const getDepositDetail = ref({});
    const loadDepositData = function () {
      axios({
        method: "get",
        url: `${API_URL}/get_deposit_products/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          depositProductsData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const allDeposit = ref([]);
    const bankList = ref([]);
    // Deposit List
    const getAllDeposit = function () {
      axios({
        method: "get",
        url: `${API_URL}/deposit/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          allDeposit.value = res.data;
          allDeposit.value.forEach((item) => {
            if (!bankList.value.includes(item.kor_co_nm)) {
              bankList.value.push(item.kor_co_nm);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // Deposit Data 데이터 GET
    const getDepositData = function (productName) {
      axios({
        method: "get",
        url: `${API_URL}/deposit/${productName}/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          getDepositDetail.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getDepositDetailOption = ref([]);
    const getDepositOptionData = function (productName) {
      axios({
        method: "get",
        url: `${API_URL}/deposit/${productName}/option/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      })
        .then((res) => {
          getDepositDetailOption.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 꿀바르기 확인
    const getHoney = function (productCode, productName) {
      axios({
        method: "post",
        url: `${API_URL}/like/deposit/${productCode}/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      }).then((res) => {
        console.log(res);
        getDepositData(productName);
      });
    };
    const profileDepositData = ref([]);
    const getProfileDeposit = function (userDeposit) {
      axios({
        method: "get",
        url: `${API_URL}/deposit/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      })
        .then((res) => {
          allDeposit.value = res.data;
          profileDepositData.value = [];
          const interestDeposit = userDeposit.map((info) => {
            return info.id;
          });
          allDeposit.value.forEach((item) => {
            if (interestDeposit.includes(item.id)) {
              profileDepositData.value.push(item);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const toggleData = function (productInfo) {
      const index = userStore.userProfile.interest_deposit.findIndex((item) => item["id"] === productInfo["id"]);
      if (index !== -1) {
        // 객체가 배열에 존재하면 제거
        userStore.userProfile.interest_deposit.splice(index, 1);
      } else {
        // 객체가 배열에 존재하지 않으면 추가
        userStore.userProfile.interest_deposit.push(productInfo);
      }
    };
    return { depositProductsData, loadDepositData, allDeposit, getAllDeposit, bankList, getDepositData, getDepositDetail, getDepositOptionData, getDepositDetailOption, getHoney, getProfileDeposit, profileDepositData, toggleData };
  },
  { persist: true }
);
