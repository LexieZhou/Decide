import json

input_file = 'PostsTitle.json'
output_file = 'ParentsTitle.json'

# Open both the source and destination files
with open(input_file, 'r') as f:
    data = json.load(f)

new_data = []
for item in data:
    if item['parentId'] is not None and item['parentId'] != "null":
        continue
    else:
        new_data.append(item)

with open(output_file, 'w') as f:
    json.dump(new_data, f, indent=4)
