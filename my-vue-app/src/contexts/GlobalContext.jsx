import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [query, setQuery] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [games, setGames] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState("");

    return (
        <SearchContext.Provider value={{ query, setQuery, searchTitle, setSearchTitle, page, setPage, size, setSize, games, setGames, totalPages, setTotalPages, error, setError }}>
            {children}
        </SearchContext.Provider>
    );
}
