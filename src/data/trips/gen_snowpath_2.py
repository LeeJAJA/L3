import ipdb
import json
from tqdm import tqdm
import random


# filenames = [
#     "segments_goldilocks_fixed",
#     "segments_high_pop_fixed",
#     "segments_low_pop_fixed",
# ]

filenames = [
    "l3_segments_fixed",
    ]

counter_max = 0

def minmax_norm(value):
    min_v = 1
    max_v = counter_max
    range_min = 1
    range_max = 10
    return (value-min_v) / (max_v - min_v) * (range_max - range_min) + range_min
    

for filename in filenames:
    counter = {(i*600):{} for i in range(24*6)}
    edge_set = {(i*600):[] for i in range(24*6)}

    with open(f"{filename}.json", "rb") as f:
        load_json = json.load(f)

    for i in tqdm(range(len(load_json))):
        # ipdb.set_trace()
        for j in range(len(load_json[i]["path"]) - 1):
            timestamp = load_json[i]["timestamps"][j] // 600 * 600
            
            o_list = load_json[i]["path"][j]
            d_list = load_json[i]["path"][j + 1]
            o = "_".join(str(e) for e in o_list)
            d = "_".join(str(e) for e in d_list)
            
            # ipdb.set_trace()
            if (not (o,d) in edge_set[timestamp]) and (not (d,o) in edge_set[timestamp]):
                edge_set[timestamp].append((o,d))
                
            if not o in counter[timestamp].keys():
                counter[timestamp][o] = {}
            if not d in counter[timestamp].keys():
                counter[timestamp][d] = {}
            if not o in counter[timestamp][d].keys():
                counter[timestamp][d][o] = 0
            if not d in counter[timestamp][o].keys():
                counter[timestamp][o][d] = 0
                
            counter[timestamp][o][d] += 1
            counter[timestamp][d][o] += 1
            if (counter[timestamp][o][d]> counter_max):
                counter_max = counter[timestamp][o][d]
            if (counter[timestamp][d][o]> counter_max):
                counter_max = counter[timestamp][d][o]

    # with open("../map/morph_edges_extended_fix.json", "rb") as f:
    #     edge_json = json.load(f)

    output = {}
    for t in tqdm(range(24*6)):
        timestamp = t * 600
        path_list = []
        for i in range(len(edge_set[timestamp])):
            o, d = edge_set[timestamp][i]
            path_item = {
                "path": [o.split("_"), d.split("_")],
                "count": minmax_norm(counter[timestamp][o][d])
            }
            path_list.append(path_item)
            output[timestamp] = path_list
            # print(path_list)
            # input()
        
    with open(f"{filename}_snowpath_2.json", "w") as f:
        json.dump(output, f)

    # break
