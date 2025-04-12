import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSongById, updateSong, deleteSong } from "../adapters/songAdapters";

const SongDetails = () => {
  const [song, setSong] = useState({});
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      const [foundSong, error] = await getSongById(id);
      setSong(foundSong);
    };
    doFetch();
  }, []);

  const handleDeleteSong = async () => {
    await deleteSong(id);
    navigate("/");
  };

  const handleUpdateSong = async (e) => {
    e.preventDefault();

    const [updatedSong, error] = await updateSong(
      id,
      newSongTitle,
      newSongArtist
    );

    setSong(updatedSong);
    setNewSongTitle("");
    setNewSongArtist("");
  };

  return (
    <>
      <Link to="/">Go Home</Link>
      <h1>Profile</h1>
      <p>Title: {song.title}</p>
      <p>Artist: {song.artist}</p>
      <p>Id: {song.id}</p>
      <form onSubmit={handleUpdateSong}>
        <label htmlFor="title">Update Song Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
          placeholder="New Title"
        />
        <label htmlFor="artist">Update Song Artist</label>
        <input
          type="text"
          name="artist"
          id="artist"
          value={newSongArtist}
          onChange={(e) => setNewSongArtist(e.target.value)}
          placeholder="New Artist"
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDeleteSong} className="danger">
        Delete Song
      </button>
    </>
  );
};

export default SongDetails;
