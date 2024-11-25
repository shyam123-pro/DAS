from django.contrib import admin
from app.models import Appointment, Doctor

# Register the Appointment model (no custom admin needed)
admin.site.register(Appointment)

# Define a custom admin for the Doctor model
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'speciality', 'email']


# Register the Doctor model with the custom admin class
admin.site.register(Doctor, DoctorAdmin)
