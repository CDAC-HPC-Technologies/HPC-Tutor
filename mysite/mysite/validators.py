from django.core.exceptions import ValidationError
import re

class CustomPasswordValidator:
    
    RESTRICTED_CHARACTERS = r'[=\s;*!/|\'+\-%<>]'
    DICTIONARY_WORDS = {'password', '123456', 'qwerty', 'letmein'}

    def validate(self, password, user=None):
        # Check if the password length is at least 14 characters
        if re.search(self.RESTRICTED_CHARACTERS, password):
            raise ValidationError(
                'Password contains restricted characters (=, ;, *, !, /, |, \', +, %, <, >).',
                code='password_restricted_characters',
            )
        if any(word in password.lower() for word in self.DICTIONARY_WORDS):
            raise ValidationError(
                'Password contains common words or names.',
                code='password_common_word',
            )
        
        if len(password) < 14:
            raise ValidationError(
                'Password must be at least 14 characters long.',
                code='password_too_short',
            )
        # Check for at least one uppercase letter
        if not re.search(r'[A-Z]', password):
            raise ValidationError(
                'Password must contain at least one uppercase letter.',
                code='password_no_upper',
            )
        # Check for at least one lowercase letter
        if not re.search(r'[a-z]', password):
            raise ValidationError(
                'Password must contain at least one lowercase letter.',
                code='password_no_lower',
            )
        # Check for at least one digit
        if not re.search(r'\d', password):
            raise ValidationError(
                'Password must contain at least one digit.',
                code='password_no_digit',
            )
        # Check for at least one special character
        if not re.search(r'[@$!%*?&]', password):
            raise ValidationError(
                'Password must contain at least one special character (@, $, !, %, *, ?, &).',
                code='password_no_special',
            )
        # Optionally check for common passwords or patterns
        if re.search(r'(password|123456|qwerty|letmein)', password.lower()):
            raise ValidationError(
                'Password is too common.',
                code='password_too_common',
            )

    def get_help_text(self):
        return (
            'Your password must be at least 14 characters long, contain at least '
            'one uppercase letter, one lowercase letter, one digit, and one special '
            'character (@, $, !, %, *, ?, &). It must not contain restricted characters '
            '(=, ;, *, !, /, |, \', +, %, <, >) or common words.'
        )

