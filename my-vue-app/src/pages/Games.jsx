import { useEffect, useState } from "react"
import FilterGames from "./FilterGames";
import GameCard from "../components/GameCard";
import Header from "../components/Header";

export default function Games() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTitle, setSearchTitle] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {

        let url = "";

        if (searchTitle) {
            url = `${API_URL}/searchByName?title=${encodeURIComponent(searchTitle)}&page=${page}&size=10`;
        } else {
            url = `${API_URL}/filters?page=${page}&size=10`;
        }

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Fetch Error")
                }
                return res.json()
            })
            .then((data) => {
                const content = data.content || [];
                setGames(content);
                setTotalPages(data.totalPages)
                setError(content.length === 0 ? "Nessun gioco trovato." : "");
            })
            .catch((err) => {
                console.error("Errore fetch:", err);
                setError("Errore durante il caricamento dei giochi.");
            });
    }, [API_URL, page]);

    return (
        <>
            <div className="page-container d-flex flex-column min-vh-100">
                <main className="flex-grow-1 container">
                    <div className="text-center">
                        <h1>Lista dei giochi</h1>
                        <FilterGames setGames={setGames} setError={setError} />

                        {error && <p className="text-red-500">{error}</p>}

                        {games.length === 0 ? (
                            <div className="text-center mt-5">
                                <h2>Nessun gioco trovato</h2>
                                <p>Non ci sono giochi associati a questo genere.</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', }}>
                                    {games.map((game) => (
                                        <div key={game.id}>
                                            <GameCard game={game} />
                                        </div>
                                    ))}
                                </div>

                                <div className="d-flex justify-content-center my-3 gap-3">
                                    <button
                                        className="btn"
                                        onClick={() => setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))}
                                    >
                                        &laquo; Prev
                                    </button>

                                    <span className="align-self-center">Pagina {page + 1} di {totalPages}</span>

                                    <button
                                        className="btn"
                                        onClick={() => setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))}
                                    >
                                        Next &raquo;
                                    </button>
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