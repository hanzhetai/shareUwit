from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccount(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_company = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    
    #defalut login, i chose email here #登录用户默认选用邮箱登录
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    #string representation of UserAccount Object #UserAccount的字符串表现形式
    def __str__(self):
        return self.email



