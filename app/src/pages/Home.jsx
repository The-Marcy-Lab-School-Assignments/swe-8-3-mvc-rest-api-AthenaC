import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSongs, createSong } from "../adapters/songAdapters";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [newlyAddedSong, setNewlyAddedSong] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      const [allSongs, error] = await getAllSongs();
      setSongs(allSongs);
    };
    doFetch();
  }, [newlyAddedSong]);

  const handleCreateSong = async (e) => {
    e.preventDefault();
    const [newSong, error] = await createSong(newSongTitle, newSongArtist);
    setNewlyAddedSong(newSong);
    setNewSongTitle("");
    setNewSongArtist("");
  };

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={handleCreateSong}>
        <label htmlFor="song">Add a new Song</label>
        <input
          type="text"
          name="title"
          id="title"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
          placeholder="Song Title"
        />
        <input
          type="text"
          name="artist"
          id="artist"
          value={newSongArtist}
          onChange={(e) => setNewSongArtist(e.target.value)}
          placeholder="Song Artist"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {songs.map((song) => {
          return (
            <li key={song.id}>
              <Link to={`/fellows/${song.id}`}>
                {song.name} (User {song.id})
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
