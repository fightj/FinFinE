from django.urls import path
from . import views


urlpatterns = [
    path('get_user_data/<str:search_name>/', views.detail, name='get_user_data'),
    path('edit/',views.edit),
    path('<str:username>/', views.mypage),
    path('profile/<str:username>/', views.user_profile),
    # 상품 별 관심 있는 유저 불러오기 (시간 오래 걸림. 기다려야함)
    path('get/interest/', views.get_interest),
    path('user/delete/<str:username>/', views.user_delete)
]