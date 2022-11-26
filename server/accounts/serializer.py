from rest_framework import serializers
from rest_framework.validators import ValidationError
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import accounts, favorites
from goods.serializer import GoodsSerializer


class SignUpSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50)
    lastname = serializers.CharField(max_length=50)
    email = serializers.EmailField(max_length=100)
    phone = serializers.CharField(max_length=11)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = accounts
        fields = ['name', 'lastname', 'email', 'phone', 'password']

    def validate(self, attrs):
        email_exist = accounts.objects.filter(email=attrs['email']).exists()
        if email_exist:
            raise ValidationError("Email is already exist")

        return super().validate(attrs)

    def create(self, validated_data):
        password = validated_data.pop('password')

        user = super().create(validated_data)
        user.set_password(password)
        user.save()

        Token.objects.create(user=user)

        return user


class accountSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts
        fields = '__all__'


class favouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = favorites
        fields = '__all__'
