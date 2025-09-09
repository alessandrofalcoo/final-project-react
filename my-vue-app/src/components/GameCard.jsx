import { Link } from "react-router-dom"

export default function GameCard({ game }) {
    if (!game) {
        return null;
    }
    return (
        <>
            <Link className="my-card" to={`/games/${game.id}`}>
                <div className="game-card">
                    <img src={game.url} alt={game.title} className="game-card-img" />
                    <div className="game-card-body">
                        <h5 className="game-card-title">{game.title}</h5>
                    </div>
                </div>
            </Link >

        </>
    )
}