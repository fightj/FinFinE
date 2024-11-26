import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useCommunityStore } from "./community";

export const useSavingStore = defineStore(
  "saving",
  () => {
    const userStore = useCommunityStore();
    const API_URL = "http://127.0.0.1:8000/products";
    const savingProductsData = ref([]);
    const getSavingDetail = ref({});
    const getSavingDetailOption = ref([]);
    const loadSavingData = function () {
      axios({
        method: "get",
        url: `${API_URL}/get_saving_products/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          savingProductsData.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const allSaving = ref([]);
    const bankList = ref([]);

    const getAllSaving = function () {
      axios({
        method: "get",
        url: `${API_URL}/saving/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          allSaving.value = res.data;
          allSaving.value.forEach((item) => {
            if (!bankList.value.includes(item.kor_co_nm)) {
              bankList.value.push(item.kor_co_nm);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // Saving Data 데이터 GET
    const getSavingData = function (productName) {
      axios({
        method: "get",
        url: `${API_URL}/saving/${productName}/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          getSavingDetail.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getSavingOptionData = function (productName) {
      axios({
        method: "get",
        url: `${API_URL}/saving/${productName}/option/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      })
        .then((res) => {
          getSavingDetailOption.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 꿀바르기 확인
    const getHoney = function (productCode, productName) {
      axios({
        method: "post",
        url: `${API_URL}/like/saving/${productCode}/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      }).then((res) => {
        console.log(res);
        getSavingData(productName);
      });
    };
    const profileSavingData = ref([]);
    const getProfileSaving = function (userSaving) {
      axios({
        method: "get",
        url: `${API_URL}/saving/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      })
        .then((res) => {
          allSaving.value = res.data;
          profileSavingData.value = [];
          const interestSaving = userSaving.map((info) => {
            return info.id;
          });
          allSaving.value.forEach((item) => {
            if (interestSaving.includes(item.id)) {
              profileSavingData.value.push(item);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const toggleData = function (productInfo) {
      const index = userStore.userProfile.interest_saving.findIndex((item) => item['id'] === productInfo['id'])
      if (index !== -1) {
        // 객체가 배열에 존재하면 제거
        userStore.userProfile.interest_saving.splice(index, 1)
      } else {
        // 객체가 배열에 존재하지 않으면 추가
        userStore.userProfile.interest_saving.push(productInfo)
      }
    }
    return { savingProductsData, loadSavingData, allSaving, getAllSaving, bankList, getSavingData, getSavingDetail, getSavingOptionData, getSavingDetailOption, getHoney, getProfileSaving, profileSavingData, toggleData };
  },
  { persist: true }
);
