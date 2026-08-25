from django.db import models
from django.contrib.auth.models import AbstractUser,User
# Create your models here.
class Account(AbstractUser):
    email=models.CharField(max_length=50)
    username=models.CharField(User,max_length=100,unique=True)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    login_time=models.DateTimeField(auto_now=True)
    last_login=models.DateTimeField(auto_now_add=True)
