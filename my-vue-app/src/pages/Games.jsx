import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import FilterGames from "./FilterGames";
import GameCard from "../components/GameCard";


export default function Games() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/filters?page=0&size=6`)
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
            <div className="page-container d-flex flex-column min-vh-100">
                <main className="flex-grow-1">
                    <div className="container text-center">
                        <h1>Lista dei giochi</h1>
                        <FilterGames setGames={setGames} setError={setError} />

                        {error && <p className="text-red-500">{error}</p>}

                        {games.length === 0 ? (
                            <div className="text-center mt-5">
                                <h2>404 - Nessun gioco trovato</h2>
                                <p>Non ci sono giochi associati a questo genere.</p>
                            </div>
                        ) : (
                            <>
                                <div className="row mb-4 d-flex justify-content-around">
                                    {games.slice(0, 3).map((game) => (
                                        <div className="col-md-2 col-sm-4 col-6 mb-3" key={game.id}>
                                            <GameCard game={game} />
                                        </div>
                                    ))}
                                </div>

                                <div className="row d-flex justify-content-around">
                                    {games.slice(3, 6).map((game) => (
                                        <div className="col-md-2 col-sm-4 col-6 mb-3" key={game.id}>
                                            <GameCard game={game} />
                                        </div>
                                    ))}
                                </div>
                            </>

                        )
                        }
                    </div>
                </main >

            </div>

        </>
    )
}