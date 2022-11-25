from django.shortcuts import render
from .serializer import GoodsSerializer
from .models import Goods
from django.contrib.auth import authenticate, logout, login
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny


class GoodsView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def get(self, request: Request):
        goods = Goods.objects.all()
        serializer = GoodsSerializer(goods, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        return


class GoodView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def get(self, request: Request, pk):
        try:
            good = Goods.objects.get(pk=pk)
        except good.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if request.method == 'GET':
            serializer = GoodsSerializer(good)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        return
