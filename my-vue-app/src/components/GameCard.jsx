import { Link } from "react-router-dom"

export default function GameCard({ game }) {

    return (
        <>
            <div className="container d-flex justify-content-center">
                <Link className="my-card" to={`/games/${game.id}`}>
                    <div className="game-card">
                        <img src={game.url} alt={game.title} className="game-card-img" />
                        <div className="game-card-body">
                            <h5 className="game-card-title"> {game.title}</h5>
                            <p className="game-card-price">{game.price}€</p>
                            <p className="game-card-year">{game.year}</p>
                        </div>
                    </div>
                </Link >

            </div>

        </>
    )
}