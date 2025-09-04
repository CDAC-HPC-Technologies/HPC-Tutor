from django.conf import settings

def terminal_url(request):
    return {
        'TERMINAL_IFRAME_URL': getattr(settings, 'TERMINAL_IFRAME_URL', '#')
    }
