from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse  # Use JsonResponse for standard Django views
import json  # To parse the request body
from app.models import Appointment  # Import the Appointment model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from .models import Doctor
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from app.serializers import AppointmentSerializer,DoctorSerializer
from .models import Doctor

# Create your views here.
def home(req):
    return render(req, 'index.html')

@csrf_exempt
def doctor_login(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Validate credentials
            doctor = Doctor.objects.filter(email=email, password=password).first()

            if doctor:
                # Success response
                return JsonResponse({
                    "success": True,
                    "message": "Login successful",
                    "doctor": {
                        "id": doctor.id,
                        "name": doctor.name,
                        "mobile": doctor.mobile,
                        "speciality": doctor.speciality,
                        "email": doctor.email
                    }
                }, status=200)
            else:
                # Invalid credentials response
                return JsonResponse({
                    "success": False,
                    "message": "Invalid email or password"
                }, status=401)
        except Exception as e:
            # Error handling
            return JsonResponse({
                "success": False,
                "message": f"An error occurred: {str(e)}"
            }, status=500)
    else:
        # Method not allowed response
        return JsonResponse({
            "success": False,
            "message": "Only POST method is allowed"
        }, status=405)

@csrf_exempt
def book_appointment(req):
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


def get_appointments(req):
    if(req.method=="GET"):
        appointments=Appointment.objects.all()
        s_a=AppointmentSerializer(appointments,many=True)
        print(appointments)
        return JsonResponse({"success":s_a.data},status=200)
    else:
        return JsonResponse({"error":"Get Method required"},status=400)
    

def get_doctor(request, id):
    if request.method == "GET":
        try:
            doctor = Doctor.objects.get(id=id)
            serialized_doctor = DoctorSerializer(doctor)
            return JsonResponse(serialized_doctor.data, safe=False)
        except Doctor.DoesNotExist:
            return JsonResponse({"error": "Doctor not found"}, status=404)
    else:
        return JsonResponse({"error": "Only GET method is allowed"}, status=405)
