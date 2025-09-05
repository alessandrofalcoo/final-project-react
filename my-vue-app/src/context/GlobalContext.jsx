import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({ genreId: "", devId: "" });

    return (
        <AppContext.Provider
            value={{
                games,
                setGames,
                error,
                setError,
                filters,
                setFilters,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
