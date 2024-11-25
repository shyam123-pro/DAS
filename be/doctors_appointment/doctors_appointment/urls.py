
from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("",views.home),
    path('api/doctor/login',views.doctor_login),
    path("api/appointment/book", views.book_appointment),
    path("api/appointments", views.get_appointments),
    path("api/doctor/<int:id>", views.get_doctor),
    
]
