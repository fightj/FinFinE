# from django.urls import path              원래코드
# from articles import views

# # app_name = 'articles'
# urlpatterns = [
#     path('articles/', views.article_list),
#     path('articles/<int:article_pk>/', views.article_detail),
#     path('comments/', views.comment_list),
#     path('comments/<int:comment_pk>/', views.comment_detail),
#     path('articles/<int:article_pk>/comments/', views.comment_create),
# ]


from django.urls import path
from articles import views

# app_name = 'articles'
urlpatterns = [
    path('', views.article_list), # 게시글 전체 목록
    path('<int:article_pk>/', views.article_detail), # 단일 게시글 조회 
    path('<int:article_pk>/comments/', views.article_comments), # 단일 게시글 + 댓글 목록 조회 + 댓글 생성
    path('<int:article_pk>/comments/<int:comment_pk>/', views.article_comment_detail), # 단일 게시글의 단일 댓글 수정+삭제+조회
]
