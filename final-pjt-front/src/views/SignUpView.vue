<template>
  <v-col align="center">
          <h1 class="half-highlight">Sign Up</h1>
        </v-col>
<v-sheet class="mx-auto mt-4" width="80%" elevation="4" height="auto" rounded color="">
      
    <v-container class="mt-5 px-0 pb-0 pt-10">
      <v-form class="my-0 px-2" ref="form" @submit.prevent="submitForm">
        <v-row>
          <v-col cols="6">
            <v-text-field
              class="ms-5"
              hint="사용할 아이디를 입력 해주세요"
              label="Username*"
              variant="outlined"
              v-model="state.username"
              @blur="v$.username.$touch"
              :error-messages="v$.username.$error ? ['아이디는 최대 20자리 입니다.'] : []"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              class="me-5"
              label="Nickname*"
              variant="outlined"
              hint="사용할 닉네임을 입력해주세요"
              v-model="state.nickname"
              @blur="v$.nickname.$touch"
              :error-messages="v$.nickname.$error ? ['닉네임은 최대 20자리 입니다.'] : []"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              width="auto"
              class="ms-5"
              hint="특수문자를 제외한 10자리 이상을 입력해주세요"
              label="Password*"
              variant="outlined"
              type="password"
              v-model="state.password1"
              @blur="v$.password1.$touch"
              :error-messages="v$.password1.$error ? ['비밀번호는 최소 10자리 이상입니다.'] : []"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              hint="동일한 비밀번호를 입력해주세요"
              class="me-5"
              label="Check Password*"
              variant="outlined"
              type="password"
              v-model="state.password2"
              @blur="v$.password2.$touch"
              :error-messages="v$.password2.$error ? ['비밀번호가 일치하지 않습니다.'] : []"
            ></v-text-field>
          </v-col>
          <v-col class="pt-0" cols="6">
            <v-text-field
              prepend-inner-icon="mdi-numeric"
              hint="나이를 입력해주세요"
              class="ms-5"
              label="Age*"
              variant="outlined"
              type="number"
              v-model="state.age"
              @blur="v$.age.$touch"
              :error-messages="v$.age.$error ? ['나이는 최소 18살, 최대 99살 입니다.'] : []"
            ></v-text-field>
          </v-col>
          <v-col class="pt-0" cols="6">
            <v-text-field
              prepend-inner-icon="mdi-card-bulleted"
              hint="연봉을 입력해주세요"
              class="me-5"
              label="Salary*"
              variant="outlined"
              type="number"
              v-model="state.salary"
              @blur="v$.salary.$touch"
              :error-messages="v$.salary.$error ? ['연봉은 최소 0원 입니다.'] : []"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="4">
            <v-text-field
              prefix="$"
              hint="자산을 입력해주세요"
              class="ms-5"
              label="Wealth*"
              variant="outlined"
              type="number"
              v-model="state.wealth"
              @blur="v$.wealth.$touch"
              :error-messages="v$.wealth.$error ? ['자산은 최소 0원 입니다.'] : []"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="4">
            <v-text-field
              prepend-inner-icon="mdi-sine-wave"
              hint="0에 가까울 수록 안정성, 10에 가까울 수록 적극성을 의미합니다"
              class="mx-auto"
              label="Tendency*"
              variant="outlined"
              type="number"
              v-model="state.tendency"
              @blur="v$.tendency.$touch"
              :error-messages="v$.tendency.$error ? ['투자 성향은 최소 0, 최대 10입니다.'] : []"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="4">
            <v-select prepend-inner-icon="mdi-timer-sand" type="number" class="me-5" hint="단위는 '개월' 입니다." :items="[6, 12, 24, 36]" label="Desire Period*" variant="outlined" required v-model="state.desirePeriod" persistent-hint></v-select>
          </v-col>
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn class="mb-5 button-custom" type="submit">Submit</v-btn>
            </v-col>
          </v-row>
        </v-row>
      </v-form>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, minValue, maxValue, sameAs } from "@vuelidate/validators";
import { useCommunityStore } from "@/stores/community";

const userStore = useCommunityStore();
const state = ref({
  username: null,
  nickname: null,
  password1: "",
  password2: "",
  age: null,
  salary: null,
  wealth: null,
  tendency: null,
  desirePeriod: null,
});

const rules = computed(() => ({
  username: { required, maxLength: maxLength(20) },
  nickname: { required, maxLength: maxLength(20) },
  password1: { required, minLength: minLength(10), maxLength: maxLength(128) },
  password2: { required, sameAs: sameAs(computed(() => state.value.password1)) },
  age: { required, minValue: minValue(18), maxValue: maxValue(99) },
  salary: { required, minValue: minValue(0) },
  wealth: { required, minValue: minValue(0) },
  tendency: { required, minValue: minValue(0), maxValue: maxValue(10) },
  desirePeriod: { required, minValue: minValue(0), maxValue: maxValue(36) },
}));

const v$ = useVuelidate(rules, state);

const submitForm = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    const payload = {
      username: state.value.username,
      nickname: state.value.nickname,
      password1: state.value.password1,
      password2: state.value.password2,
      age: state.value.age,
      salary: state.value.salary,
      wealth: state.value.wealth,
      tendency: state.value.tendency,
      desirePeriod: state.value.desirePeriod,
    };
    userStore.createUser(payload);
  } else {
    swal("Oops", "* 표시가 된 칸을 채워주세요!", "error");
  }
};
</script>

<style>
.button-custom {
  color: #f8a923;
  background-color: #fef5e7;
}
</style>
