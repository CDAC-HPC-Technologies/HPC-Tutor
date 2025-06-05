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

admin.autodiscover()


# Custom 404 error view
handler404 = 'mysite.views.error_404'
# Custom 500 error view
handler500 = 'mysite.views.error_500'
handler403 = 'mysite.views.error_403'

urlpatterns = [
    url(r'^sitemap\.xml$', sitemap,
        {'sitemaps': {'cmspages': CMSSitemap}}),
    url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
]

urlpatterns = i18n_patterns(
    #path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'),
    path('super_user/', admin.site.urls),
    #path('admin/login/', custom_admin_login),
   # path('filer/', include('filer.urls')),
    path('', include('cms.urls')),
    #path('accounts/', include('accounts.urls'))
)



#urlpatterns += i18n_patterns(
#    url(r'^admin/', admin.site.urls),  # NOQA
#    url(r'^', include('cms.urls')),
#)

# This is only needed when using runserver.
if settings.DEBUG:
    urlpatterns = [
        url(r'^media/(?P<path>.*)$', serve,
            {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
        ] + staticfiles_urlpatterns() + urlpatterns
