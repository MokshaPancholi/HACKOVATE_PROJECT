from django.contrib import admin
from django.urls import path
from app.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', ReactAppView.as_view(), name='react_app'),
    path('api/chat/', chat_handler, name='chat_handler'),
    path('api/financial-profile/', financial_profile_api, name='financial_profile_api'),
    path('api/register/', register_api, name='register_api'),
]
