from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
import debug_toolbar


urlpatterns = [
    path('', include('index.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('__debug__/', include(debug_toolbar.urls)),
]

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
