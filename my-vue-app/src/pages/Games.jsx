import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import FilterGames from "./FilterGames";


export default function Games() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/filters?page=0&size=10`)
            .then((res) => res.json())
            .then((data) => {
                const content = data.content || [];
                setGames(content)
                setError(content.length === 0 ? "No game found. " : "");
            })
            .catch((err) => {
                console.error("Fetch error: ", err);
                setError("Error during games' loading")
            })
    }, [API_URL]);


    return (
        <main className="container">
            <h1>Lista dei giochi</h1>
            <FilterGames setGames={setGames} setError={setError} />

            {games.length > 0 && (
                <ul>
                    {games.map((game) => (
                        <li key={game.id}>
                            <Link to={`/games/${game.id}`}>{game.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}