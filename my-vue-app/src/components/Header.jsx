
export default function Header({ setSearchTitle, setPage, query, setQuery }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(0);
        setSearchTitle(query);
    }

    return (
        <>

            <nav className="d-flex justify-content-between navbar p-4 navbar-expand-sm">
                <a className="navbar-brand" href="/games">My Games'List</a>
                <form onSubmit={handleSubmit} className="d-flex gap-4">
                    <input
                        className="form-control search-bar"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name"
                    />
                    <button className="btn px-4" type="submit">Search</button>
                </form>
            </nav>

        </>
    )
}