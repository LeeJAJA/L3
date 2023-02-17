import ipdb
import json
from tqdm import tqdm
import random


height = -600

filenames = ["person_mobility"]

for filename in filenames:
    with open(f"{filename}.json", "rb") as f:
        load_json = json.load(f)


    # adjust height shift
    for i in tqdm(range(len(load_json))):
        # ipdb.set_trace()
        for j in range(len(load_json[i]["coords"])):
            load_json[i]["coords"][j][2] += height



    # with open("all_trips_fix.json", "w") as f:
    #     json.dump(load_json, f)

    with open(f"{filename}_fixed.json", "w") as f:
        json.dump(load_json, f)