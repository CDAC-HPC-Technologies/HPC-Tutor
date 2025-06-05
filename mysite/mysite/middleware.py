from django.core.exceptions import PermissionDenied
import uuid
from django.conf import settings
import logging
from django.utils.deprecation import MiddlewareMixin
import datetime
import re
from django.shortcuts import redirect
from django.http import HttpResponseForbidden

logger = logging.getLogger(__name__)


class DisableAutocompleteMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if 'text/html' in response['Content-Type']:
            # Regex to find form fields
            response.content = re.sub(
                r'(<input[^>]*?)\s*(/?>)',
                r'\1 autocomplete="off"\2',
                response.content.decode('utf-8'),
                flags=re.IGNORECASE
            )
        return response


class SessionTimeoutMiddleware(MiddlewareMixin):
    def process_request(self, request):
        current_time = datetime.datetime.now()
        current_time_str = current_time.isoformat()
        last_activity_str = request.session.get('last_activity')
        session_start_str = request.session.get('session_start')
        logger.debug(f"last_activity_str: {last_activity_str}")
        logger.debug(f"current time string: {current_time_str}")
        if not session_start_str:
            request.session['session_start'] = current_time_str

        if last_activity_str:
            last_activity = datetime.datetime.fromisoformat(last_activity_str)
            elapsed_time = (current_time - last_activity).total_seconds()
            logger.debug(f"Idle Time Out: {elapsed_time}")
            if elapsed_time > settings.IDLE_TIMEOUT:
                logger.debug(f"Idle Time: {elapsed_time}")
                request.session.flush()  # Clear the session
                return

        if session_start_str:
            session_start = datetime.datetime.fromisoformat(session_start_str)
            session_duration = (current_time - session_start).total_seconds()
            if session_duration > settings.ABSOLUTE_TIMEOUT:
                request.session.flush()  # Clear the session
                return

        request.session['last_activity'] = current_time_str

class ConcurrentSessionMiddleware(MiddlewareMixin):
    def __init__(self, get_response=None):
        self.get_response = get_response
        super().__init__(get_response)

    def __call__(self, request):
        ip_address = request.META.get('REMOTE_ADDR')
        session_token = request.session.get('session_token')

        if not session_token:
            # Generate a new session token if it doesn't exist
            session_token = str(uuid.uuid4())
            request.session['session_token'] = session_token

        if ip_address:
            active_sessions_key = f'active_sessions_{ip_address}'
            active_sessions = request.session.get(active_sessions_key, [])

            if session_token not in active_sessions:
                if len(active_sessions) >= settings.MAX_CONCURRENT_SESSIONS:
                    # Limit the number of active sessions
                    raise PermissionDenied("Too many active sessions.")
                # Add the new session token to active sessions
                active_sessions.append(session_token)
                request.session[active_sessions_key] = active_sessions
                request.session.modified = True

        response = self.get_response(request)

        # Cleanup active sessions on session expiry
        if ip_address:
            active_sessions = request.session.get(active_sessions_key, [])
            if session_token in active_sessions:
                # Check if the session is expired
                if not request.session.exists(request.session.session_key):
                    active_sessions.remove(session_token)
                    request.session[active_sessions_key] = active_sessions
                    request.session.modified = True

        return response

class DisableLoginMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path == '/login/':  # Adjust the path to your login URL
            return HttpResponseForbidden("Access to this page is restricted.")
            # Or you can redirect to another page
            # return redirect('some_other_view')

        response = self.get_response(request)
        return response


#class ConcurrentSessionMiddleware:
#    def __init__(self, get_response):
#        self.get_response = get_response
#
#    def __call__(self, request):
#        ip_address = request.META.get('REMOTE_ADDR')
#        session_token = request.session.get('session_token')
#        test = []
#        check = []
#        if not session_token:
#            # Generate a new session token if it doesn't exist
#            session_token = str(uuid.uuid4())
#            request.session['session_token'] = session_token
#            test.append(session_token)
#            logger.debug(f"request.session: {request.session}")
#        if ip_address:
#            active_sessions_key = f'active_sessions_{ip_address}'
#            check.append(active_sessions_key)
#            if 'active_sessions' not in request.session:
#                request.session['active_sessions'] = []
#
#            active_sessions = request.session['active_sessions']
#            logger.debug(f"active_sessions_key: {active_sessions_key}, active_sessions: {session_token}")
#            if session_token in test:
#                # If the session token is already in active sessions for this IP, deny access
#                raise PermissionDenied("Same session token already active for this IP.")
#
#            active_sessions.append(session_token)
#            request.session.modified = True  # Mark session as modified
#
#            if len(active_sessions) > settings.MAX_CONCURRENT_SESSIONS:
#                # Optionally, limit the number of active sessions
#                raise PermissionDenied("Too many active sessions.")
#        test.clear()
#        response = self.get_response(request)
#
#        if ip_address:
#            # Remove current session token from active sessions on session expiry or logout
#            active_sessions = request.session.get('active_sessions', [])
#            if session_token in test:
#                test.clear()
#                request.session.modified = True  # Mark session as modified
#
#        return response
#
