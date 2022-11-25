from django.contrib import admin

# Register your models here.
from .models import accounts, favorites

admin.site.register(accounts)
admin.site.register(favorites)
