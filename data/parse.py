# Sample data items

# {
#   "id": "0.4223686162964079",
#   "type": "nodeTitle",
#   "position": { "x": 1380, "y": 420 },
#   "data": {
#     "title": "Tokenizer",
#     "description": "",
#     "color": { "foreground": "secondary-content", "background": "base-100", "border": "error" },
#     "icon": "",
#     "content": "",
#     "status": "inProgress"
#   },
#   "origin": [0.5, 0],
#   "computed": { "positionAbsolute": { "x": 1380, "y": 420 }, "width": 177, "height": 68 },
#   "selected": false,
#   "dragging": false
# },

# {
#   "id": "0.22843460540858906",
#   "type": "nodeText",
#   "position": { "x": 240, "y": 780 },
#   "data": {
#     "text": "Multi-head latent attention",
#     "color": { "foreground": "base-content", "background": "base-100", "border": "secondary" }
#   },
#   "origin": [0.5, 0],
#   "computed": { "positionAbsolute": { "x": 240, "y": 780 }, "width": 226, "height": 44 },
#   "selected": false,
#   "dragging": false
# },

# {
#   "id": "0.7332071927522315",
#   "type": "nodeIcon",
#   "position": { "x": 960, "y": 20 },
#   "data": {
#     "text": "General training objective",
#     "icon": "",
#     "color": { "foreground": "base-300", "background": "base-100", "border": "primary" }
#   },
#   "origin": [0.5, 0],
#   "computed": { "positionAbsolute": { "x": 960, "y": 20 }, "width": 247, "height": 44 },
#   "selected": false,
#   "dragging": false
# },


import json
import csv

# Function to extract the data from JSON and write to CSV
def json_to_csv(file_path):
    # Read JSON data from a file
    with open(file_path, 'r') as json_file:
        json_data = json.load(json_file)
    
    # Open or create a CSV file for output
    with open('output.csv', 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        
        # Write the headers
        writer.writerow(['id', 'type', 'title-text', 'content', 'links', 'icon'])
        
        # Iterate over each node to extract the necessary data
        for node in json_data['nodes']:
            node_id = node['id']
            node_type = node['type']
            title_text = node['data'].get('title') or node['data'].get('text', '')  # Get title or text
            content = ''  # Empty as per instructions
            links = ''    # Empty as per instructions
            # icon = node['data'].get('icon', '')  # Get icon if available
            icon = ''
            
            # Write the data row
            writer.writerow([node_id, node_type, title_text, content, links, icon])

# Specify the path to your JSON file
file_path = 'sample.json'

# Call the function to process the JSON and write to CSV
json_to_csv(file_path)
