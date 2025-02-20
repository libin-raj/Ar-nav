from flask import Flask, request, jsonify
import networkx as nx
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Load Navigation Graph (Replace with actual data)
nav_graph = nx.Graph()
nav_graph.add_edges_from([
    ("LAB", "VERANDAH", {"weight": 1}),
    ("VERANDAH", "LIBRARY", {"weight": 1}),
])

@app.route('/shortest_path', methods=['GET'])
def get_shortest_path():
    start = request.args.get('start')
    end = request.args.get('end')

    if start not in nav_graph or end not in nav_graph:
        return jsonify({"error": "Invalid room name"}), 400

    path = nx.shortest_path(nav_graph, source=start, target=end, weight="weight")
    return jsonify(path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
