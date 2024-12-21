const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "database",
    user: "root",
    password: "root",
    database: "music_app",
    ssl: {
        rejectUnauthorized: false, 
    },
});

server.use(express.json());
server.use(cors());

// Route pour ajouter une chanson
server.post("/register", (req, res) => {
    const { title, artist, album, genre, duration} = req.body;

    let sql = "INSERT INTO songs (title, artist, album, genre, duration) VALUES (?,?,?,?,?)";
    db.query(sql, [title, artist, album, genre, duration], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: "Erreur lors de l'ajout de la chanson" });
        } else {
            res.send(result);
        }
    });
});

server.get("/songs", (req, res) => {
    let sql = "SELECT * FROM songs";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: "Erreur lors de la récupération des chansons" });
        } else {
            res.send(result);
        }
    });
});

// Route pour éditer une chanson
server.put("/edit", (req, res) => {
    const { id, title, artist, album, genre, duration} = req.body;
    const sql = "UPDATE songs SET title = ?, artist = ?, album = ?, genre = ?, duration = ? WHERE id = ?";
    db.query(sql, [title, artist, album, genre, duration, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Erreur lors de la mise à jour de la chanson" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Chanson non trouvée" });
        }
        res.send({ message: "Chanson mise à jour avec succès" });
    });
});


server.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM songs WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Erreur lors de la suppression de la chanson" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Chanson non trouvée" });
        }
        res.send({ message: "Chanson supprimée avec succès" });
    });
});

// Créer une playlist
server.post("/playlists", (req, res) => {
    const { name, description } = req.body;
    const sql = "INSERT INTO playlists (name, description) VALUES (?, ?)";
    db.query(sql, [name, description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Erreur lors de la création de la playlist" });
        } else {
            res.send({ message: "Playlist créée avec succès", id: result.insertId });
        }
    });
});

// Récupérer toutes les playlists
server.get("/playlists", (req, res) => {
    const sql = "SELECT * FROM playlists";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Erreur lors de la récupération des playlists" });
        } else {
            res.send(result);
        }
    });
});

// Modifier une playlist
server.put("/playlists/:id", (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const sql = "UPDATE playlists SET name = ?, description = ? WHERE id = ?";
    db.query(sql, [name, description, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Erreur lors de la modification de la playlist" });
        } else {
            res.send({ message: "Playlist modifiée avec succès" });
        }
    });
});

// Supprimer une playlist
server.delete("/playlists/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM playlists WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Erreur lors de la suppression de la playlist" });
        } else {
            res.send({ message: "Playlist supprimée avec succès" });
        }
    });
});

// Ajouter une chanson à une playlist
server.post("/playlists/:playlistId/songs/:songId", (req, res) => {
    const { playlistId, songId } = req.params;
    const sql = "INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)";
    db.query(sql, [playlistId, songId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Erreur lors de l'ajout de la chanson à la playlist" });
        } else {
            res.send({ message: "Chanson ajoutée à la playlist avec succès" });
        }
    });
});

// Supprimer une chanson d'une playlist
server.delete("/playlists/:playlistId/songs/:songId", (req, res) => {
    const { playlistId, songId } = req.params;
    const sql = "DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?";
    db.query(sql, [playlistId, songId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Erreur lors de la suppression de la chanson de la playlist" });
        } else {
            res.send({ message: "Chanson supprimée de la playlist avec succès" });
        }
    });
});

// Récupérer les chansons d'une playlist
server.get("/playlists/:id/songs", (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT songs.* 
        FROM songs 
        INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id 
        WHERE playlist_songs.playlist_id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Erreur lors de la récupération des chansons de la playlist" });
        } else {
            res.send(result);
        }
    });
});

server.post("/playlists/:playlistId/songs", (req, res) => {
    const { playlistId } = req.params;
    const { songId } = req.body;

    const sql = "INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)";
    db.query(sql, [playlistId, songId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Erreur lors de l'ajout du son à la playlist" });
        } else {
            res.send({ message: "Son ajouté à la playlist avec succès" });
        }
    });
});

server.delete("/playlists/:playlistId/songs/:songId", (req, res) => {
    const { playlistId, songId } = req.params;

    const sql = "DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?";
    db.query(sql, [playlistId, songId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Erreur lors de la suppression du son de la playlist" });
        } else {
            res.send({ message: "Son supprimé de la playlist avec succès" });
        }
    });
});

server.get("/playlists/:playlistId/songs", (req, res) => {
    const { playlistId } = req.params;

    const sql = `
        SELECT songs.* 
        FROM songs 
        INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id 
        WHERE playlist_songs.playlist_id = ?`;

    db.query(sql, [playlistId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: "Erreur lors de la récupération des sons de la playlist" });
        } else {
            res.send(result);
        }
    });
});


server.listen(3001, () =>
    console.log("Serveur en fonctionnement sur le port 3001")
);
