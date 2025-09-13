from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    google_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    profile_picture = models.URLField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.username

class Document(models.Model):
    uploader = models.ForeignKey(User, on_delete=models.CASCADE)
    filename = models.CharField(max_length=255)
    filepath = models.CharField(max_length=512)
    upload_date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    summary = models.TextField(blank=True, null=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    ROLE_CHOICES = [('HR', 'HR'), ('Finance', 'Finance'), ('Admin', 'Admin')]
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)