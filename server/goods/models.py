from django.db import models
# Create your models here.


class Goods(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.CharField(max_length=15)
    image = models.CharField(max_length=500)
    rating = models.IntegerField()
    category = models.CharField(max_length=5)
    link = models.CharField(max_length=500)
    shopName = models.CharField(max_length=50)
    lat = models.DecimalField(decimal_places=14, max_digits=18)
    lng = models.DecimalField(decimal_places=14, max_digits=18)

    def __str__(self):
        return self.name
