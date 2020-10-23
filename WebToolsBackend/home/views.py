from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def index(request):
	return render(request, "index.html") 

@csrf_exempt
def uploadImage(request):
	if request.method == 'POST':
		if 'file' in request.FILES:
			fileName=request.FILES['file'].name
			print(fileName)

	return render(request, "index.html") 
