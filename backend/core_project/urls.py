from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/chat/', views.chat_handler, name='chat_handler'),
]
