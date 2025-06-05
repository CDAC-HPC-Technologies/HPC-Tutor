from django.http import HttpResponseForbidden
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.core.mail import send_mail
#from django.contrib.auth import get_user_model, login
#from django.db import models
#from .models import Product
 
 
def home(request):
    return HttpResponse('Hello, World!')
 
 
def error_404(request, exception):
    print(hh)
    return render(request, 'mysite/error_404.html', status=404)
 
def error_500(request):
    return render(request, 'mysite/error_505.html', status=500)

def error_403(request, exception):
    print(hhdsdsdsds)
    return render(request, 'mysite/error_403.html', status=403)

def custom_admin_login(request):
    return HttpResponseForbidden("Access to this page is restricted.")

