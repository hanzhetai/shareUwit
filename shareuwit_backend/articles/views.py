from requests import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from .models import Article, Images
from .serializers import ArticleSerializer, CreateArticleSerializer, updateArticleSerializer, ArticleImageSerializer

class ArticleViewsSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch']
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateArticleSerializer
        if self.request.method == 'PATCH':
            return updateArticleSerializer
        return ArticleSerializer

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}

class ArticleImageViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch']
    queryset = Images.objects.all()
    serializer_class = ArticleImageSerializer
    parser_classes = [MultiPartParser, FormParser, FileUploadParser]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ArticleImageSerializer
        if self.request.method == 'POST':
            return ArticleImageSerializer

    def get_serializer_context(self):
        return {'user_id': self.request.user.id}