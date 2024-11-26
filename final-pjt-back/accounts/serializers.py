from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer, TokenSerializer, TokenModel, UserDetailsSerializer
from .models import User
from django.contrib.auth import get_user_model
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from fin_api.serializers import InterestDepositSerializer, InterestSavingSerializer
# 유저 생성
class CustomRegisterSerializer(RegisterSerializer):
    nickname = serializers.CharField(max_length=20, required=True, allow_blank=False)
    email = serializers.EmailField(required=False)
    age = serializers.IntegerField(required=True)
    salary = serializers.IntegerField(required=True)
    wealth = serializers.IntegerField(required=True)
    tendency = serializers.IntegerField(required=True)
    desirePeriod = serializers.IntegerField(required=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data.update({
            'nickname': self.validated_data.get('nickname', ''),
            'age': self.validated_data.get('age', ''),
            'salary': self.validated_data.get('salary', ''),
            'wealth': self.validated_data.get('wealth', ''),
            'tendency': self.validated_data.get('tendency', ''),
            'desirePeriod': self.validated_data.get('desirePeriod', ''),
        })
        return data

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.nickname = self.cleaned_data.get('nickname')
        user.age = self.cleaned_data.get('age')
        user.salary = self.cleaned_data.get('salary')
        user.wealth = self.cleaned_data.get('wealth')
        user.tendency = self.cleaned_data.get('tendency')
        user.desirePeriod = self.cleaned_data.get('desirePeriod')
        
        user.save()
        return user
    
class CustomLoginSerializer(LoginSerializer):
    email = None

# 로그인 시 유저 정보 전달
class CustomUserDetailSerializer(UserDetailsSerializer):
    class Meta:
         model = get_user_model()
         fields = ('id','username','nickname','age','salary','wealth','tendency','desirePeriod','saving','deposit')

class CustomTokenSerializer(TokenSerializer):
    user = CustomUserDetailSerializer(read_only=True)
    class Meta:
        model = TokenModel
        fields = ('key', 'user')

class UserPageSerializer(serializers.ModelSerializer):
    # profile_img = serializers.ImageField(use_url=True)
    interest_deposit = InterestDepositSerializer(many=True)
    interest_saving = InterestSavingSerializer(many=True)
    class Meta:
        model = User
        exclude = ('password',)
        read_only_fields = ('id','username', 'email')

class UserInfoChangeSerializer(serializers.ModelSerializer):
     class Meta:
          model = User
          fields = ('nickname', 'age', 'profile_img', 'salary', 'wealth', 'tendency', 'desirePeriod')

class UserGetInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'deposit', 'saving')



class NewInfoChangeSerializer(serializers.ModelSerializer):
     class Meta:
          model = User
          fields = ('nickname', 'age', 'profile_img', 'salary', 'wealth', 'tendency', 'desirePeriod', 'deposit', 'saving')