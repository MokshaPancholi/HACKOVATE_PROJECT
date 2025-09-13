from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ["username", "email", "google_id", "profile_picture"]
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('google_id', 'profile_picture')}),
    )

