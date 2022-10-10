from rest_framework import serializers
from .models import Article, Images

class ArticleImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        author_id = self.context['user_id']
        return Images.objects.create(author_id = author_id,**self.validated_data)
    class Meta:
        model = Images
        fields = ['images']

class ArticleSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    class Meta:
        model = Article
        fields = ['id','author','title','content','article_status','edit_at']

class CreateArticleSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        author_id = self.context['user_id']
        return Article.objects.create(author_id = author_id,**self.validated_data)

    class Meta:
        model = Article
        fields = ['id','title','content','article_status']

class updateArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['title', 'content','article_status']