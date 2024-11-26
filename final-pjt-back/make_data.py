# import random
# import os
# import json
# from pathlib import Path
# import django
# from django.contrib.auth.hashers import make_password
# import environ
# from django.utils import timezone
# from accounts.models import User
# from fin_api.models import SavingProduct, DepositProduct

# # 환경 설정
# env = environ.Env(DEBUG=(bool, True))
# BASE_DIR = Path(__file__).resolve().parent.parent
# environ.Env.read_env(env_file=os.path.join(BASE_DIR, '.env'))

# # Django 설정 초기화
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fin_pjt.settings")
# django.setup()

# # 랜덤 이름 생성 함수
# first_name_samples = "김이박최정강조윤장임신유한오서전황원문양손배백"
# middle_name_samples = "민효세경서예지도하주윤채현지진승"
# last_name_samples = "준윤우원호후서연아은진수혁영경환인"

# def random_name():
#     result = random.choice(first_name_samples)
#     result += random.choice(middle_name_samples)
#     result += random.choice(last_name_samples)
#     return result + str(random.randint(1, 100))

# # 랜덤 사용자 생성 함수
# def create_random_user(index):
#     # 랜덤 사용자 데이터 생성
#     username = f"user{index}"
#     nickname = f"nickname{index}"
#     email = f"user{index}@example.com"
#     age = random.randint(20, 60)
#     salary = random.randint(20000, 100000)
#     wealth = random.randint(1000, 5000)
#     tendency = random.randint(1, 5)
#     desirePeriod = random.randint(1, 10)

#     # 프로필 이미지 URL 생성 (기본값 사용)
#     profile_img = 'images/default_profile.png'

#     # SavingProduct와 DepositProduct는 미리 정의되어 있어야 하므로, 예시로 첫 번째 항목을 할당
#     saving = SavingProduct.objects.all()[:1]  # 예시로 첫 번째 저장된 제품을 선택
#     deposit = DepositProduct.objects.all()[:1]  # 예시로 첫 번째 예금 제품을 선택
    
#     # User 객체 생성
#     user = User(
#         username=username,
#         nickname=nickname,
#         email=email,
#         age=age,
#         profile_img=profile_img,
#         salary=salary,
#         wealth=wealth,
#         tendency=tendency,
#         desirePeriod=desirePeriod,
#         password=make_password("defaultpassword123"),  # 비밀번호 해시화
#     )
    
#     # User 객체 저장
#     user.save()
    
#     # SavingProduct와 DepositProduct 관계 설정
#     user.saving.set(saving)
#     user.deposit.set(deposit)

#     return user

# # JSON 파일로 데이터 저장
# def save_to_json(users):
#     users_data = []
#     for user in users:
#         if isinstance(user, dict):  # user가 딕셔너리일 경우
#             user_data = {
#                 'username': user.get('username', ''),
#                 'nickname': user.get('nickname', ''),
#                 'email': user.get('email', ''),
#                 'age': user.get('age', 0),
#                 'profile_img': user.get('profile_img', {}).get('url', None) if user.get('profile_img') else None,
#                 'salary': user.get('salary', 0),
#                 'wealth': user.get('wealth', 0),
#                 'tendency': user.get('tendency', 0),
#                 'desirePeriod': user.get('desirePeriod', 0),
#                 'saving': [product.name for product in user.get('saving', [])],
#                 'deposit': [product.name for product in user.get('deposit', [])],
#                 'is_active': user.get('is_active', False),
#                 'is_staff': user.get('is_staff', False),
#                 'is_superuser': user.get('is_superuser', False),
#             }
#         else:  # user가 모델 인스턴스일 경우
#             user_data = {
#                 'username': user.username,
#                 'nickname': user.nickname,
#                 'email': user.email,
#                 'age': user.age,
#                 'profile_img': user.profile_img.url if user.profile_img else None,
#                 'salary': user.salary,
#                 'wealth': user.wealth,
#                 'tendency': user.tendency,
#                 'desirePeriod': user.desirePeriod,
#                 'saving': [product.name for product in user.saving.all()],
#                 'deposit': [product.name for product in user.deposit.all()],
#                 'is_active': user.is_active,
#                 'is_staff': user.is_staff,
#                 'is_superuser': user.is_superuser,
#             }
        
#         users_data.append(user_data)

#     with open('users.json', 'w', encoding='utf-8') as f:
#         json.dump(users_data, f, ensure_ascii=False, indent=4)

# # 사용자 생성
# def generate_users(num_users=100):
#     users_data = []
#     for i in range(1, num_users + 1):
#         user = create_random_user(i)
#         users_data.append({
#             "model": "accounts.User",
#             "pk": user.id,
#             "fields": {
#                 'username': user.username,
#                 'nickname': user.nickname,
#                 'age': user.age,
#                 'profile_img': user.profile_img.url,  # URL로 저장
#                 'salary': user.salary,
#                 'wealth': user.wealth,
#                 'tendency': user.tendency,
#                 'password': user.password,  # 비밀번호 저장
#                 'desirePeriod': user.desirePeriod,
#                 'is_active': user.is_active,
#                 'is_staff': user.is_staff,
#                 'is_superuser': user.is_superuser,
#             }
#         })
#     save_to_json(users_data)

# # 사용자 생성 실행
# generate_users(100)  # 100명의 사용자 생성
