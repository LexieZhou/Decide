import json
with open('/Users/zhouzihan/Desktop/visual_kg/src/data/new_records.json', encoding='utf-8-sig') as f:
    data = json.load(f)

nodes_data = []
# add node name and version information
for i in range(len(data['nodes'])):
    nodes_data.append({"name": data['nodes'][i]['name'] + ' ' + data['nodes'][i]['version']
                       })
# add label information
labels = ['api', 'database', 'hardware', 'library', 'operating_system', 'programming_language', 'software', 'tool']
for i in range(len(labels)):
    nodes_data.append({"name": labels[i]})      

search_data = {'nodes': nodes_data}

with open('/Users/zhouzihan/Desktop/visual_kg/data.json', 'w') as f:
    json.dump(search_data, f, indent=4)