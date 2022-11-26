from django.shortcuts import render
from .serializer import SignUpSerializer, accountSerializer, favouritesSerializer
from django.http import JsonResponse
from django.contrib.auth import authenticate, logout, login
from rest_framework import generics, status
from rest_framework.response import Response
from django.http.request import HttpRequest
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from .models import accounts, favorites


class SignUpView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = SignUpSerializer

    def post(self, request: Request):
        data = request.data

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            response = {
                "message": "User created Successfully",
                "data": serializer.data
            }
            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.data, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)

        if user is not None:

            response = {
                'message': 'Login Successfull',
                'id': user.id,
                'token': user.auth_token.key
            }
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            return Response(data={'message': 'Invalid email or password'})

    def get(self, request: Request):
        content = {
            'user': str(request.user),
            'auth': str(request.auth)
        }
        return Response(data=content, status=status.HTTP_200_OK)


class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        request.user.auth_token.delete()
        logout(request)
        return Response({'message': 'Logout successfully'}, status=status.HTTP_200_OK)


class getUserView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, pk):
        try:
            account = accounts.objects.get(pk=pk)
        except account.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if request.method == 'GET':
            serializer = accountSerializer(account)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        return True


# @csrf_exempt
# def getFavourites(request: HttpRequest, pk):
#     try:
#         fav = favorites.objects.get(user=pk)
#     except fav.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         mura_serializer = favouritesSerializer(fav, many=True)
#         return JsonResponse(mura_serializer.data, status=status.HTTP_200_OK)

class getFavourites(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        try:
            fav = favorites.objects.all()
        except fav.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = favouritesSerializer(fav, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
        # fav = favorites.objects.select_related('good').get(id=pk)
        # if fav.DoesNotExist:
        #     return Response(status=status.HTTP_404_NOT_FOUND)
        # else:
        #     serializer = favouritesSerializer(fav)
        #     return Response(data=serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        return True
