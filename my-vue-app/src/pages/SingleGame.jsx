import { useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleGame() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <main>
            <h1>Show</h1>
            <p>Gioco con id: {id}</p>
        </main>
    )
}