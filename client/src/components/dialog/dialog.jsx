import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import axios from "axios";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        title: props.title,
        artist: props.artist,
        album: props.album,
        genre: props.genre,
        duration: props.duration,
    });

    const handleEditValues = () => {
        axios.put("http://localhost:3001/edit", {
            id: editValues.id,
            title: editValues.title,
            artist: editValues.artist,
            album: editValues.album,
            genre: editValues.genre,
            duration: editValues.duration,
        })
        .then((response) => {
            console.log("Chanson mise à jour avec succès :", response.data);
            handleClose();
            props.refreshSongs(); 
        })
        .catch((error) => {
            console.error("Erreur lors de la mise à jour de la chanson :", error);
        });
    };

    const handleDeleteSong = () => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete/${editValues.id}`)
            .then((response) => {
                console.log(response.data);
                handleClose();
                props.refreshSongs();
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de la chanson :", error);
            });
    }

    const handleChangeValues = (event) => {
        const { id, value } = event.target;
        setEditValues(prevValues => ({
            ...prevValues,
            [id]: value,
        }));
    }

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Éditer la Chanson</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Titre"
                        defaultValue={props.title}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="artist"
                        label="Artiste"
                        defaultValue={props.artist}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="album"
                        label="Album"
                        defaultValue={props.album}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="genre"
                        label="Genre"
                        defaultValue={props.genre}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="duration"
                        label="Durée (secondes)"
                        defaultValue={props.duration}
                        type="number"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleEditValues}>Enregistrer</Button>
                    <Button onClick={handleDeleteSong} color="error">Supprimer</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
