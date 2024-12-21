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

server.listen(3001, () =>
    console.log("Serveur en fonctionnement sur le port 3001")
);
