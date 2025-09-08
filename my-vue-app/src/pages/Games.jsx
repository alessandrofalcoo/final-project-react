import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import FilterGames from "./FilterGames";
import GameCard from "../components/GameCard";


export default function Games() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/filters?page=0&size=10`)
            .then((res) => res.json())
            .then((data) => {
                const content = data.content || [];
                setGames(content);
                setError(content.length === 0 ? "Nessun gioco trovato." : "");
            })
            .catch((err) => {
                console.error("Errore fetch:", err);
                setError("Errore durante il caricamento dei giochi.");
            });
    }, [API_URL]);

    return (
        <>
            <main className="container">
                <div className="container text-center">
                    <h1>Lista dei giochi</h1>
                    <FilterGames setGames={setGames} setError={setError} />

                    {error && <p className="text-red-500">{error}</p>}

                    {games.length > 0 && (
                        <ul className="gamesList">
                            {games.map((game) => (
                                <li className="games my-3" key={game.id}>
                                    <GameCard game={game}></GameCard>

                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>

        </>
    )
}