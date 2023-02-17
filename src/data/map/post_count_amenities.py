from enum import unique
import ipdb
import json
from tqdm import tqdm

amen = []

# with open('./morph_polys_extended.json', 'rb') as f:
#     load_json = json.load(f)

with open('./l3_polys.json', 'rb') as f:
    load_json = json.load(f)
   
for i in tqdm(range(len(load_json['features']))):
    if (not load_json['features'][i]['properties']['land_use'].split('_')[0] in amen):
        amen.append(load_json['features'][i]['properties']['land_use'].split('_')[0])
    
print(((amen)))