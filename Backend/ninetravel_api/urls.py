from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("reserva/",include("app_ninetravel.urls"))
]
