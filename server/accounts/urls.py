from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('account/<int:pk>/', views.getUserView.as_view(), name='account'),
    path('favourites/',
         views.getFavourites.as_view(), name='favourites')
    # path('login/', views.loginView.as_view(), name='knox_login')
]
