<template>
  <div class="homebackcolor">
    <div v-if="isLoading" class="loading-screen">
    <v-container fill-height align="center" justify="center">
      <v-progress-circular :model-value="value" :rotate="360" :size="100" :width="15" color="amber">
        <template v-slot:default>{{ value }} %</template>
      </v-progress-circular>
    </v-container>
  </div>
  <v-container v-else v-if="userProfile">
    <v-card class="mx-auto py-5">
      <v-row>
        <v-col class="my-auto" cols="6">
          <!-- 사용자 프로필 섹션 -->
          <v-container align="center">
            <v-avatar :image="profileImg" size="200" alt="User Profile Image" cover></v-avatar>
            <v-card-title class="mt-3 ibm-plex-sans-kr-bold">
              <h2>{{ userProfile.nickname }} 님</h2>
            </v-card-title>
            <v-card-text class="ibm-plex-sans-kr-bold">
              <h3>{{ userProfile.username }} (만 {{ userProfile.age }}세)</h3>
            </v-card-text>
          </v-container>
          <v-card-actions>
            <v-container class="py-0 my-0 text-center">
              <v-dialog v-model="dialog" max-width="600" @click:outside="preventClose" persistent>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn v-bind="activatorProps" color="yellow-darken-3"variant="tonal" text="Edit Profile"></v-btn>
                </template>
                <v-card prepend-icon="mdi-account" title="User Profile" :style="{ maxHeight: '1000px', overflowY: 'auto' }">
                  <v-card-text>
                    <v-form @submit.prevent="submitForm">
                      <v-row dense>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field label="Nickname*" v-model="form.nickname" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field label="Age*" type="number" v-model="form.age" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field label="Salary*" type="number" v-model="form.salary" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field label="Wealth*" type="number" v-model="form.wealth" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field label="Password*" type="password" v-model="form.password1" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field label="Confirm Password*" type="password" v-model="form.password2" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" label="Tendency*" v-model="form.tendency" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select :items="[6, 12, 24, 36]" label="Desire Period*" v-model="form.desirePeriod" required></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-file-input prepend-icon="mdi-camera" label="Profile Image" accept="image/" v-model="form.profile_img"></v-file-input>
                        </v-col>
                      </v-row>
                      <small class="text-caption text-medium-emphasis">*indicates required field</small>
                    </v-form>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-row justify="space-between" align="center" class="w-100">
                      <v-col cols="auto">
                        <v-btn color="red" text="Accounts Delete" variant="plain" @click="deleteAccount"></v-btn>
                      </v-col>
                      <v-col cols="auto">
                        <v-btn color="primary" text="Save" variant="tonal" @click="submitForm"></v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-container>
          </v-card-actions>
          <v-col class="text-center">
            <v-container>
              <v-card-title class="ibm-plex-sans-kr-bold"><h4>나의 금융 정보</h4></v-card-title>
              <div class="px-4 mb-2">
                <v-chip class="chip-style mx-1 my-1">
                  나의 연봉 :
                  {{
                    new Intl.NumberFormat("ko-KR", {
                      style: "currency",
                      currency: "KRW",
                    }).format(userProfile.salary)
                  }}
                </v-chip>
                <v-chip class="chip-style mx-1 my-1">
                  나의 자산 :
                  {{
                    new Intl.NumberFormat("ko-KR", {
                      style: "currency",
                      currency: "KRW",
                    }).format(userProfile.wealth)
                  }}
                </v-chip>
                <v-chip class="chip-style mx-1 my-1">나의 저축 성향 : {{ userProfile.tendency }}</v-chip>
                <v-chip class="chip-style mx-1 my-1">나의 저축 희망 기간 : {{ userProfile.desirePeriod }}개월</v-chip>
              </div>
            </v-container>
          </v-col>
        </v-col>
        <!-- 예금 섹션 -->
        <v-col class="px-0 mx-0" cols="6">
          <v-row class="px-0 mx-0">
            <v-container v-if="depositStore.profileDepositData.length" class="py-0 my-7">
              <v-row class="ms-12 mb-1" justify="end">
                <v-badge class="badge-style" color="yellow" :content="depositStore.profileDepositData.length"></v-badge>
                <v-img class="mb-0 me-3" :src="jar" max-width="45"></v-img>
                <v-row class="py-0 my-0" align="end">
                  <v-col class="mx-0 py-0 my-0 px-0" cols="7">
                    <h2 class="ms-1 font-weight-black ibm-plex-sans-kr-regular">
                      찜한
                      <span class="span-text">예금</span>
                    </h2>
                  </v-col>
                </v-row>
              </v-row>
              <v-carousel height="300" show-arrows="hover" hide-delimiters>
                <v-carousel-item v-for="(honeyDeposit, index) in depositStore.profileDepositData" :key="`carousel1-${index}`" class="no-padding">
                  <v-card class="mx-16 fill-height d-flex align-center justify-center" elevation="0">
                    <v-card class="card-design mb-2 density-compact" :prepend-avatar="getBankIcon(honeyDeposit.kor_co_nm)" variant="text">
                      <template v-slot:subtitle>
                        <span class="ibm-plex-sans-kr-regular">{{ honeyDeposit.kor_co_nm }}</span>
                      </template>
                      <template v-slot:title>
                        <span class="font-weight-black ibm-plex-sans-kr-regular">
                          <h4>{{ honeyDeposit.fin_prdt_nm }}</h4>
                        </span>
                        <v-spacer></v-spacer>
                        <v-btn class="absolute-btn" elevation="0" icon @click="removeDepositCard(honeyDeposit)">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                      <template v-if="depositLoding">
                        <v-card-text class="mt-3 pb-0 ibm-plex-sans-kr-regular d-flex justify-center">
                          <v-progress-linear color="yellow-darken-2" indeterminate></v-progress-linear>
                        </v-card-text>
                      </template>
                      <v-card-text class="mt-3 pb-0 ibm-plex-sans-kr-regular">가입 방법 : {{ honeyDeposit.join_way }}</v-card-text>
                      <v-card-text class="ibm-plex-sans-kr-regular">만기 후 이자율 : {{ honeyDeposit.mtrt_int }}</v-card-text>
                      <v-container align="center">
                        <v-btn color="yellow-darken-3" variant="tonal" @click="viewDetailDeposit(honeyDeposit)">Details</v-btn>
                        <v-dialog v-model="viewDetailDepositDialog" width="1000">
                          <v-card class="mx-auto" width="1000">
                            <template v-slot:subtitle>
                              <v-row>
                                <v-col cols="4"></v-col>
                                <v-col align="center" cols="4">
                                  <div class="my-2 custom-subtitle ibm-plex-sans-kr-regular">{{ selectedDeposit?.kor_co_nm }} ({{ selectedDeposit?.dcls_month }})</div>
                                </v-col>
                              </v-row>
                            </template>
                            <template v-slot:title>
                              <v-row align="center" justify="space-between">
                                <v-col align="center"></v-col>
                                <v-col align="center" class="pb-0 my-2">
                                  <span class="font-weight-black ibm-plex-sans-kr-regular">
                                    <h2>{{ selectedDeposit?.fin_prdt_nm }}</h2>
                                  </span>
                                </v-col>
                                <v-col align="center" class="pb-0 mt-2"></v-col>
                              </v-row>
                            </template>

                            <hr />
                            <v-row justify="center" align="center">
                              <v-col cols="3" class="d-flex justify-center">
                                <v-tooltip activator="parent" location="top">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-img class="mb-0" :src="jar" width="40px" height="40px" :style="{ display: 'inline-block', marginLeft: '8px' }" v-bind="attrs" v-on="on"></v-img>
                                  </template>
                                  찜한 이용자 수
                                </v-tooltip>
                              </v-col>
                              <v-col>
                                <v-card-text class="">{{ honeyDeposit.interest_user?.length }} 명</v-card-text>
                              </v-col>
                            </v-row>
                            <hr />
                            <v-row justify="center" align="center">
                              <v-col cols="3" class="d-flex justify-center">
                                <v-card-text class="text-style" align="center">가입 방법</v-card-text>
                              </v-col>
                              <v-col>
                                <v-card-text class="">{{ selectedDeposit?.join_way }}</v-card-text>
                              </v-col>
                            </v-row>
                            <hr />
                            <v-row justify="center" align="center">
                              <v-col cols="3" class="d-flex justify-center">
                                <v-card-text class="text-style" align="center">만기 후 이자율</v-card-text>
                              </v-col>
                              <v-col>
                                <v-card-text class="me-12">{{ selectedDeposit?.mtrt_int }}</v-card-text>
                              </v-col>
                            </v-row>
                            <hr />
                            <v-row justify="center" align="center">
                              <v-col cols="3" class="d-flex justify-center">
                                <v-card-text class="text-style" align="center">우대 조건</v-card-text>
                              </v-col>
                              <v-col>
                                <v-card-text class="me-12">{{ selectedDeposit?.spcl_cnd }}</v-card-text>
                              </v-col>
                            </v-row>
                            <hr />
                            <v-row justify="center" align="center">
                              <v-col cols="3" class="d-flex justify-center">
                                <v-card-text class="text-style" align="center">가입 대상</v-card-text>
                              </v-col>
                              <v-col>
                                <v-card-text class="">{{ selectedDeposit?.join_member }}</v-card-text>
                              </v-col>
                            </v-row>
                            <hr />
                            <v-row justify="center" align="center">
                              <v-col cols="3" class="d-flex justify-center">
                                <v-card-text class="text-style" align="center">가입 제한</v-card-text>
                              </v-col>
                              <v-col>
                                <v-card-text class="">
                                  {{ selectedDeposit?.join_deny == 1 ? "제한없음" : selectedDeposit?.join_deny == 2 ? "서민전용" : selectedDeposit?.join_deny == 3 ? "일부제한" : "기타" }}
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
                                    selectedDeposit?.max_limit === null
                                      ? "한도 없음"
                                      : `${new Intl.NumberFormat("ko-KR", {
                                          style: "currency",
                                          currency: "KRW",
                                        }).format(selectedDeposit?.max_limit)}`
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
                                <v-card-text class="me-12">{{ selectedDeposit?.etc_note }}</v-card-text>
                              </v-col>
                            </v-row>
                            <hr />
                            <v-row justify="center" class="mt-2" align="center">
                              <v-col>
                                <DepositChartComponent :data="honeyDeposit.depositoption_set" :title="honeyDeposit.fin_prdt_nm" />
                              </v-col>
                            </v-row>
                            <hr />
                            <v-card-actions class="justify-center">
                              <v-btn class="mb-6" @click="viewDetailDepositDialog = false">OK</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-container>
                    </v-card>
                  </v-card>
                </v-carousel-item>
              </v-carousel>
            </v-container>
            <v-container v-else>
              <v-container class="my-6 py-6 ibm-plex-sans-kr-regular" align="center" justify="center">
                <v-img width="100" :src="empty"></v-img>
                <p class="gray-text">찜한 예금이 없어요...</p>
                <v-btn @click="goDeposit" color="yellow-darken-2 mt-4" size="large" variant="tonal">
                  <p class="ibm-plex-sans-kr-regular bold-text">예금 찜하러 가기!</p>
                </v-btn>
              </v-container>
            </v-container>
          </v-row>
          <!-- 적금 섹션 -->
          <v-row class="py-0 my-0">
            <v-col class="d-flex align-center justify-center py-0 my-0">
              <v-container class="py-0 mb-0" v-if="savingStore.profileSavingData.length">
                <v-row class="ms-12 mb-1" justify="end">
              <v-badge class="badge-style" color="yellow" :content="savingStore.profileSavingData.length"></v-badge>
              <v-img class="mb-0 me-3" :src="jar" max-width="45"></v-img> <!-- me-3으로 여백 증가 -->
              <v-row class="py-0 my-0" align="end">
                <v-col class="mx-0 py-0 my-0 px-0" cols="7">
                  <h2 class="ms-1 font-weight-black ibm-plex-sans-kr-regular">
                    찜한
                    <span class="span-text">적금</span>
                  </h2>
                </v-col>
              </v-row>
            </v-row>
                <v-carousel height="300" show-arrows="hover" hide-delimiters>
                  <v-carousel-item v-for="(honeySaving, index) in savingStore.profileSavingData" :key="`carousel2-${index}`" class="no-padding">
                    <v-card class="mx-16 fill-height d-flex align-center justify-center" elevation="0">
                      <v-card class="card-design mb-2 density-compact" :prepend-avatar="getBankIcon(honeySaving.kor_co_nm)" variant="text">
                        <template v-slot:subtitle>
                          <span class="ibm-plex-sans-kr-regular">{{ honeySaving.kor_co_nm }}</span>
                        </template>
                        <template v-slot:title>
                          <span class="font-weight-black ibm-plex-sans-kr-regular">
                            <h4>{{ honeySaving.fin_prdt_nm }}</h4>
                          </span>
                          <v-spacer></v-spacer>
                          <v-btn class="absolute-btn" elevation="0" icon @click="removeSavingCard(honeySaving)">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </template>
                        <template v-if="savingLoding">
                          <v-card-text class="mt-3 pb-0 ibm-plex-sans-kr-regular d-flex justify-center">
                            <v-progress-linear color="yellow-darken-2" indeterminate></v-progress-linear>
                          </v-card-text>
                        </template>
                        <v-card-text class="mt-3 pb-0 ibm-plex-sans-kr-regular">가입 방법 : {{ honeySaving.join_way }}</v-card-text>
                        <v-card-text class="ibm-plex-sans-kr-regular">만기 후 이자율 : {{ honeySaving.mtrt_int }}</v-card-text>
                        <v-container align="center">
                          <v-btn color="yellow-darken-3" variant="tonal" @click="viewDetailSaving(honeySaving)">Details</v-btn>
                          <v-dialog v-model="viewDetailSavingDialog" width="1000">
                            <v-card class="mx-auto" width="1000">
                              <template v-slot:subtitle>
                                <v-row>
                                  <v-col cols="4"></v-col>
                                  <v-col align="center" cols="4">
                                    <div class="my-2 custom-subtitle ibm-plex-sans-kr-regular">{{ selectedSaving?.kor_co_nm }} ({{ selectedSaving?.dcls_month }})</div>
                                  </v-col>
                                </v-row>
                              </template>
                              <template v-slot:title>
                                <v-row align="center" justify="space-between">
                                  <v-col align="center"></v-col>
                                  <v-col align="center" class="pb-0 my-2">
                                    <span class="font-weight-black ibm-plex-sans-kr-regular">
                                      <h2>{{ selectedSaving?.fin_prdt_nm }}</h2>
                                    </span>
                                  </v-col>
                                  <v-col align="center" class="pb-0 mt-2"></v-col>
                                </v-row>
                              </template>
                              <hr />
                              <v-row justify="center" align="center">
                                <v-col cols="3" class="d-flex justify-center">
                                  <v-tooltip activator="parent" location="top">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-img class="mb-0" :src="jar" width="40px" height="40px" :style="{ display: 'inline-block', marginLeft: '8px' }" v-bind="attrs" v-on="on"></v-img>
                                    </template>
                                    찜한 이용자 수
                                  </v-tooltip>
                                </v-col>
                                <v-col>
                                  <v-card-text class="">{{ honeySaving.interest_user?.length }} 명</v-card-text>
                                </v-col>
                              </v-row>
                              <hr />
                              <v-row justify="center" align="center">
                                <v-col cols="3" class="d-flex justify-center">
                                  <v-card-text class="text-style" align="center">가입 방법</v-card-text>
                                </v-col>
                                <v-col>
                                  <v-card-text class="">{{ selectedSaving?.join_way }}</v-card-text>
                                </v-col>
                              </v-row>
                              <hr />
                              <v-row justify="center" align="center">
                                <v-col cols="3" class="d-flex justify-center">
                                  <v-card-text class="text-style" align="center">만기 후 이자율</v-card-text>
                                </v-col>
                                <v-col>
                                  <v-card-text class="me-12">{{ selectedSaving?.mtrt_int }}</v-card-text>
                                </v-col>
                              </v-row>
                              <hr />
                              <v-row justify="center" align="center">
                                <v-col cols="3" class="d-flex justify-center">
                                  <v-card-text class="text-style" align="center">우대 조건</v-card-text>
                                </v-col>
                                <v-col>
                                  <v-card-text class="me-12">{{ selectedSaving?.spcl_cnd }}</v-card-text>
                                </v-col>
                              </v-row>
                              <hr />
                              <v-row justify="center" align="center">
                                <v-col cols="3" class="d-flex justify-center">
                                  <v-card-text class="text-style" align="center">가입 대상</v-card-text>
                                </v-col>
                                <v-col>
                                  <v-card-text class="">{{ selectedSaving?.join_member }}</v-card-text>
                                </v-col>
                              </v-row>
                              <hr />
                              <v-row justify="center" align="center">
                                <v-col cols="3" class="d-flex justify-center">
                                  <v-card-text class="text-style" align="center">가입 제한</v-card-text>
                                </v-col>
                                <v-col>
                                  <v-card-text class="">
                                    {{ selectedSaving?.join_deny == 1 ? "제한없음" : selectedSaving?.join_deny == 2 ? "서민전용" : selectedSaving?.join_deny == 3 ? "일부제한" : "기타" }}
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
                                      selectedSaving?.max_limit === null
                                        ? "한도 없음"
                                        : `${new Intl.NumberFormat("ko-KR", {
                                            style: "currency",
                                            currency: "KRW",
                                          }).format(selectedSaving?.max_limit)}`
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
                                  <v-card-text class="me-12">{{ selectedSaving?.etc_note }}</v-card-text>
                                </v-col>
                              </v-row>
                              <hr />
                              <v-row justify="center" align="center">
                                <v-col>
                                  <SavingChartComponent :data="honeySaving.savingoption_set" :title="honeySaving.fin_prdt_nm" />
                                </v-col>
                              </v-row>
                              <hr />
                              <v-card-actions class="justify-center">
                                <v-btn class="mb-6" @click="viewDetailSavingDialog = false">OK</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-container>
                      </v-card>
                    </v-card>
                  </v-carousel-item>
                </v-carousel>
              </v-container>
              <v-container v-else>
                <v-container class="my-6 py-6 ibm-plex-sans-kr-regular" align="center" justify="center">
                  <v-img width="100" :src="empty"></v-img>
                  <p class="gray-text">찜한 적금이 없어요...</p>
                  <v-btn 
                    @click="goSaving" 
                    size="large" 
                    variant="tonal" 
                    color="yellow-darken-2 mt-4"
                  >
                    <p class="ibm-plex-sans-kr-regular bold-text">적금 찜하러가기!</p>
                  </v-btn>
              
                </v-container>
              </v-container>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  </div>
  
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCommunityStore } from "@/stores/community";
import axios from "axios";
import { useDepositStore } from "@/stores/deposit";
import { useSavingStore } from "@/stores/saving";
import jar from "@/assets/jar.png";
import empty from "@/assets/profile_empty.png";

import { useRouter } from "vue-router";
import swal from "sweetalert";
import DepositChartComponent from "@/components/DepositChartComponent.vue";
import SavingChartComponent from "@/components/SavingChartComponent.vue";

import Kyungnam from "@/assets/bank/Kyungnam.jpg";
import Gwangju from "@/assets/bank/Gwangju.jpg";
import Kookmin from "@/assets/bank/Kookmin.jpg";
import Nonghyup from "@/assets/bank/Nonghyup.jpg";
import Daegu from "@/assets/bank/Daegu.jpg";
import Busan from "@/assets/bank/Busan.jpg";
import Suhyup from "@/assets/bank/Suhyup.jpg";
import StandardChartered from "@/assets/bank/StandardChartered.jpg";
import Shinhan from "@/assets/bank/Shinhan.jpg";
import Woori from "@/assets/bank/Woori.jpg";
import Jeonbuk from "@/assets/bank/Jeonbuk.jpg";
import Jeju from "@/assets/bank/Jeju.jpg";
import IBK from "@/assets/bank/IBK.jpg";
import Kakao from "@/assets/bank/Kakao.jpg";
import Kbank from "@/assets/bank/Kbank.png";
import Toss from "@/assets/bank/Toss.jpg";
import Hana from "@/assets/bank/Hana.jpg";
import KDB from "@/assets/bank/KDB.jpg";

const bankIcon = {
  경남은행: Kyungnam,
  광주은행: Gwangju,
  국민은행: Kookmin,
  농협은행주식회사: Nonghyup,
  대구은행: Daegu,
  부산은행: Busan,
  수협은행: Suhyup,
  한국스탠다드차타드은행: StandardChartered,
  신한은행: Shinhan,
  우리은행: Woori,
  전북은행: Jeonbuk,
  제주은행: Jeju,
  중소기업은행: IBK,
  "주식회사 카카오뱅크": Kakao,
  "주식회사 케이뱅크": Kbank,
  "토스뱅크 주식회사": Toss,
  하나은행: Hana,
  한국산업은행: KDB,
};

const getBankIcon = function (korCoNm) {
  return bankIcon[korCoNm] || "defaultIcon";
}; // 기본 아이콘 설정 가능

const router = useRouter();
const depositLoding = ref(false);
const savingLoding = ref(false);
const depositStore = useDepositStore();
const savingStore = useSavingStore();
const userStore = useCommunityStore();

const { userProfile } = storeToRefs(userStore);

const isLoading = ref(true);
const value = ref(0);
const interval = ref(-1);

const selectedDeposit = ref(null); // 선택된 예금 데이터
const selectedSaving = ref(null); // 선택된 적금 데이터

onMounted(() => {
  userStore.getProfile();
  checkDeposit();
  checkSaving();
  // 프로그레스 서클 업데이트
  interval.value = setInterval(() => {
    if (value.value === 100) {
      value.value = 100;
    } else {
      value.value += 5;
    }
  }, 200);

  setTimeout(() => {
    isLoading.value = false;
    clearInterval(interval.value);
  }, 4000);
});

// 꿀바른 상품 확인 함수
const checkDeposit = function () {
  depositStore.getProfileDeposit(userProfile.value.interest_deposit);
};

const checkSaving = function () {
  savingStore.getProfileSaving(userProfile.value.interest_saving);
};

const dialog = ref(false);
const form = ref({
  nickname: `${userProfile.value.nickname}`,
  age: `${userProfile.value.age}`,
  salary: `${userProfile.value.salary}`,
  wealth: `${userProfile.value.wealth}`,
  password1: `${userProfile.value.password1}`,
  password2: `${userProfile.value.password2}`,
  tendency: `${userProfile.value.tendency}`,
  desirePeriod: `${userProfile.value.desirePeriod}`,
  profile_img: null, // 프로필 이미지
});

const profileImg = computed(() => {
  console.log(userProfile.value.profile_img)
  return `http://localhost:8000${userProfile.value.profile_img}`;
});

const submitForm = async () => {
  const formData = new FormData();
  formData.append("nickname", form.value.nickname);
  formData.append("age", form.value.age);
  formData.append("salary", form.value.salary);
  formData.append("wealth", form.value.wealth);
  formData.append("password1", form.value.password1);
  formData.append("password2", form.value.password2);
  formData.append("tendency", form.value.tendency);
  formData.append("desirePeriod", form.value.desirePeriod);
  if (form.value.profile_img) {
    formData.append("profile_img", form.value.profile_img);
  }
  axios({
    method: "put",
    url: `http://127.0.0.1:8000/accounts/${userProfile.value.username}/`,
    data: formData,
    headers: {
      Authorization: `Token ${userStore.token}`,
    },
  })
    .then((res) => {
      swal("성공적으로 저장되었습니다!", "You clicked the button!", "success");
      dialog.value = false;
      userStore.getProfile(); // 업데이트된 프로필을 다시 가져옵니다.
    })
    .catch((err) => {
      console.log(err);
    });
};

const preventClose = function () {
  swal("Save 버튼을 눌러주세요!");
};

const viewDetailDepositDialog = ref(false);
const viewDetailSavingDialog = ref(false);

const viewDetailDeposit = function (depositData) {
  selectedDeposit.value = depositData;
  viewDetailDepositDialog.value = true;
};

const viewDetailSaving = function (savingData) {
  selectedSaving.value = savingData;
  viewDetailSavingDialog.value = true;
};

const goSaving = function () {
  router.push({ name: "SavingProductsView" });
};
const goDeposit = function () {
  router.push({ name: "DepositProductsView" });
};

const deleteAccount = function () {
  swal({
    title: "정말 떠나실 건가요..?",
    text: "가지마요.. ㅜ.ㅜ",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("찜이 완전히 제거되었습니다", {
        icon: "success",
      });
      axios({
        method: "delete",
        url: `http://127.0.0.1:8000/accounts/user/delete/${userProfile.value.username}/`,
        headers: {
          Authorization: `Token ${userStore.token}`,
        },
      })
        .then((res) => {
          userStore.logoutUser();
          router.push({ name: "home" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      swal("좋은 판단이에요!");
    }
  });
};

const removeDepositCard = function (removeDepositData) {
  depositLoding.value = true;
  setTimeout(() => {
    depositLoding.value = false;
  }, 1000);
  // 카드 삭제 로직
  depositStore.getHoney(removeDepositData.fin_prdt_cd, removeDepositData.fin_prdt_nm);
  depositStore.toggleData(removeDepositData);
  checkDeposit();
};
const removeSavingCard = function (removeSavingData) {
  savingLoding.value = true;
  setTimeout(() => {
    savingLoding.value = false;
  }, 1000);
  // 카드 삭제 로직
  savingStore.getHoney(removeSavingData.fin_prdt_cd, removeSavingData.fin_prdt_nm);
  savingStore.toggleData(removeSavingData);
  checkSaving();
};
</script>

<style scoped>
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
}

.chip-style {
  cursor: pointer;
}
.chip-style:hover {
  background-color: rgba(255, 162, 0, 0.199);
}

.card-design {
  border-radius: 8px;
  background-color: rgba(253, 248, 222, 0.658);
}

.hoverable-row {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.hoverable-row:hover {
  background-color: #f5f5f5;
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
.button-image {
  transition: transform 0.3s ease-in-out;
}

.hover-effect:hover {
  transform: translateY(-10px);
}
.absolute-btn {
  position: absolute;
  background-color: #ffffff00;
  font-size: 15px;
  top: 15px; /* 카드 위쪽에서의 거리 조절 */
  right: 15px; /* 카드 오른쪽에서의 거리 조절 */
  width: 25px; /* 버튼의 너비 조절 */
  height: 25px; /* 버튼의 높이 조절 */
}
.gray-text {
  color: rgba(159, 159, 159, 0.579);
  font-size: larger;
  margin-top: 10px;
}

.bold-text {
  font-weight: bold;
}
.span-text {
  color: #e28000a9;
}
.homebackcolor{
  background-color: #FFFFF0;
}

</style>
