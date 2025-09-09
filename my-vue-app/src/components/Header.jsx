import { useState } from "react"

export default function Header({ setSearchTitle, setPage, query, setQuery }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(0);
        setSearchTitle(query);
    }

    return (
        <>

            <nav className=" d-flex justify-content-around navbar p-4 navbar-expand-sm navbar-dark bg-dark">
                <a className="navbar-brand" href="/games">My Games'List</a>
                <form onSubmit={handleSubmit} className="d-flex gap-3 my-2 my-lg-0">
                    <input
                        className="form-control me-sm-2"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                    />
                    <button className="btn my-sm-0" type="submit">Search</button>
                </form>
            </nav>

        </>
    )
}