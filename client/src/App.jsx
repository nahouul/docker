import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/card";
import Playlist from "./components/Playlist";

function App() {
    const baseUrl = "http://localhost:3001";

    const [values, setValues] = useState({
        title: "",
        artist: "",
        album: "",
        genre: "",
        duration: ""
    });
    const [songs, setSongs] = useState([]);

    // Handle form changes for adding songs
    const handleChangeValues = (event) => {
        const { name, value } = event.target;
        setValues((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    // Add a new song
    const handleClickButton = () => {
        Axios.post(`${baseUrl}/register`, {
            title: values.title,
            artist: values.artist,
            album: values.album,
            genre: values.genre,
            duration: parseInt(values.duration),
        })
            .then(() => {
                fetchSongs();
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout de la chanson :", error);
            });
    };

    // Fetch all songs
    const fetchSongs = () => {
        Axios.get(`${baseUrl}/songs`)
            .then((response) => {
                setSongs(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des chansons :", error);
            });
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    return (
        <div className="App">
            <div className="container">
                <h1 className="title">Music App</h1>
                <h3>Ajouter une Chanson</h3>
                <div className="register-box">
                    <input
                        className="register-input"
                        type="text"
                        name="title"
                        placeholder="Titre"
                        onChange={handleChangeValues}
                    />
                    <input
                        className="register-input"
                        type="text"
                        name="artist"
                        placeholder="Artiste"
                        onChange={handleChangeValues}
                    />
                    <input
                        className="register-input"
                        type="text"
                        name="album"
                        placeholder="Album"
                        onChange={handleChangeValues}
                    />
                    <input
                        className="register-input"
                        type="text"
                        name="genre"
                        placeholder="Genre"
                        onChange={handleChangeValues}
                    />
                    <input
                        className="register-input"
                        type="number"
                        name="duration"
                        placeholder="Durée (secondes)"
                        onChange={handleChangeValues}
                    />
                    <button className="register-button" onClick={handleClickButton}>
                        Ajouter
                    </button>
                </div>
                <br />
                <div className="cards">
                    {songs.length > 0 &&
                        songs.map((song) => (
                            <Card
                                key={song.id}
                                id={song.id}
                                title={song.title}
                                artist={song.artist}
                                album={song.album}
                                genre={song.genre}
                                duration={song.duration}
                                refreshSongs={fetchSongs}
                            />
                        ))}
                </div>
                <hr />
                {/* Integration of Playlist Component */}
                <Playlist baseUrl={baseUrl} songs={songs} />
            </div>
        </div>
    );
}

export default App;
