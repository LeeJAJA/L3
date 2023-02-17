import ipdb
import json
from tqdm import tqdm
import random

# height = -3000

# filenames = ["segments_goldilocks", "segments_high_pop", "segments_low_pop"]

height = -600

filenames = ["l3_segments"]

for filename in filenames:
    # with open("all_trips.json", "rb") as f:
    #     load_json = json.load(f)
        
    with open(f"{filename}.json", "rb") as f:
        load_json = json.load(f)


    # adjust height shift
    for i in tqdm(range(len(load_json))):
        # ipdb.set_trace()
        for j in range(len(load_json[i]["path"])):
            load_json[i]["path"][j][2] += height



    # with open("all_trips_fix.json", "w") as f:
    #     json.dump(load_json, f)

    with open(f"{filename}_fixed.json", "w") as f:
        json.dump(load_json, f)