const getId = require("../utils/getId");

const songs = [
  { title: "Warning", artist: "The Notorious BIG", id: getId() },
  { title: "This Time Around", artist: "Michael Jackson", id: getId() },
  { title: "Dreams", artist: "The Cranberries", id: getId() },
];

class Song {
  static create(title, artist) {
    const newSong = {
      title,
      artist,
      id: getId(),
    };
    songs.push(newSong);
    return newSong;
  }

  static list() {
    return [...songs];
  }

  static find(id) {
    return songs.find((song) => song.id === id);
  }

  static editSong(id, newTitle, newArtist) {
    const song = Song.find(id);
    if (!song) return null;
    song.title = newTitle;
    song.artist = newArtist;
    return song;
  }

  static delete(id) {
    const songIndex = songs.findIndex((song) => song.id === id);
    if (songIndex < 0) return false;

    songs.splice(songIndex, 1);
    return true;
  }
}

module.exports = Song;
