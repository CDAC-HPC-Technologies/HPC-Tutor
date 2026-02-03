from django.http import HttpResponseForbidden
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.core.mail import send_mail
from django.conf import settings
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


import os
import markdown
from django.conf import settings
from django.shortcuts import render

def course_page(request, course):
    md_file = os.path.join(settings.BASE_DIR, "courses", f"{course}.md")

    if not os.path.exists(md_file):
        return render(request, "404.html", status=404)

    with open(md_file, encoding="utf-8") as f:
        raw = f.read()

    # Remove front-matter
    if raw.startswith("---"):
        try:
            _, _, raw = raw.split("---", 2)
        except ValueError:
            pass

    html = markdown.markdown(
        raw,
        extensions=["fenced_code", "tables", "toc", "codehilite"]
    )

    return render(request, "course_page.html", {
        "content": html,
        "course": course,
    })

