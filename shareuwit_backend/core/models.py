from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, UserManager

class UserAccount(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateField(auto_now_add=True)

    objects = UserManager()
    
    #登录用户默认选用邮箱登录
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username',]

    #string representation of UserAccount Object #UserAccount的字符串表现形式
    def __str__(self):
        return self.email



