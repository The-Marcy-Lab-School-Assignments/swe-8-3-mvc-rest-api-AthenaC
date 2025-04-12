const Song = require("../model/Song");

// Get All (Read)
const serveSongs = (req, res) => {
  const songsList = Song.list();
  res.send(songsList);
};

// Get One (Read)
const serveSong = (req, res) => {
  const { id } = req.params;
  const song = Song.find(Number(id));

  if (!song) {
    return res.status(404).send({
      message: `No song with the id ${id}`,
    });
  }

  res.send(song);
};

// Create
const createSong = (req, res) => {
  const { songTitle, songArtist } = req.body;

  if (!songTitle) {
    return res.status(400).send({ message: "Invalid Title" });
  }

  if (!songArtist) {
    return res.status(400).send({ message: "Invalid Artist" });
  }

  const newSong = Song.create(songTitle, songArtist);
  res.send(newSong);
};

// Update
const updateSong = (req, res) => {
  const { songTitle, songArtist } = req.body;

  if (!songTitle) {
    return res.status(400).send({ message: "Invalid Title" });
  }

  if (!songArtist) {
    return res.status(400).send({ message: "Invalid Artist" });
  }

  const { id } = req.params;
  const updatedSong = Song.editSong(Number(id), songTitle, songArtist);

  if (!songTitle || !songArtist) {
    return res.status(404).send({
      message: `No song with the id ${id}`,
    });
  }

  res.send(updatedSong);
};

// Delete
const deleteSong = (req, res) => {
  const { id } = req.params;
  const didDelete = Song.delete(Number(id));

  if (!didDelete) {
    return res.status(404).send({
      message: `No song with the id ${id}`,
    });
  }

  res.sendStatus(204);
};

module.exports = {
  serveSongs,
  serveSong,
  createSong,
  updateSong,
  deleteSong,
};
