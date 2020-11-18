from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
import json
from django.http import HttpResponse
# Create your views here.

def index(request):
	return render(request, "index.html") 

@csrf_exempt
def uploadImage(request):
	try:
		folder='uploads/'
		response_data = {}
		if request.method == 'POST':
			if 'file' in request.FILES:
				myfile = request.FILES['file']
				fs = FileSystemStorage(location=folder)
				receivedFileName = myfile.name.replace(" ", "_")
				print(receivedFileName)
				filename = fs.save(receivedFileName, myfile)
				file_url = fs.url(filename)
				response_data['message'] = 'success'
				response_data['url'] = file_url
				return HttpResponse(json.dumps(response_data), content_type="application/json")
		else:
			response_data['message'] = 'request methode must be POST'
			return HttpResponse(json.dumps(response_data), content_type="application/json")
	except Exception as e:
		response_data['message'] = str(e)
		return HttpResponse(json.dumps(response_data), content_type="application/json")
