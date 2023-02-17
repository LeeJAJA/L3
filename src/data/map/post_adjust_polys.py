import ipdb
import json
from tqdm import tqdm
import random

# height = -3000

# with open("morph_polys_extended.json", "rb") as f:
#     load_json = json.load(f)


# # adjust height shift
# for i in tqdm(range(len(load_json["features"]))):
#     # ipdb.set_trace()
#     for j in range(len(load_json["features"][i]["geometry"]["coordinates"])):
#         for t in range(len(load_json["features"][i]["geometry"]["coordinates"][j])):
#             load_json["features"][i]["geometry"]["coordinates"][j][t][2] += height

# # amenities color
# amen_list = ['Mobility', 'Open Space', 'Circulation', 'Residential', 'Office', 'Retail', 'Infrastructure', 'Hospitality', 'Religious', 'Education', 'Health', 'Stairs', 'Elevator', 'Social']

# color_mapping = {}
# amen_data = []
# for index, amen in enumerate(amen_list):
#     color_mapping[amen] = index % 26 + 1
#     amen_data.append({"id": index % 26 + 1, "name": amen})

# print(color_mapping)

# for i in tqdm(range(len(load_json["features"]))):
#     load_json["features"][i]["properties"]["type"] = color_mapping[
#         load_json["features"][i]["properties"]["land_use"].split('_')[0]
#     ]


# with open("morph_polys_extended_fix.json", "w") as f:
#     json.dump(load_json, f)


# with open("../layer_types.json", "w") as f:
#     json.dump(amen_data, f)

height = -600

with open("l3_polys.json", "rb") as f:
    load_json = json.load(f)


# adjust height shift
for i in tqdm(range(len(load_json["features"]))):
    # ipdb.set_trace()
    for j in range(len(load_json["features"][i]["geometry"]["coordinates"])):
        for t in range(len(load_json["features"][i]["geometry"]["coordinates"][j])):
            load_json["features"][i]["geometry"]["coordinates"][j][t][2] += height

# amenities color
amen_list = ['Mobility', 'Circulation', 'Open Space', 'Hospitality', 'Education', 'Retail', 'Social', 'Theatre', 'Stairs', 'Elevator', 'Infrastructure', 'Religious', 'Residential', 'Office', 'University']

color_mapping = {}
amen_data = []
for index, amen in enumerate(amen_list):
    color_mapping[amen] = index % 26 + 1
    amen_data.append({"id": index % 26 + 1, "name": amen})

print(color_mapping)

for i in tqdm(range(len(load_json["features"]))):
    load_json["features"][i]["properties"]["type"] = color_mapping[
        load_json["features"][i]["properties"]["land_use"].split('_')[0]
    ]


with open("l3_polys_fix.json", "w") as f:
    json.dump(load_json, f)


with open("../l3_layer_types.json", "w") as f:
    json.dump(amen_data, f)
