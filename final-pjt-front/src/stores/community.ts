import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios from "axios";
import swal from "sweetalert";
import { useRecommendStore } from "./recommend";

export const useCommunityStore = defineStore("community", () => {
  const recommendStore = useRecommendStore();
  const API_URL = "http://127.0.0.1:8000";
  const router = useRouter();
  const token = ref(null);
  const userDesirePeriod = ref(null);

  // const search_username = ref(null); 카피바라 코드
  // const user_data: any = ref(null); // 카피바라 코드

  const userInfo = ref(null); //유저 정보
  const userProfile = ref(null);  // 유저 프로필에서 필요한 정보 넘겨주기 (허니)

  // 찜한 예금상품 목록
  // const favoriteDeposits = ref([]);  // 찜한 상품을 저장할 배열 

  // 찜한 적금상품 목록
  // const favoriteSavings = ref([]);  // 찜한 상품을 저장할 배열

  const isLogin = computed(() => {
    if (token.value === null) {
      return false;
    } else {
      return true;
    }
  });

  // 회원가입 부분
  const createUser = function (payload) {
    const { username, nickname, password1, password2, age, salary, wealth, tendency, desirePeriod } = payload;
    axios({
      method: "post",
      url: `${API_URL}/dj-rest-auth/registration/`,
      data: {
        username,
        nickname,
        password1,
        password2,
        age,
        salary,
        wealth,
        tendency,
        desirePeriod,
      },
    })
      .then((res) => {
        console.log(res);
        const password = password1;
        const payload = {
          username,
          password,
        };
        loginUser(payload);
      })
      .catch((err) => {
        swal("Oops", "아이디가 중복되었어요!", "error");
        console.log(err);
      });
  };

  // 로그인
  const loginUser = function (payload) {
    const { username, password } = payload;
    axios({
      method: "post",
      url: `${API_URL}/dj-rest-auth/login/`,
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        token.value = res.data.key;
        userInfo.value = res.data.user;
        getProfile();
        recommendStore.getRecommendFirst();
        recommendStore.getRecommendSecond();
        userDesirePeriod.value = res.data.user.desirePeriod;
        router.push({ name: "home" });
        swal(`${res.data.user.nickname}님 FinFin E에 오신 것을 환영합니다!`, {
          // buttons: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        swal("Oops", "아이디 혹은 비밀번호가 다릅니다", "error");
        console.log(err);
      });
  };

  // 로그아웃
  const logoutUser = function () {
    axios({
      method: "post",
      url: `${API_URL}/dj-rest-auth/logout/`,
    })
      .then((res) => {
        console.log(res);
        token.value = null;
        userDesirePeriod.value = null;
        userInfo.value = null;
        userProfile.value = null;
        router.push({ name: "home" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // UserProfile 부분
  const getProfile = function () {
    axios({
      method: "get",
      url: `${API_URL}/accounts/profile/${userInfo.value.username}/`,
      headers: {
        Authorization: `Token ${token.value}`,
      },
    }).then((res) => {
      console.log(res.data);
      userProfile.value = res.data;
    });
  };

  // 카피바라 코드 추후 추가.
  // const editProfile = function (payload: any) {
  //   const { nickname, email } = payload;
  //   axios({
  //     method: "put",
  //     url: `${API_URL}/accounts/profile/edit/`,
  //     headers: {
  //       Authorization: `Token ${token.value}`,
  //     },
  //     data: {
  //       nickname,
  //       email,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       alert("프로필이 수정되었습니다.");
  //       router.go(-1);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const changePassword = function (payload: any) {
  //   const { old_password, new_password1, new_password2 } = payload;
  //   axios({
  //     method: "post",
  //     url: `${API_URL}/accounts/password/change/`,
  //     headers: {
  //       Authorization: `Token ${token.value}`,
  //     },
  //     data: {
  //       old_password,
  //       new_password1,
  //       new_password2,
  //     },
  //   })
  //     .then(() => {
  //       console.log("비밀번호 변경 성공");
  //       alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
  //       logOut();
  //     })
  //     .catch(() => {
  //       console.log("비밀번호 변경 실패");
  //       alert("뭔가 잘못되었으니까 다시 하세요.");
  //     });
  // };

  // const get_user_data = function (search_username: any, errorCallback: any) {
  //   axios({
  //     method: "get",
  //     url: `${API_URL}/accounts/profile/get_user_data/${search_username}/`,
  //     headers: {
  //       Authorization: `Token ${token.value}`,
  //     },
  //   })
  //     .then((res) => {
  //       user_data.value = res.data;
  //       console.log("User data received:", res.data);
  //       console.log(userInfo)
  //     })
  //     .catch((err) => {
  //       console.log("Error occurred:", err);
  //       alert("없는 사용자입니다.");
  //       errorCallback();
  //     });
  // };

  
  // 찜한 예금 상품 가져오기
  // const getFavoriteDeposits = async function (userId) {
  //   try {
  //     const response = await axios.get(`${API_URL}/products/api/favorite-deposits/${userId}/`);
  //     favoriteDeposits.value = response.data;
  //     console.log("찜한 예금상품 데이터:", response.data);
  //   } catch (error) {
  //     console.error("찜한 상품을 가져오는 데 실패했습니다:", error);
  //   }
  // };

  // // 찜한 적금 상품 가져오기
  // const getFavoriteSavings = async function (userId) {
  //   try {
  //     const response = await axios.get(`${API_URL}/products/api/favorite-savings/${userId}/`);
  //     favoriteSavings.value = response.data;
  //     console.log("찜한 적금상품 데이터:", response.data);
  //   } catch (error) {
  //     console.error("찜한 상품을 가져오는 데 실패했습니다:", error);
  //   }
  // };

  // 추후 추가.
  // const delete_user = async function () {
  //   try {
  //     const response = await axios({
  //       method: "delete",
  //       url: `${API_URL}/accounts/profile/edit/`,
  //       headers: {
  //         Authorization: `Token ${token.value}`,
  //       },
  //     });
  //     if (response.status === 200) {
  //       alert("탈퇴가 완료되었습니다.");
  //       token.value = null;
  //       userInfo.value = null;
  //       userProfile.value = null;
  //       router.push({ name: "home" });
  //     }
  //   } catch (error) {
  //     console.error("탈퇴 실패:", error);
  //     alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
  //   }
  // };

  return {
    API_URL,
    createUser,
    loginUser,
    logoutUser,
    getProfile,
    token,
    isLogin,
    userInfo,
    userProfile,
    userDesirePeriod,

    //-----------------------------------
    // user_data,
    // search_username,
    // favoriteDeposits,  // 찜한 상품 배열 반환
    // favoriteSavings,
    // signUp,
    // logIn,
    // logOut,
    // get_user_data,
    // editProfile,
    // changePassword,
    // delete_user,
    // getFavoriteDeposits,  // 찜한 예금상품을 가져오는 메서드 추가
    // getFavoriteSavings,  // 찜한 적금상품을 가져오는 메서드 추가
  };
}, { persist: true });
