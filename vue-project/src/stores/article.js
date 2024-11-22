import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
// import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";


export const useArticleStore = defineStore(
  "article",
  () => {
    // 유저 토큰 확보용
    // const userStore = useUserStore();

    const API_URL = "http://127.0.0.1:8000";
    const articlesList = ref([]);
    const articleDetail = ref(null);
    const comments = ref([]); // 댓글 목록
    const newComment = ref(''); // 새 댓글 내용
    const router = useRouter();


    // 게시글 리스트 GET
    const getArticleList = function () {
      axios({
        method: "get",
        url: `${API_URL}/articles/`,
        // headers: {
        //   Authorization: `Token ${userStore.token}`,
        // },
      })
        .then((res) => {
          // console.log(res);
          articlesList.value = res.data;
          console.log(articlesList)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 게시글 디테일 GET
    const getArticleDetail = function (articleId) {
      axios({
        method: "get",
        url: `${API_URL}/articles/${articleId}/`,
        // headers: {
        //   Authorization: `Token ${userStore.token}`,
        // },
      })
        .then((res) => {
          // console.log(res.data);
          articleDetail.value = res.data;
          console.log(articleDetail)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 게시글 생성 POST
    const createArticle = function (databox) {
      const { title, content } = databox;
      axios({
        method: "post",
        url: `${API_URL}/articles/`,
        data: {
          title,
          content,
        },
        // headers: {
        //   Authorization: `Token ${userStore.token}`,
        // },
      })
        .then((res) => {
          router.push({ name: "DetailView", params: { id: res.data.id } });
          console.log(`${store.API_URL}/articles/`);

        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 게시글 수정 PUT
    const updateArticle = function (databox) {
      const { title, content, articleId } = databox;
      axios({
        method: "put",
        url: `${API_URL}/articles/${articleId}/`,
        data: {
          title,
          content,
        },
        // headers: {
        //   Authorization: `Token ${userStore.token}`,
        // },
      })
        .then((res) => {
          console.log(res);
          window.alert("수정이 완료되었습니다.");
          router.push({ name: "DetailView", params: { id: res.data.id } });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 게시글 삭제 DELETE
    const deleteArticle = function (articleId) {
      axios({
        method: "delete",
        url: `${API_URL}/articles/${articleId}/`,
        // headers: {
        //   Authorization: `Token ${userStore.token}`,
        // },
      })
        .then((res) => {
          console.log(res);
          router.push({ name: "ArticleView" });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 댓글 생성
    const createComment = function (databox) {
      const { content, articleId } = databox; // databox에서 content와 articleId 추출
      axios({
        method: "post",
        url: `${API_URL}/articles/${articleId}/comments/`,
        data: {
          content, // 댓글 내용
        },
        // headers: {
        //   Authorization: `Token ${userStore.token}`,
        // },
      })
      .then((res) => {
        console.log("댓글 생성 성공:", res.data);
        // 댓글 생성 후 게시글 상세 페이지로 이동
        router.push({ name: "DetailView", params: { id: articleId } });
      })
      .catch((err) => {
        console.error("댓글 생성 실패:", err);
      });
    };

    // 댓글 조회
    const getComments = function (articleId) {
      axios({
        method: "get",
        url: `${API_URL}/articles/${articleId}/comments/`,
      })
      .then((res) => {
        comments.value = Array.isArray(res.data) ? res.data : []; // 배열인지 확인 후 할당
        console.log("댓글 목록 조회 성공:", res.data);
        
      })
      .catch((err) => {
        console.error("댓글 목록 조회 실패:", err);
      });
    };
    
    // 댓글 삭제
// article.js
const deleteComment = async function (commentId, articleId) {
  try {
    await axios({
      method: "delete",
      url: `${API_URL}/articles/${articleId}/comments/${commentId}/`,
      // headers: {
      //   Authorization: `Token ${userStore.token}`,
      // },
    });
    console.log("댓글 삭제 성공");
  } catch (err) {
    console.error("댓글 삭제 실패:", err);
    throw err; // 오류를 호출부로 전달
  }
};
  


    
    return { comments, articlesList, articleDetail, getArticleList, getArticleDetail, createArticle, updateArticle, deleteArticle, createComment, getComments, deleteComment};
  },
  { persist: true }
);