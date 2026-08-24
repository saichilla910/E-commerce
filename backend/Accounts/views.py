from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view



@api_view(['GET'])
def about(request):
    message = {
        "message": "Message from the Backend"
    }

    return Response(message)

# Create your views here.
def home(request):
    context={"message":" message from backend"}
    return render(request,'Home.html',context)