<template>
  
  <v-container>
    <v-row>
      <v-col align="center">
        <h1 class="half-highlight">내 주변 은행 찾기</h1>
      </v-col>
    </v-row>

    <!-- Select buttons for Province, City, and Bank -->
    <v-row justify="center" class="mt-5">
      <v-col cols="auto">
        <v-btn class="custom-btn">
          <select v-model="province" @change="updateCities" class="custom-select">
            <option value="">도/시</option>
            <option v-for="info in infos" :key="info.id">
              {{ info.prov }}
            </option>
          </select>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn class="custom-btn">
          <select v-model="city" class="custom-select">
            <option value="">시/군/구</option>
            <option v-for="c in cities" :key="c">{{ c }}</option>
          </select>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn class="custom-btn">
          <select v-model="bank" class="custom-select">
            <option value="">은행명</option>
            <option v-for="b in banks" :key="b">{{ b }}</option>
          </select>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Map Component to display results -->
    <v-row>
      <v-col>
        <MapComponent :province="province" :city="city" :bank="bank" />
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup lang="ts">
import MapComponent from "@/components/MapComponent.vue";
import { ref, watch } from "vue";
import { useMapStore } from "@/stores/map";

const store = useMapStore();

const infos = store.infos;
const banks = store.banks;
const cities = ref<string[]>([]);

const province = ref("");
const city = ref("");
const bank = ref("");

const updateCities = () => {
const selectedInfo = infos.find((info) => info.prov === province.value);
cities.value = selectedInfo ? selectedInfo.city : [];
};

watch(province, () => {
updateCities();
});
</script>

<style lang="scss" scoped>
@use 'sass:map'; // Sass map 모듈을 불러옵니다.

$colors: (
primary: #fbe8a6,  // 부드러운 노란색 (주요 색상)
secondary: #d4a373,  // 따뜻한 브라운 (포인트 색상)
accent: #b8af65,  // 연두색 (강조 색상)
background: #f4f7f6,  // 배경색 (연한 회색)
text-primary: #333333,  // 글자 색 (어두운 회색)
text-secondary: #666666,  // 부드러운 회색
);

* {
font-family: Pretendard, sans-serif;
box-sizing: border-box;
}

.half-highlight {
background: linear-gradient(
  180deg,
  rgba(255, 255, 255, 0) 55%,
  lighten(#6681a5, 35%) 50%
);
width: fit-content;
padding: 0.2rem 0.5rem;
border-radius: 4px;
}

.custom-btn {
background-color: #d9edf3;
border-radius: 8px;
padding: 0.5rem 1rem;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
transition: background-color 0.3s ease, transform 0.3s ease;

display: flex;              // Flex 레이아웃 적용
align-items: center;        // 세로 중앙 정렬
justify-content: center;    // 가로 중앙 정렬 (선택 사항)

&:hover {
  background-color: map.get($colors, 'accent');
  transform: translateY(-2px);
}

select {
  background-color: transparent;
  border: none;
  color: map.get($colors, 'text-primary');
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  width: 100%;
  height: 100%;             // 부모 높이에 맞춤
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: map.get($colors, 'accent');
  }
}
}


.custom-select {
width: 100%;
padding: 0.5rem;
font-size: 1rem;
border-radius: 6px;
border: 1px solid #ddd;
background-color: #2EFE64;
color: map.get($colors, 'text-primary');
transition: border-color 0.3s ease;

&:focus {
  border-color: map.get($colors, 'accent');
}

option {
  padding: 10px;
}
}

v-container {
background-color: map.get($colors, 'background');
}

v-row {
margin-top: 1rem;
}


</style>