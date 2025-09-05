import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/GlobalContext";

export default function FilterGames() {
    const { filters, setFilters, setGames, setError } = useContext(AppContext);
    const [genres, setGenres] = useState([]);
    const [devs, setDevs] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/genre`)
            .then(res => res.json())
            .then(data => setGenres(data))
            .catch(err => console.error(err));

        fetch(`${API_URL}/dev`)
            .then(res => res.json())
            .then(data => setDevs(data))
            .catch(err => console.error(err));
    }, [API_URL]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aggiorna filtri globali
        setFilters({ genreId: filters.genreId, devId: filters.devId });

        let query = [];
        if (filters.genreId) query.push(`genreId=${filters.genreId}`);
        if (filters.devId) query.push(`devId=${filters.devId}`);
        query.push("page=0&size=10");
        const queryString = query.length ? `?${query.join("&")}` : "";

        fetch(`${API_URL}/games/filters${queryString}`)
            .then(res => res.json())
            .then(data => {
                setGames(data.content || []);
                if (!data.content?.length) setError("Nessun gioco trovato con questi filtri.");
            })
            .catch(err => setError("Errore nel caricamento dei giochi."));
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3 d-flex gap-3 flex-column flex-md-row align-items-end">
            <div className="form-group">
                <label htmlFor="genreSelect">Genere</label>
                <select
                    className="form-select"
                    id="genreSelect"
                    value={filters.genreId || ""}
                    onChange={(e) => setFilters(prev => ({ ...prev, genreId: e.target.value }))}
                >
                    <option value="">Tutti i generi</option>
                    {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="devSelect">Developer</label>
                <select
                    className="form-select"
                    id="devSelect"
                    value={filters.devId || ""}
                    onChange={(e) => setFilters(prev => ({ ...prev, devId: e.target.value }))}
                >
                    <option value="">Tutti i developer</option>
                    {devs.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Filtra</button>
        </form>
    );
}
