import json

# Load the JSON data from file
with open('./datav4/links4.json') as f:
    data = json.load(f)

# Initialize lists to store pos_post_id and neg_post_id values
post_ids = []

# Iterate over each item in the data
for item in data:
    # Get the pos_post_id and neg_post_id values from the properties dictionary
    pos_post_id = item['properties'].get('pos_post_id')
    neg_post_id = item['properties'].get('neg_post_id')

    # Append the values to the respective lists
    if pos_post_id != "":
        post_ids.extend(pos_post_id.split('_'))
    if neg_post_id != "":
        post_ids.extend(neg_post_id.split('_'))


unique_post_ids = list(set(post_ids))
post_ids_sorted = sorted(unique_post_ids)
print(len(unique_post_ids))

with open('postIds.json', 'w') as f:
    json.dump(post_ids_sorted, f, indent=4)