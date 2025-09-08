import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function SingleGame() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Errore nella risposta dal server")
                }
                return res.json();
            })
            .then((data) => {
                setGame(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Errore nel fetch: ", err);
                setError(err.message);
                setLoading(false);
            })
    }, [id, API_URL])

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;
    if (!game) return <p>Gioco non trovato</p>;
    return (

        <main>
            <div>
                <h1>Show</h1>
                <h2>{game.title}</h2>
                <h3>{game.dev.name}</h3>
                <h4>{game.genre.name}</h4>
                <h5>{game.price}€</h5>
                <Link to="/">Torna alla lista</Link>
            </div>

        </main>
    )
}