from itertools import product
from django.conf import settings
from django.db import models
from uuid import uuid4

# 文章数据模型
class Article(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='articles')
    title = models.TextField(max_length=255)
    content = models.TextField()
    # 文章状态，1为发表，0为保存未发表,默认为保存
    article_status = models.BooleanField(default=0)
    edit_at = models.DateField(auto_now_add=True)
    create_at = models.DateField(auto_now_add=True)

    # 暂按时间排序
    class Meta:
        ordering = ['edit_at']

# 图片数据模型
class Images(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='images')
    images = models.ImageField(upload_to = 'media/images', blank = False)
    create_at = models.DateField(auto_now_add=True)