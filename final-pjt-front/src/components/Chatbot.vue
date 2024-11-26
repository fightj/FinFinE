<template>
  <div>
    <v-list ref="messageContainer" style="width: 400px; height: 505px; overflow-y: auto">
    <v-list-item v-for="(message, index) in messages" :key="index">
      <div
        class="ibm-plex-sans-kr-regular"
        :class="{
          'user-message': message.role === 'user',
          'assistant-message': message.role === 'assistant',
          'system-message': message.role === 'system',
        }"
      >
        <MessageContent :content="message.content" />
      </div>
    </v-list-item>
  </v-list>
    <div class="message-input">
      <v-progress-linear v-if="loading" color="grey-lighten-1" indeterminate></v-progress-linear>
      <div class="d-flex">
        <v-text-field hint="나에게 맞는 금융 상품은?" class="ms-5 me-3 mt-5" v-model="inputMessage" label="메시지를 입력하세요" @keydown.enter="getChatbot" rows="1" outlined></v-text-field>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useCommunityStore } from "@/stores/community";
import MessageContent from "@/components/MessageContent.vue"; // 새로 만든 컴포넌트 임포트

const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;
const loading = ref(false);
const userStore = useCommunityStore();
const messages = ref([
  { role: "system", content: " CHAT BOT FINFIN E" },
  { role: "assistant", content: "무엇이든지 물어보세요!" },
]);
const inputMessage = ref("");
const chatbotResponse = ref("");

// 메시지 컨테이너 참조
const messageContainer = ref(null);

// JSON 파일 불러오기
const depositData = ref([]);
const savingData = ref([]);

const loadJSONData = async () => {
  const depositDataModule = await import("@/data/deposit_product_data.json");
  const savingDataModule = await import("@/data/saving_product_data.json");
  depositData.value = depositDataModule.default;
  savingData.value = savingDataModule.default;
};

onMounted(() => {
  loadJSONData();
});

// 챗봇 API 호출 함수
const getChatbot = async () => {
  if (inputMessage.value.trim() === "") {
    return;
  }
  loading.value = true;
  const userMessage = { role: "user", content: inputMessage.value };
  messages.value.push(userMessage);
  inputMessage.value = "";

  try {
    const response = await axios({
      method: "post",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `당신은 은행의 예금,적금 및 금융 전문가 챗봇입니다. 당신은 사용자에게 예금 적금 상품, 금융 상품을 상세히 소개해주어야합니다. 사용자 정보를 참고하여 재정 관련 조언을 제공하고, 안정적인 투자를 추천하세요. 사용자의 정보는 다음과 같습니다:<br>
            - 나이: ${userStore.userProfile.age}<br>
            - 연봉: ${userStore.userProfile.salary}<br>
            - 자산: ${userStore.userProfile.wealth}<br>
            - 투자 성향: ${
              userStore.userProfile.tendency >= 0 && userStore.userProfile.tendency <= 3
                ? "안정적인 투자 성향"
                : userStore.userProfile.tendency >= 4 && userStore.userProfile.tendency <= 7
                ? "중간 투자 성향"
                : userStore.userProfile.tendency >= 8 && userStore.userProfile.tendency <= 10
                ? "공격적인 투자 성향"
                : "중간 투자 성향"
            }
            - 예금, 적금 희망 기간: ${userStore.userProfile.desirePeriod}개월,
            또한, 당신은 금융 정보 중 다음의 데이터를 가지고 있습니다.
            - 은행 적금 관련 데이터: ${formatData(depositData.value)},
            - 은행 예금 관련 데이터: ${formatData(savingData.value)} 
            부족한 세부 정보는 해당 은행 공식홈페이지를 확인해서 추가 답변해주시면 됩니다. 그리고 정보가 부족하다면 각 은행의 URL과 전화번호를 답변으로 추가해주세요.`,
          },
          ...messages.value,
        ],
      },
    });
    const botMessage = response.data.choices[0].message.content;
    messages.value.push({ role: "assistant", content: botMessage });
    chatbotResponse.value = botMessage;
  } catch (error) {
    console.log(error);
    chatbotResponse.value = "Error: Unable to fetch response.";
  } finally {
    loading.value = false;
  }
};

const formatData = (data) => {
  return data.map((item) => JSON.stringify(item)).join("<br>");
};

const resetChat = () => {
  messages.value = [{ role: "assistant", content: "어서오세요! 투자 관련 질문을 환영합니다. 어떻게 도와드릴까요?" }];
};
</script>

<style scoped>
.assistant-message {
  text-align: left;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 20px;
  display: inline-block;
  padding: 10px 15px;
  margin: 5px;
  max-width: 800px;
}

.user-message {
  text-align: right;
  float: right;
  background-color: #fff6ce;
  border: 1px solid #fff6ce;
  border-radius: 20px;
  padding: 10px 15px;
  margin: 5px;
  max-width: 800px;
}

.system-message {
  text-align: center;
  font-weight: 700;
  background-color: #fff6ce;
}

.message-content {
  white-space: pre-wrap;
  word-break: break-word;
}

.chat-box {
  border: lightgrey 1px solid;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

.custom-btn {
  box-shadow: none;
  background-color: rgb(237, 235, 235);
  height: 48px;
}

.message-input {
  background-color: white;
  color: black;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
