from django.db import models
from goods.models import Goods
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, name, lastname, email, phone, password=None):
        if not email:
            raise ValueError("Email is required")

        user = self.model(
            name=name,
            lastname=lastname,
            email=self.normalize_email(email),
            phone=phone
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, lastname, email, phone, password=None):
        email = self.normalize_email(email)
        user = self.create_user(
            name=name,
            lastname=lastname,
            email=email,
            phone=phone,
            password=password
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class accounts(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(verbose_name='First name', max_length=50)
    lastname = models.CharField(verbose_name='Last name', max_length=50)
    email = models.EmailField(verbose_name='Email',
                              max_length=100, unique=True)
    phone = models.CharField(verbose_name='Phone number', max_length=11)
    password = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['name', 'lastname', 'phone']

    objects = UserManager()

    def __str__(self):
        return str(self.id)


class favorites(models.Model):
    user = models.ForeignKey(accounts, on_delete=models.CASCADE)
    good = models.ForeignKey(Goods, on_delete=models.CASCADE)

    def __str__(self):
        return (str(self.user)+' - ' + str(self.good))
