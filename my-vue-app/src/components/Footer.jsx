export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white py-3 mt-5">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                <p className="mb-2 mb-md-0">&copy; {year} GameApp. Tutti i diritti riservati.</p>
                <ul className="list-unstyled d-flex gap-3 mb-0">
                    <li className="text-white text-decoration-none">Privacy</li>
                    <li className="text-white text-decoration-none">Termini</li>
                    <li className="text-white text-decoration-none">Contatti</li>
                </ul>
            </div>
        </footer>
    );
}
