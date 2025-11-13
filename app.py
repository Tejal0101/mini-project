from flask import Flask, request, jsonify
from flask_cors import CORS
from recommend import get_playlist

app = Flask(__name__)
CORS(app)  # allow React to talk to Flask

@app.route('/')
def home():
    return jsonify({"message": "Mood Music Backend Running"})

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    mood = data.get('mood', 'happy')
    playlist = get_playlist(mood)
    return jsonify({"mood": mood, "songs": playlist})

if __name__ == '__main__':
    app.run(debug=True)
