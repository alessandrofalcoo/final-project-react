import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function Games() {
    const [games, setGames] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}`)
            .then((res) => res.json())
            .then((data) => setGames(data.content || []))
            .catch((err) => console.error("Fetch error: ", err));
    }, [API_URL]);
    return (
        <main>
            <h1>Index</h1>
            <p>Lista dei giochi</p>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <Link to={`/games/${game.id}`}>{game.title}</Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}