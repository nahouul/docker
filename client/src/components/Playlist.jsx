import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./playlist.css";

export default function Playlist({ baseUrl, songs }) {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylist, setNewPlaylist] = useState({ name: "", description: "" });
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [playlistSongs, setPlaylistSongs] = useState([]);

    // Fetch playlists
    const fetchPlaylists = () => {
        Axios.get(`${baseUrl}/playlists`)
            .then((response) => setPlaylists(response.data))
            .catch((error) => console.error("Erreur lors de la récupération des playlists :", error));
    };

    // Fetch songs of a playlist
    const fetchPlaylistSongs = (playlistId) => {
        Axios.get(`${baseUrl}/playlists/${playlistId}/songs`)
            .then((response) => setPlaylistSongs(response.data))
            .catch((error) => console.error("Erreur lors de la récupération des sons de la playlist :", error));
    };

    // Create a new playlist
    const createPlaylist = () => {
        if (!newPlaylist.name.trim()) {
            alert("Le nom de la playlist est obligatoire.");
            return;
        }
        Axios.post(`${baseUrl}/playlists`, newPlaylist)
            .then(() => {
                setNewPlaylist({ name: "", description: "" });
                fetchPlaylists();
            })
            .catch((error) => console.error("Erreur lors de la création de la playlist :", error));
    };

    // Add a song to a playlist
    const addSongToPlaylist = (songId) => {
        if (!selectedPlaylist) {
            alert("Sélectionnez une playlist d'abord.");
            return;
        }
        Axios.post(`${baseUrl}/playlists/${selectedPlaylist}/songs`, { songId })
            .then(() => fetchPlaylistSongs(selectedPlaylist))
            .catch((error) => console.error("Erreur lors de l'ajout du son à la playlist :", error));
    };

    // Remove a song from a playlist
    const removeSongFromPlaylist = (songId) => {
        Axios.delete(`${baseUrl}/playlists/${selectedPlaylist}/songs/${songId}`)
            .then(() => fetchPlaylistSongs(selectedPlaylist))
            .catch((error) => console.error("Erreur lors de la suppression du son de la playlist :", error));
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return (
        <div className="playlist-container">
            <h2>Playlists</h2>
            <div className="create-playlist">
                <input
                    type="text"
                    placeholder="Nom de la playlist"
                    value={newPlaylist.name}
                    onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={newPlaylist.description}
                    onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                />
                <button onClick={createPlaylist}>Créer</button>
            </div>
            <div className="playlist-list">
                {playlists.map((playlist) => (
                    <div
                        className={`playlist-item ${selectedPlaylist === playlist.id ? "selected" : ""}`}
                        key={playlist.id}
                        onClick={() => {
                            setSelectedPlaylist(playlist.id);
                            fetchPlaylistSongs(playlist.id);
                        }}
                    >
                        <h4>{playlist.name}</h4>
                        <p>{playlist.description || "Pas de description"}</p>
                    </div>
                ))}
            </div>
            {selectedPlaylist && (
                <div className="playlist-songs">
                    <h3>Sons de la playlist</h3>
                    <ul>
                        {playlistSongs.map((song) => (
                            <li key={song.id}>
                                {song.title} - {song.artist}
                                <button onClick={() => removeSongFromPlaylist(song.id)}>Supprimer</button>
                            </li>
                        ))}
                    </ul>
                    <h4>Ajouter des sons :</h4>
                    <ul>
                        {songs.map((song) => (
                            <li key={song.id}>
                                {song.title} - {song.artist}
                                <button onClick={() => addSongToPlaylist(song.id)}>Ajouter</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
