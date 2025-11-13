# recommend.py

def get_playlist(mood):
    mood = mood.lower()
    playlists = {
        "happy": [
            {"title": "Sunshine Groove", "artist": "DJ Smile", "url": "https://example.com/happy1.mp3"},
            {"title": "Good Mood", "artist": "Bright Beats", "url": "https://example.com/happy2.mp3"},
        ],
        "calm": [
            {"title": "Ocean Waves", "artist": "Serenity Sounds", "url": "https://example.com/calm1.mp3"},
            {"title": "Peaceful Flow", "artist": "Lo-Fi Mind", "url": "https://example.com/calm2.mp3"},
        ],
        "energetic": [
            {"title": "Power Run", "artist": "Beast Mode", "url": "https://example.com/energy1.mp3"},
            {"title": "Upbeat Rush", "artist": "DJ Pulse", "url": "https://example.com/energy2.mp3"},
        ],
        "romantic": [
            {"title": "Starry Eyes", "artist": "HeartStrings", "url": "https://example.com/love1.mp3"},
            {"title": "Moonlight Kiss", "artist": "Soul Notes", "url": "https://example.com/love2.mp3"},
        ],
        "sad": [
            {"title": "Rainy Thoughts", "artist": "MellowMind", "url": "https://example.com/sad1.mp3"},
            {"title": "Lost Stars", "artist": "DreamEcho", "url": "https://example.com/sad2.mp3"},
        ],
    }
    return playlists.get(mood, playlists["happy"])
