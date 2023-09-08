import json

# Define the input and output file paths
post_ids_file = 'postIds.json'
post_titles_file = 'PostsTitle.json'
needed_post_titles_file = 'CorePosts.json'

# post_ids_file = 'postIds.json'
# post_titles_file = 'PostsTitle.json'
# parent_titles_file = 'Parents.json'
# title_mappings_file = 'titleMapping.json'

# Create a set to store the post IDs
post_ids_set = set()

# Load the post IDs into the set
with open(post_ids_file) as f:
    post_ids_data = json.load(f)
    post_ids_set = set(post_ids_data)

# Process the post titles and write the title mappings
with open(post_titles_file) as f_in, open(needed_post_titles_file, 'w') as f_out:
    f_out.write('[')
    post_title_data = json.load(f_in)
    first_item = True

    for item in post_title_data:
        post_id = item['id']
        if post_id in post_ids_set:
            title = item['title']
            if not first_item:
                f_out.write(',\n')
            else:
                first_item = False
        
            json.dump(item, f_out)
    f_out.write(']')