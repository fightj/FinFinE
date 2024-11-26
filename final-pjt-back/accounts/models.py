from django.db import models
from django.contrib.auth.models import AbstractUser
from allauth.account.adapter import DefaultAccountAdapter
from fin_api.models import SavingProduct
from fin_api.models import DepositProduct

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True)
    nickname = models.CharField(max_length=20)
    email = models.EmailField(max_length=30, blank=True, null=True)
    age = models.IntegerField(default=0)
    profile_img = models.ImageField(upload_to='images/', default='images/default_profile.png')
    salary = models.IntegerField(default=0)
    wealth = models.IntegerField(default=0)
    tendency = models.IntegerField(default=0)
    desirePeriod = models.IntegerField(default=0)
    saving = models.ManyToManyField(SavingProduct, related_name='interested_users_saving')
    deposit = models.ManyToManyField(DepositProduct, related_name='interested_users_deposit')