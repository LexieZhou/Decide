# nodes and links data fetch, clean, reformat for force chart visualization

import json
from packaging.specifiers import SpecifierSet
from packaging.version import Version

with open('/Users/lexiezhou/Desktop/Visual_KnowledgeGraph/client/src/data/datav3/records3.json', encoding='utf-8-sig') as f:
    data = json.load(f)

with open('/Users/lexiezhou/Desktop/Visual_KnowledgeGraph/client/src/data/versionRange.json', encoding='utf-8-sig') as f:
    VERSION_RANGE = json.load(f)

with open('/Users/lexiezhou/Desktop/Visual_KnowledgeGraph/client/src/data/official_name.json', encoding='utf-8-sig') as f:
    OFFICIAL_NAME = json.load(f)

with open('/Users/lexiezhou/Desktop/Visual_KnowledgeGraph/client/src/data/datav3/nodes3.json', encoding='utf-8-sig') as f:
    NODES = json.load(f)
with open('/Users/lexiezhou/Desktop/Visual_KnowledgeGraph/client/src/data/datav3/links3.json', encoding='utf-8-sig') as f:
    LINKS = json.load(f)

# official_name = {
#     "wxpython": "wxPython",
#     "tensorflow": "TensorFlow",
#     "tfds": "TensorFlow Datasets",
#     "tensorboard": "TensorBoard",
#     "pytorch": "PyTorch",
#     "numpy": "NumPy",
#     "scipy": "SciPy",
#     "scikit-learn": "scikit-learn", 
#     "pandas": "pandas",
#     "keras": "Keras",
#     "flask": "Flask",
#     "tensorflow-transform": "TensorFlow Transform",
#     "zappa": "Zappa",
#     "subprocess": "subprocess",
#     "sqlalchemy": "SQLAlchemy",
#     "psycopg": "psycopg",
#     "flask-sqlalchemy": "Flask SQLAlchemy",
#     "airflow": "Airflow",
#     "fftw": "FFTW",
#     "tensorflow-core-platform": "TensorFlow Core Platform",
#     "cuda": "CUDA",
#     "cudnn": "cuDNN",
#     "python": "Python",
#     "ubuntu": "Ubuntu",
#     "windows": "Windows",
#     "macos": "macOS",
#     "centos": "CentOS",
#     "android": "Android",
#     "ios": "iOS",
#     "debian": "Debian",
#     "bazel": "Bazel",
#     "glibc": "glibc",
#     "jetpack": "JetPack",
#     "gcc": "GCC",
#     "gzip": "gzip",
#     "coremltools": "Core ML Tools",
#     "postgres": "PostgreSQL",
#     "mysql": "MySQL",
#     "blender": "Blender",
#     "emr": "Amazon EMR"
# }

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

def separate_post_id(post_string):
    pos_post_id_list = [x for x in post_string.split("_")]
    return pos_post_id_list

def calculate_pos_num(post_vote_string):
    if post_vote_string == "":
        return 0
    else:
        return len(post_vote_string.split("_"))

def idToName(id):
    for node in NODES:
        if node['id'] == id:
            return node['name'], node['version']
    return None

def version_check(name, version):
    if name not in VERSION_RANGE:
        return True
    if name in VERSION_RANGE:
        min_version = VERSION_RANGE[name]['min']
        max_version = VERSION_RANGE[name]['max']
        version_range = SpecifierSet(f'>={min_version}') & SpecifierSet(f'<={max_version}')
        if version[0] <'0' or version[0] > '9':
            version = version[1:]
        if len(version.split(".")) > 2:
            version = '.'.join(version.split(".")[:2])
        if Version(f'{version}')in version_range:
            return True
        else:
            return False

print(idToName(4426)[0], idToName(4426)[1])
print(version_check('emr', '8.6.1'))

nodes = []
links = []

for i in range(len(data)):
    if node_exist(data[i]['p']['start']['identity']) == False:
        name = data[i]['p']['start']['properties']['name']
        version = data[i]['p']['start']['properties']['version']
        if version_check(name, version) == False:
            continue
        if name in OFFICIAL_NAME:
            official_name = OFFICIAL_NAME[name]
        nodes.append({"id": data[i]['p']['start']['identity'],
                      "name": official_name,
                      "version": version,
                      "label": data[i]['p']['start']['labels'],
                      "links_num": 0,
                      "childrens": []
                      })

    if node_exist(data[i]['p']['end']['identity']) == False:
        name = data[i]['p']['end']['properties']['name']
        version = data[i]['p']['end']['properties']['version']
        if version_check(name, version) == False:
            continue
        if name in OFFICIAL_NAME:
            official_name = OFFICIAL_NAME[name]
        nodes.append({"id": data[i]['p']['end']['identity'],
                      "name": official_name,
                      "version": version,
                      "label": data[i]['p']['end']['labels'],
                      "links_num": 0,
                      "childrens": []
                      })

    if link_exist(data[i]['p']['segments'][0]['relationship']['identity']) == False:
        node1 = data[i]['p']['start']['identity']
        node2 = data[i]['p']['end']['identity']
        if version_check(idToName(node1)[0], idToName(node1)[1]) == False or version_check(idToName(node2)[0], idToName(node2)[1]) == False:
            continue
        links.append({"id": data[i]['p']['segments'][0]['relationship']['identity'],
                      "source": data[i]['p']['start']['identity'],
                      "target": data[i]['p']['end']['identity'],
                      "type": data[i]['p']['segments'][0]['relationship']['type'],
                    #   "properties": data[i]['p']['segments'][0]['relationship']['properties'],
                      "properties": {
                            "neg_vote": data[i]['p']['segments'][0]['relationship']['properties']['neg_vote'],
                            "pos_vote": data[i]['p']['segments'][0]['relationship']['properties']['pos_vote'],
                            "verdict": data[i]['p']['segments'][0]['relationship']['properties']['verdict'],
                            "pos_post_id": data[i]['p']['segments'][0]['relationship']['properties']['pos_post_id'],
                            "neg_post_id": data[i]['p']['segments'][0]['relationship']['properties']['neg_post_id']
                      }
        })
        add_links(data[i]['p']['start']['identity'], data[i]['p']['end']['identity'])
        add_links(data[i]['p']['end']['identity'], data[i]['p']['start']['identity'])

new_data = {
    'nodes': nodes,
    'links': links
}
print("nodes_num: ", len(nodes))
print("links_num: ", len(links))

# links_num_sum = 0
# for i in range(len(nodes)):
#     links_num_sum += nodes[i]['links_num']
# print("links_num_sum: ", links_num_sum)

# with open('/Users/lexiezhou/Desktop/Visual_KnowledgeGraph/client/src/data/new_records3.json', 'w') as f:
#     json.dump(new_data, f, indent=4)

# with open('/Users/lexiezhou/Desktop/Visual_KnowledgeGraph/client/src/data/nodes3.json', 'w') as f:
#     json.dump(nodes, f, indent=4)
# with open('/Users/lexiezhou/Desktop/Visual_KnowledgeGraph/client/src/data/links3.json', 'w') as f:
#     json.dump(links, f, indent=4)

with open('/Users/lexiezhou/Desktop/Visual_KnowledgeGraph/client/src/data/records3_withVersionControl.json', 'w') as f:
    json.dump(new_data, f, indent=4)
with open('/Users/lexiezhou/Desktop/Visual_KnowledgeGraph/client/src/data/nodes3_withVersionControl.json', 'w') as f:
    json.dump(nodes, f, indent=4)
with open('/Users/lexiezhou/Desktop/Visual_KnowledgeGraph/client/src/data/links3_withVersionControl.json', 'w') as f:
    json.dump(links, f, indent=4)