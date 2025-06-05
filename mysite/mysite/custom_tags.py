# yourapp/templatetags/custom_tags.py

from django import template
from django.urls import reverse
from cms.models import Page

register = template.Library()

@register.simple_tag
def page_url_by_title(title):
    try:
        page = Page.objects.get(title_set__title=title)
        return reverse('pages-details-by-slug', kwargs={'slug': page.get_slug})
    except Page.DoesNotExist:
        return '#'


