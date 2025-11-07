import { useState, useEffect, useContext } from "react"
import { SearchContext } from "../contexts/GlobalContext";



export default function FilterGames() {
    const { setPage, size, setGames, setTotalPages, setError } = useContext(SearchContext);
    const [genreId, setGenreId] = useState("");
    const [devId, setDevId] = useState("");
    const [genres, setGenres] = useState([]);
    const [devs, setDevs] = useState([]);

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

    const handleReset = () => {
        if (genres || devs) {
            setGenreId("")
            setDevId("")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setGenreId("")
        setDevId("")

        let query = [];
        if (genreId) query.push(`genreId=${genreId}`)
        if (devId) query.push(`devId=${devId}`)
        if (genreId && devId) query.push(`genreId=${genreId}&devId=${devId}`);
        query.push(`page=0&size=${size}`);
        const queryString = query.length > 0 ? "?" + query.join("&") : "";

        fetch(`http://localhost:8080/api/games/filters${queryString}`)
            .then(res => res.json())
            .then(data => {
                if (!data.content || data.content.length === 0) {
                    setGames([]);
                    setTotalPages(0)
                    setError("No game with these filters")
                } else {
                    setGames(data.content);
                    setTotalPages(data.totalPages || 1)
                    setPage(0)
                }
            })
            .catch(err => {
                console.error(err)
                setGames([])
                setTotalPages(0)
                setError("Filter Error")
            });
    };


    return (
        <>
            <main className="container page-container">
                <div className="container">
                    <form onSubmit={handleSubmit} className="my-3 d-flex gap-3 align-items-end justify-content-center">
                        <button className="btn reset-btn" onClick={handleReset} >Reset Filters</button>
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
                        <button type="submit" className="btn filter-btn">
                            Filter
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
