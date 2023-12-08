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
    
    def retrieve(self, request, *args, **kwargs):
        device_id = kwargs.get('pk')
        instance = DeviceData.objects.filter(device_id=device_id)
        result = [self.get_serializer(i).data for i in instance]
        return Response(result)
    
