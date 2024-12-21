const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "database",
    user: "root",
    password: "root",
    database: "games",
    ssl: {
        rejectUnauthorized: false, // Accepter les connexions non sécurisées
    },
});

server.use(express.json());

server.use(cors());


server.post("/register", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;

    let sql = "INSERT INTO games (name, cost, category) VALUES (?,?,?)"
    db.query(sql, [name, cost, category], (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            console.log(result);
        }
    })
});

server.get("/games", (req, res) => {

    let sql = "SELECT * FROM games";
    db.query(sql, (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }

    })
});

server.put("/edit", (req, res) => {
    const { id, name, cost, category } = req.body;
    const sql = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";
    db.query(sql, [name, cost, category, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Failed to update the game" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Game not found" });
        }
        res.send({ message: "Game updated successfully" });
    });
});


server.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM games WHERE idgames = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Failed to delete the game" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Game not found" });
        }
        res.send({ message: "Game deleted successfully" });
    });
});


const handleDeleteGame = () => {
    axios.delete(`${baseUrl}/delete/${props.id}`)
        .then((response) => {
            console.log(response);
            // Actualisez la liste après suppression
            setGames((prevGames) => prevGames.filter((game) => game.id !== props.id));
        })
        .catch((error) => {
            console.error(error);
        });
};

server.listen(3001, () =>
    console.log("Running in the port 3001")
);