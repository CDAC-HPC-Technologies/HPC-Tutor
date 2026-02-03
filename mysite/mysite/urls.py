# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function, unicode_literals

from cms.sitemaps import CMSSitemap
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.static import serve
from django.conf.urls.static import static
from django.urls import path

from .views import course_page

admin.autodiscover()

# Custom error handlers
handler404 = 'mysite.views.error_404'
handler500 = 'mysite.views.error_500'
handler403 = 'mysite.views.error_403'


# -----------------------------
# NON-CMS URLs (NO i18n)
# -----------------------------
urlpatterns = [
    url(r'^sitemap\.xml$', sitemap,
        {'sitemaps': {'cmspages': CMSSitemap}}),

    # Markdown-based courses
    path("courses/<str:course>/", course_page),
]


# -----------------------------
# CMS URLs (WITH i18n)
# -----------------------------
urlpatterns += i18n_patterns(
    path('super_user/', admin.site.urls),
    path('', include('cms.urls')),
)


# -----------------------------
# Static / Media (DEV ONLY)
# -----------------------------
if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += [
        url(r'^media/(?P<path>.*)$', serve, {
            'document_root': settings.MEDIA_ROOT,
            'show_indexes': True
        }),
    ]

