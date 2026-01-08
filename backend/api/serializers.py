from rest_framework import serializers
from .models import Blog, Project, Album, Photo, Certificate, Contact, Quote


class AbsoluteImageMixin:
    """Adds absolute URL helpers for image fields."""
    def build_abs_url(self, path):
        request = self.context.get('request')
        if request and path:
            return request.build_absolute_uri(path)
        return path


class BlogSerializer(AbsoluteImageMixin, serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id', 'title', 'excerpt', 'content', 'image', 'image_url', 'category', 'read_time', 'is_featured', 'created_at', 'updated_at']

    def get_image_url(self, obj):
        return self.build_abs_url(obj.image.url if obj.image else '')


class ProjectSerializer(AbsoluteImageMixin, serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'image_url', 'technologies', 'github_url', 'live_url', 'is_featured', 'created_at']

    def get_image_url(self, obj):
        return self.build_abs_url(obj.image.url if obj.image else '')


class PhotoSerializer(AbsoluteImageMixin, serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'album', 'image', 'image_url', 'caption', 'uploaded_at']

    def get_image_url(self, obj):
        return self.build_abs_url(obj.image.url if obj.image else '')


class AlbumSerializer(AbsoluteImageMixin, serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    photo_count = serializers.SerializerMethodField()
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = ['id', 'name', 'description', 'cover_image', 'cover_image_url', 'created_at', 'photos', 'photo_count']

    def get_photo_count(self, obj):
        return obj.photos.count()

    def get_cover_image_url(self, obj):
        return self.build_abs_url(obj.cover_image.url if obj.cover_image else '')


class CertificateSerializer(AbsoluteImageMixin, serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Certificate
        fields = ['id', 'title', 'issuer', 'cert_type', 'image', 'image_url', 'credential_url', 'issue_date', 'created_at']

    def get_image_url(self, obj):
        return self.build_abs_url(obj.image.url if obj.image else '')


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = '__all__'
