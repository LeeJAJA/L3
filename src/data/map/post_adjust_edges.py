import ipdb
import json
from tqdm import tqdm
import random

# height = -3000

# with open("morph_edges_extended.json", "rb") as f:
#     load_json = json.load(f)


# # adjust height shift
# for i in tqdm(range(len(load_json["features"]))):
#     # ipdb.set_trace()
#     for j in range(len(load_json["features"][i]["geometry"]["coordinates"])):
#         load_json["features"][i]["geometry"]["coordinates"][j][2] += height

# with open("morph_edges_extended_fix.json", "w") as f:
#     json.dump(load_json, f)


height = -600

with open("l3_edges.json", "rb") as f:
    load_json = json.load(f)


# adjust height shift
for i in tqdm(range(len(load_json["features"]))):
    # ipdb.set_trace()
    for j in range(len(load_json["features"][i]["geometry"]["coordinates"])):
        load_json["features"][i]["geometry"]["coordinates"][j][2] += height

with open("l3_edges_fix.json", "w") as f:
    json.dump(load_json, f)
