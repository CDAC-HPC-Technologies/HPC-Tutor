from .utils.course_loader import load_courses
from django.conf import settings

def terminal_url(request):
    return {
        "TERMINAL_IFRAME_URL": settings.TERMINAL_IFRAME_URL
    }

def courses_context(request):
    return {
        "ALL_COURSES": load_courses()
    }
