# from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    # TokenAuthentication
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    # Registration 
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('accounts/', include('accounts.urls')),
    path('articles/', include('articles.urls')),
    path('exchange/',include('exchange.urls')), # 환율 계산기
    path('products/', include('fin_api.urls'))

    # YOUR PATTERNS
    # path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # # Optional UI:
    # path('swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)