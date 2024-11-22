from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse  # Use JsonResponse for standard Django views
import json  # To parse the request body
from app.models import Appointment  # Import the Appointment model

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Doctor

# Create your views here.
def home(req):
    return render(req, 'index.html')

# Create your views here.
def form(req):
    return render(req, 'form.html')


@csrf_exempt
def doctor_login(request):
    if request.method == "POST":
        try:
            # Parse JSON data f
            data = json.loads(request.body)

            # Get email and password from the request
            email = data.get('email')
            password = data.get('password')

            # Validate email and password fields
            if not email or not password:
                return JsonResponse({"success": False, "message": "Email and password are required."}, status=400)

            # Check if the doctor exists
            try:
                doctor = Doctor.objects.get(email=email)
            except Doctor.DoesNotExist:
                return JsonResponse({"success": False, "message": "Invalid email or password."}, status=401)

            # Verify the password
            if password==doctor.password:
                return JsonResponse({"success": True, "message": "Login successful.", "doctor_name": doctor.name})
            else:
                return JsonResponse({"success": False, "message": "Invalid email or password."}, status=401)
        
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Invalid JSON format."}, status=400)
    else:
        return JsonResponse({"success": False, "message": "Only POST method is allowed."}, status=405)


@csrf_exempt
def book(req):
    if req.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(req.body)
            print(data)  # Log the data for debugging
            
            # Extract required fields
            name = data.get('name')
            age = data.get('age')
            gender = data.get('gender')
            mobile = data.get('mobile')
            appointment_date = data.get('appointmentDate')
            
            # Validate required fields
            if not all([name, age, gender, mobile, appointment_date]):
                return JsonResponse({'error': 'All fields are required.'}, status=400)
            
            # Save to the database
            appointment = Appointment(
                name=name,
                age=age,
                gender=gender,
                mobile=mobile,
                date=appointment_date
            )
            appointment.save()
            
            # Return success response
            return JsonResponse({'success': 'Appointment booked successfully.'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
        except Exception as e:
            print(f"Error: {e}")  # Log unexpected errors
            return JsonResponse({'error': 'An error occurred while booking the appointment.'}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=405)
