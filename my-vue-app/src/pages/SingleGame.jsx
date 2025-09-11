import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import Carousel from "../components/Carousel";


export default function SingleGame() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sameGenreGames, setSameGenreGames] = useState([])
    const [sameDevGames, setSameDevGames] = useState([])

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

                if (data.genre?.id) {
                    fetch(`${API_URL}/filters?genreId=${data.genre.id}`)
                        .then(res => res.json())
                        .then(data => {
                            const filtered = (data.content || []).filter(g => g.id !== Number(id));
                            setSameGenreGames(filtered);
                        })
                        .catch(err => console.error(err, "Genre fetch error"))
                }
                if (data.dev?.id) {
                    fetch(`${API_URL}/filters?devId=${data.dev.id}`)
                        .then(res => res.json())
                        .then(data => {
                            const filtered = (data.content || []).filter(g => g.id !== Number(id));
                            setSameDevGames(filtered);

                        })
                        .catch(err => console.error(err, "Dev fetch error"))
                }
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
                    <div className="container">
                        <div className="">
                            <h1 className="text-center">{game.title}</h1>
                            <GameCard className="" game={game} />

                        </div>
                        <div className="container d-flex justify-content-center">
                            <Link className="btn-link" to="/games"><button className="btn my-2">Back to the list</button></Link>

                        </div>

                        <h2 className="mt-5">Other about this genre</h2>
                        {sameGenreGames.length > 0 ? (
                            <Carousel games={sameGenreGames} carouselId="carousel-genre" />
                        ) : (
                            <p>No other games found in this genre.</p>
                        )}

                        <h2 className="mt-5">Other about this dev</h2>
                        {sameDevGames.length > 0 ? (

                            <Carousel games={sameDevGames} carouselId="carousel-dev" />
                        ) : (
                            <p>No other games found in this dev.</p>
                        )}
                    </div>
                </main>

            </div>
        </>
    )
}