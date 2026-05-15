import json
import requests

f = open('data-col.json')

bash_script = '# /bin/bash\n'

data = json.load(f)

for d in data:
    print(d)

    r = requests.get('https://api.archivo.comisiondelaverdad.co/api/collection/slug/' + d['slug'])

    data_ = json.loads(r.text)

    for d in data_["hits"]["hits"]:
        for c in d['_source']['cards']:
            for p in c['pieces']:
                # print(p["type"])
                if(p["type"] == 'recurso'):
                    for r in p['resource']['document']['records']:
                        if 'support' in r:
                            if r['support'] == 'Documento':
                                out = 'scp administrador@149.28.108.138:/mnt/blockstorage/files' + r['filename'].replace('/rep/files', '') + ' ../../public/files'
                            elif r['support'] == 'Audio':
                                out = 'scp administrador@149.28.108.138:/mnt/blockstorage/export_audio/' + r['idmongo'] + '.mp3 ../../public/files'
                            elif r['support'] == 'Video':
                                out = 'scp administrador@149.28.108.138:/mnt/blockstorage/export_video/' + r['idmongo'] + '.mp4 ../../public/files'
                            elif r['support'] == 'Galería fotográfica':
                                out = 'scp administrador@149.28.108.138:/mnt/blockstorage/resizes/' + r['idmongo'] + '_large.jpg ../../public/files'
                            elif r['support'] == 'Visualización':
                                out = 'scp administrador@149.28.108.138:/mnt/blockstorage/files' + r['filename'].replace('/rep/files', '') + ' ../../public/files'
                            else:
                                print(r['support'])
                            
                            bash_script += out + '\n'
                # if(p["type"] == 'video'):
                #     if 'records' in p:
                #         out = 'scp administrador@149.28.108.138:/mnt/blockstorage/export_video/' + p['records'][0]['idmongo'] + '.mp4 ../../public/files'
                #         bash_script += out + '\n'

                # if(p["type"] == 'audio'):
                #     if 'records' in p:
                #         out = 'scp administrador@149.28.108.138:/mnt/blockstorage/export_audio/' + p['records'][0]['idmongo'] + '.mp3 ../../public/files'
                #         bash_script += out + '\n'

    # # Serializing json
    # json_object = 'export default ' + json.dumps(data_["hits"]['hits'], indent=4)
 
# Writing to sample.json
with open('./export/copy_files.sh', "w") as outfile:
    outfile.write(bash_script)
