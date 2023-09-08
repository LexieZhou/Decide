import json
import xml.etree.ElementTree as ET

input_file = 'Posts.xml'
output_file = 'PostsTitle.json'
data = []

for event, elem in ET.iterparse(input_file, events=('start', 'end')):
    if event == 'start' and elem.tag == 'row':
        # Get the 'Id' and 'Title' attributes
        row_id = elem.get('Id')
        parent_id = elem.get('ParentId')
        title = elem.get('Title')

        # Create a dictionary with the extracted information
        entry = {
            "id": row_id,
            "parentId": parent_id,
            "title": title
        }

        # Append the entry to the data list
        data.append(entry)

    # Clear the element from memory to release resources
    elem.clear()

# Write the data to the output JSON file
with open(output_file, 'w') as f:
    json.dump(data, f, indent=4)