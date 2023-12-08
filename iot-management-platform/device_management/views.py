from rest_framework.permissions import IsAuthenticated

from IotManagementPlatform.permissions import DeviceActionPermission, DeviceDataActionPermission
from . models import Device, DeviceData
from .serializers import DeviceSerializer, DeviceDataSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status


class DeviceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, DeviceActionPermission]
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

    
class DeviceDataViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, DeviceDataActionPermission]

    queryset = DeviceData.objects.all()
    serializer_class = DeviceDataSerializer
    
