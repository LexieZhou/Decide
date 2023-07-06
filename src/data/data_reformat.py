import json

with open('/Users/zhouzihan/Desktop/visual_kg/src/data/records.json', encoding='utf-8-sig') as f:
    data = json.load(f)


def node_exist(node_id):
    for node in nodes:
        if node['id'] == node_id:
            return True
    return False


def link_exist(link_id):
    for link in links:
        if link['id'] == link_id:
            return True
    return False


def getVersion(property_arr):
    if "version" in property_arr:
        return property_arr["version"]
    else:
        return None


def add_links(node_id, children_id):
    for node in nodes:
        if node['id'] == node_id:
            node['links_num'] += 1
            node["childrens"].append(children_id)
            return


nodes = []
links = []

for i in range(len(data)):
    if node_exist(data[i]['p']['start']['identity']) == False:
        nodes.append({"id": data[i]['p']['start']['identity'],
                      "name": data[i]['p']['start']['properties']['name'],
                      "version": getVersion(data[i]['p']['start']['properties']),
                      "label": data[i]['p']['start']['labels'],
                      "links_num": 0,
                      "childrens": []
                      })

    if node_exist(data[i]['p']['end']['identity']) == False:
        nodes.append({"id": data[i]['p']['end']['identity'],
                      "name": data[i]['p']['end']['properties']['name'],
                      "version": getVersion(data[i]['p']['end']['properties']),
                      "label": data[i]['p']['end']['labels'],
                      "links_num": 0,
                      "childrens": []
                      })

    if link_exist(data[i]['p']['segments'][0]['relationship']['identity']) == False:
        links.append({"id": data[i]['p']['segments'][0]['relationship']['identity'],
                      "source": data[i]['p']['start']['identity'],
                      "target": data[i]['p']['end']['identity'],
                      "type": data[i]['p']['segments'][0]['relationship']['type'],
                      "properties": data[i]['p']['segments'][0]['relationship']['properties']
                      })
        add_links(data[i]['p']['start']['identity'], data[i]['p']['end']['identity'])
        add_links(data[i]['p']['end']['identity'], data[i]['p']['start']['identity'])

new_data = {
    'nodes': nodes,
    'links': links
}
# print("nodes_num: ", len(nodes))
# print("links_num: ", len(links))

# links_num_sum = 0
# for i in range(len(nodes)):
#     links_num_sum += nodes[i]['links_num']
# print("links_num_sum: ", links_num_sum)

with open('/Users/zhouzihan/Desktop/visual_kg/src/data/new_records.json', 'w') as f:
    json.dump(new_data, f, indent=4)
