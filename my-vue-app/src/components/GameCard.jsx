import { Link } from "react-router-dom";

export default function GameCard({ game }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text">Genere: {game.genre?.name || "N/A"}</p>
                <p className="card-text">Developer: {game.dev?.name || "N/A"}</p>
                <Link to={`/games/${game.id}`} className="btn btn-primary">
                    Dettagli
                </Link>
            </div>
        </div>
    );
}
