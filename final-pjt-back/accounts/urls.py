from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
urlpatterns = [
    path('<str:username>/', views.mypage),
    path('profile/<str:username>/', views.user_profile),
    # 상품 별 관심 있는 유저 불러오기 (시간 오래 걸림. 기다려야함)
    path('get/interest/', views.get_interest),
    path('user/delete/<str:username>/', views.user_delete)
]
