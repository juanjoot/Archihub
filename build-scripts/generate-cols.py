import json
import requests

f = open('data-col.json')

data = json.load(f)

for d in data:
    print(d)

    r = requests.get('https://api.archivo.comisiondelaverdad.co/api/collection/slug/' + d['slug'])

    data_ = json.loads(r.text)

    print(data_)

    # Serializing json
    json_object = 'export default ' + json.dumps(data_["hits"]['hits'], indent=4)
 
    # Writing to sample.json
    with open('./export/' + d['slug'] + ".js", "w") as outfile:
        outfile.write(json_object)
