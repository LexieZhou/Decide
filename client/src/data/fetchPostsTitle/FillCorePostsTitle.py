import json

core_posts_file = 'CorePosts.json'
parents_title_file = 'ParentsTitle.json'
core_posts_title_file = 'CorePostsTitle.json'
# core_posts_file = 'test_subPostsTitle.json'
# parents_title_file = 'ParentsTitle.json'
# core_posts_title_file = 'test_CorePostsTitle.json'


def matchTitle(parentId):
    for item in parents_title_data:
        if item['id'] == parentId:
            return item['title']
    return None

with open(parents_title_file) as f:
    parents_title_data = json.load(f)

with open(core_posts_file,'r') as f_in, open(core_posts_title_file, 'w') as f_out:
    core_posts_data = json.load(f_in)
    f_out.write('[')
    first_item = True

    for item in core_posts_data:
        parent_title = matchTitle(item['parentId'])
        if not first_item:
            f_out.write(',\n')
        else:
            first_item = False
        json.dump({"id": item['id'], "match_title": parent_title}, f_out)
    f_out.write(']')