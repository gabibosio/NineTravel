from django.shortcuts import render
from .models import Reserva
from.serializer import ReservaSerializer
from rest_framework import viewsets

class ReservaViewSet(viewsets.ModelViewSet):
    queryset=Reserva.objects.all()
    serializer_class=ReservaSerializer
