import ipdb
import json
from tqdm import tqdm
import random


filenames = [
    "segments_goldilocks_fixed",
    "segments_high_pop_fixed",
    "segments_low_pop_fixed",
]

for filename in filenames:
    point_list = []

    with open(f"{filename}.json", "rb") as f:
        load_json = json.load(f)

    for i in tqdm(range(len(load_json))):
        # ipdb.set_trace()
        for j in range(len(load_json[i]["path"])):
            new_item = {
                "position": load_json[i]["path"][j],
                # "normal": [-1, 0, 0],
                # "color": [255, 255, 0],
            }
            point_list.append(new_item)

    with open(f"{filename}_snowpath.json", "w") as f:
        json.dump(point_list, f)

    break
