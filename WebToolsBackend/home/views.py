from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
import json
from django.http import HttpResponse
from PIL import Image
from PIL.ExifTags import TAGS
import os.path
SITE_ROOT = os.path.dirname(os.path.dirname(__file__))
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
                response_data['url'] = request.META['HTTP_HOST']+ '/uploads' +  file_url
                imageLocation='uploads'+file_url
                image = Image.open(imageLocation)
                exifdata = image.getexif()
                metadataValue = ''
                MDDict={}
                for tag_id in exifdata:
                    # get the tag name, instead of human unreadable tag id
                    tag = TAGS.get(tag_id, tag_id)
                    data = exifdata.get(tag_id)
                    # decode bytes 
                    if isinstance(data, bytes):
                        try:
                            data = data.decode()
                        except Exception as e:
                            pass
                    # print(f"{tag}: {data}")
                    # metadataValue += f"{tag:25}: {data}" + '\n'
                    MDDict[tag]=str(data)
                response_data['status'] = 'success'
                response_data['data'] = MDDict
                return HttpResponse(json.dumps(response_data), content_type="application/json")
        else:
            response_data['status'] = 'failed'
            response_data['message'] = 'request methode must be POST'
            return HttpResponse(json.dumps(response_data), content_type="application/json")
    except Exception as e:
        response_data['status'] = 'failed'
        response_data['message'] = str(e)
        return HttpResponse(json.dumps(response_data), content_type="application/json")

@csrf_exempt
def removeMD(request):
    if request.method == 'POST':
        response_data = {}
        try:
            fileName=request.POST.get('fileName')
            fileName=fileName.rsplit('/', 1)[-1] #Splitting filename from complete url
            folder='uploads/'
            outputFolder='uploads/md_removed/'
            imageLocation=folder+fileName
            image = Image.open(imageLocation)
            data = list(image.getdata())
            image_without_exif = Image.new(image.mode,image.size)
            image_without_exif.putdata(data)
            image_without_exif.save(outputFolder+fileName)
            md_removed_img_url=request.META['HTTP_HOST']+ '/' + outputFolder +  fileName
            exifdata = image_without_exif.getexif()
            MDDict={}
            for tag_id in exifdata:
                # get the tag name, instead of human unreadable tag id
                tag = TAGS.get(tag_id, tag_id)
                data = exifdata.get(tag_id)
                # decode bytes 
                if isinstance(data, bytes):
                    try:
                        data = data.decode()
                    except Exception as e:
                        pass
                # print(f"{tag}: {data}")
                # metadataValue += f"{tag:25}: {data}" + '\n'
                MDDict[tag]=str(data)
            response_data["img_url"] = md_removed_img_url
            response_data["status"] = "success"
            response_data["data"] = MDDict
            return HttpResponse(json.dumps(response_data), content_type="applicaiton/json")
        except Exception as e:
            response_data["status"] = "failed"
            return HttpResponse(json.dump(response_data), content_type="applicaiton/json")
