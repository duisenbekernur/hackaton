from django.urls import path
from . import views

urlpatterns = [
    path('goods', views.GoodsView.as_view(), name='goods'),
    path('good/<int:pk>/', views.GoodView.as_view(), name='good')
    # path('login/', views.loginView.as_view(), name='knox_login')
]
