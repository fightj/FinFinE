from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Article, Comment
from datetime import datetime

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'nickname', 'profile_img',)

class ArticleListSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y.%m.%d')
    updated_at = serializers.DateTimeField(format='%Y.%m.%d')
    user = UserSerializer(read_only=True)
    class Meta:
        model = Article
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y.%m.%d',read_only = True)
    updated_at = serializers.DateTimeField(format='%Y.%m.%d', read_only = True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at',)  # 읽기 전용 필드

    

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article','user',)