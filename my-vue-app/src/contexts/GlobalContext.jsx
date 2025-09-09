import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [query, setQuery] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [page, setPage] = useState(0);

    return (
        <SearchContext.Provider value={{ query, setQuery, searchTitle, setSearchTitle, page, setPage }}>
            {children}
        </SearchContext.Provider>
    );
}
