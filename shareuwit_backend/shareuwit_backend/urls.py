from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
import debug_toolbar


urlpatterns = [
    # path('', include('index.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('articles/', include('articles.urls')),
    path('__debug__/', include(debug_toolbar.urls)),
] + static(settings.MEDIA_IMG_URL, document_root = settings.MEDIA_IMG_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_IMG_URL, document_root = settings.MEDIA_IMG_ROOT)

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
