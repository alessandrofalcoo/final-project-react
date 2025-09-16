import GameCard from "./GameCard";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function Carousel({ games, carouselId }) {
    return (
        <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators genres-carousel">
                {games.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target={`#${carouselId}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <div className="carousel-inner devs-carousel">
                {games.map((game, index) => (
                    <div
                        key={game.id}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                        <div className="d-flex justify-content-center py-4">
                            <GameCard game={game} />
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>

        </div>
    );
}
