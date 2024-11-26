from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
# 초기 상품 데이터 생성하기
  path('get_deposit_products/', views.get_deposit_products),
  path('get_saving_products/', views.get_saving_products),
  
# deposit
  path('deposit/', views.deposit_product_list),
  path('deposit/<str:deposit_name>/', views.deposit_detail),
  path('deposit/<str:deposit_name>/option/', views.deposit_option_list),
  path('deposit/<str:deposit_code>/option/<int:option_id>/', views.deposit_option_detail),
  path('bank/deposit/<str:bank_name>/', views.bank_deposit),
  path('like/deposit/<str:deposit_code>/', views.like_deposit),

  # 상품추천
  path('recommend/deposit/<str:username>/', views.deposit_recommend),
  path('recommend/saving/<str:username>/', views.saving_recommend),


# saving
  path('saving/', views.saving_product_list),
  path('saving/<str:saving_name>/', views.saving_detail),
  path('saving/<str:saving_name>/option/', views.saving_option_list),
  path('saving/<str:saving_code>/option/<int:option_id>/', views.saving_option_detail),
  path('bank/saving/<str:bank_name>/', views.bank_saving),
  path('like/saving/<str:saving_code>/', views.like_saving),


  # path('api/favorite-deposits/<int:user_id>/', UserFavoriteDepositProducts.as_view(), name='favorite-deposits'),
  # path('api/favorite-savings/<int:user_id>/', UserFavoriteSavingProducts.as_view(), name='favorite-savings'),

  # 상품 추천(비슷한 나이대)
  path('recommend/deposit/second/<str:username>/', views.deposit_recommend_second),
  path('recommend/saving/second/<str:username>/', views.saving_recommend_second),

  path('api/popular-products/', views.get_popular_products, name='popular-products'),
]