import ipdb
import json
from tqdm import tqdm
import random


height = -600

filenames = ["agg_edge_traffic_with_time"]

for filename in filenames:
    with open(f"{filename}.json", "rb") as f:
        load_json = json.load(f)
        
        
    output = {}
    timestamp = 8 * 6 * 600
    path_list = []
    for path in load_json[str(timestamp)]['data']:
        path['from_coord'][2] += height
        path['to_coord'][2] += height
        
        path_item = {
            "path": [path['from_coord'], path['to_coord']],
            "count": path['count']
        }
        path_list.append(path_item)
    
    output[timestamp] = path_list
    
    # ipdb.set_trace()

    # # adjust height shift
    # for i in tqdm(range(len(load_json))):
        
    #     for j in range(len(load_json[i]["coords"])):
    #         load_json[i]["coords"][j][2] += height



    # with open("all_trips_fix.json", "w") as f:
    #     json.dump(load_json, f)

    with open(f"{filename}_fixed.json", "w") as f:
        json.dump(output, f)