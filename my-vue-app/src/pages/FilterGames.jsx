import { useState, useEffect } from "react"

export default function FilterGames({ setGames }) {
    const [genreId, setGenreId] = useState("");
    const [devId, setDevId] = useState("");
    const [genres, setGenres] = useState([]);
    const [devs, setDevs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/genre")
            .then(res => res.json())
            .then(data => setGenres(data))
            .catch(err => console.error(err));

        fetch("http://localhost:8080/api/dev")
            .then(res => res.json())
            .then(data => setDevs(data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        console.log("Filtri: ", { genreId, devId });
        let query = [];
        if (genreId) query.push(`genreId=${genreId}`)

        if (devId) query.push(`devId=${devId}`)
        if (genreId && devId) query.push(`genreId=${genreId}&devId=${devId}`);
        query.push("page=0&size=10");
        const queryString = query.length > 0 ? "?" + query.join("&") : "";

        fetch(`http://localhost:8080/api/games/filters${queryString}`)
            .then(res => res.json())
            .then(data => {
                if (!data.content || data.content.lenght === 0) {
                    setGames([]);
                    setError("No game with these filters")
                } else {
                    setGames(data.content);
                }
            })
            .catch(err => console.error(err));
    };


    return (
        <>
            <main className="container page-container">
                <form onSubmit={handleSubmit} className="my-3 d-flex gap-3 align-items-end justify-content-center">
                    <div className="form-group text-center">
                        <label htmlFor="genreSelect">
                            <select
                                className="form-select"
                                id="genreSelect"
                                value={genreId}
                                onChange={(e) => setGenreId(e.target.value)}>
                                <option value="">No genre selected</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="devSelect">
                            <select
                                className="form-select"
                                id="devSelect"
                                value={devId}
                                onChange={(e) => setDevId(e.target.value)}>
                                <option value="">No developer selected</option>
                                {devs.map((dev) => (
                                    <option key={dev.id} value={dev.id}>{dev.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-outline-dark">
                        Filter
                    </button>
                </form>

            </main>
        </>
    )
}
