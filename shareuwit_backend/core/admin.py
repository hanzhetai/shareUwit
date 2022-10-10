from django.contrib import admin
from django.db import models
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserAccount

# Register your models here.
@admin.register(UserAccount)
class UserAdmin(BaseUserAdmin):
    readonly_fields=('date_joined',)
    list_display = ('username', 'email', 'first_name', 'last_name')
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'password'),
        }),
    )