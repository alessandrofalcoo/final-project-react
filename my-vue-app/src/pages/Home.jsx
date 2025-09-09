

export default function Home() {
    return (
        <>
            <div className="page-container d-flex flex-column min-vh-100 home-hero">
                <div className="overlay d-flex flex-column justify-content-center align-items-center text-center text-white p-5">
                    <h1 className="display-3 fw-bold mb-4">Welcome to GameZone</h1>
                    <p className="lead mb-3">
                        Discover, search, and keep track of your favorite video games.
                        Browse our catalog, filter by genre or title, and find new adventures to dive into.
                        Whether you’re a fan of RPGs, a shooter enthusiast, or an indie game lover,
                        there’s always something exciting waiting for you.
                    </p>
                    <p className="mb-4">
                        We constantly update our library with the latest releases and timeless classics,
                        so your next challenge is always just a click away.
                    </p>
                    <a className="btn btn-lg px-5 py-3 shadow" href="/games"> Explore Games</a>
                </div>
            </div>


        </>
    )
}