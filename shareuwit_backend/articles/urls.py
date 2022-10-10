from django.db import router
from django.urls import URLPattern, path, include, re_path
from rest_framework.routers import SimpleRouter, DefaultRouter
from . import views

router = SimpleRouter()
router.register('article', views.ArticleViewsSet)
router.register('image', views.ArticleImageViewSet)

urlpatterns = router.urls