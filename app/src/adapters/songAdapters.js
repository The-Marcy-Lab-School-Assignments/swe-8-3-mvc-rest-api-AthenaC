import handleFetch from "./handleFetch";

export const getAllSongs = async () => {
  const [allSongs, error] = await handleFetch("/api/songs/");
  return [allSongs, error];
};

export const getSongById = async (id) => {
  const [song, error] = await handleFetch(`/api/songs/${id}`);
  return [song, error];
};

export const createSong = async (songTitle, songArtist) => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ songTitle, songArtist }),
  };

  const [newSong, error] = await handleFetch(`/api/songs/`, options);
  return [newSong, error];
};

export const deleteSong = async (id) => {
  const options = {
    method: "DELETE",
  };

  const [success, error] = await handleFetch(`/api/songs/${id}`, options);
  return [success, error];
};

export const updateSong = async (id, songTitle, songArtist) => {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songTitle, songArtist }),
  };

  const [updatedSong, error] = await handleFetch(`/api/songs/${id}`, options);
  return [updatedSong, error];
};
