import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import GameCard from "../components/GameCard";


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

        <>
            <div className="page-container d-flex flex-column min-vh-100">
                <main className="flex-grow-1">
                    <div className="container align-center">
                        <h1 className="text-center">{game.title}</h1>
                        <GameCard className="" game={game} />
                        <Link className="btn-link" to="/games"><button className="btn my-2">Back to the list</button></Link>
                    </div>
                </main>

            </div>
        </>
    )
}