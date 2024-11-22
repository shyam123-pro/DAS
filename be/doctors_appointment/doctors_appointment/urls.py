
from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home),
    path("form",views.form),
    path('dl',views.doctor_login),
    path("api/appointment/book", views.book),
    
]
