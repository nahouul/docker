import React, { useState } from "react";
import "./card.css"
import FormDialog from "./dialog/dialog";
import axios from "axios";

const Card = (props) => {
    const [open, setOpen] = useState(false);

    const cardOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <FormDialog
                open={open}
                setOpen={setOpen}
                id={props.id}
                title={props.title}
                artist={props.artist}
                album={props.album}
                genre={props.genre}
                duration={props.duration}
                refreshSongs={props.refreshSongs}
            />
            <div className="song-card">
                <div className="info">
                    <h4>{props.title}</h4>
                    <p>Artiste : {props.artist}</p>
                    <p>Album : {props.album}</p>
                    <p>Genre : {props.genre}</p>
                    <p>Durée : {props.duration} secondes</p>
                </div>
                <div className="actions">
                    <button className="edit" onClick={cardOpen}>Éditer</button>
                </div>
            </div>
        </>
    );
};

export default Card;
