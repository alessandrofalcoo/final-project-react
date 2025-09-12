import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../contexts/GlobalContext";
import FilterGames from "./FilterGames";
import GameCard from "../components/GameCard";

export default function Games() {
    const { searchTitle, setSearchTitle, page, setPage } = useContext(SearchContext);
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {


        let url = searchTitle
            ? `${API_URL}/searchByName?title=${encodeURIComponent(searchTitle)}&page=${page}&size=6`
            : `${API_URL}/filters?page=${page}&size=6`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Fetch Error");
                return res.json();
            })
            .then((data) => {
                const content = data.content || [];
                setGames(content);
                setTotalPages(data.totalPages);
                setError(content.length === 0 ? "Nessun gioco trovato." : "");
            })
            .catch((err) => {
                console.error("Errore fetch:", err);
                setError("No game found");
            });
    }, [API_URL, page, searchTitle]);

    return (
        <div className="page-container d-flex flex-column min-vh-100">
            <main className="flex-grow-1 container">
                <div className="text-center my-4">
                    <h1>Lista dei giochi</h1>
                    <FilterGames setGames={setGames} setExternalError={setError} setTotalPages={setTotalPages} setPage={setPage} />

                    {error ? (
                        <div className="text-center mt-5">
                            <h2>{error || "No game found"}</h2>
                            <div className="btn-error-container">
                                <a className="btn btn-error" href="/games">Back to the list</a>

                            </div>
                        </div>


                    ) : (
                        <>
                            <div className="grid-cards">
                                {games.map((game) => (
                                    <div key={game.id}>
                                        <GameCard game={game} />
                                    </div>
                                ))}
                            </div>

                            {games.length > 0 && totalPages > 1 && (
                                <div className="d-flex justify-content-center my-3 gap-3">
                                    <button
                                        className="btn"
                                        onClick={() => setPage(prev => (prev === 0 ? totalPages - 1 : prev - 1))}
                                    >
                                        &laquo; Prev
                                    </button>

                                    <span className="align-self-center">Pagina {page + 1} di {totalPages}</span>

                                    <button
                                        className="btn"
                                        onClick={() => setPage(prev => (prev === totalPages - 1 ? 0 : prev + 1))}
                                    >
                                        Next &raquo;
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
