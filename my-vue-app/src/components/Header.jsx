import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-dark text-white py-3 mb-4">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                <h1 className="h3 mb-3 mb-md-0">GameApp</h1>
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    "nav-link text-white" + (isActive ? " active" : "")
                                }
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/games"
                                className={({ isActive }) =>
                                    "nav-link text-white" + (isActive ? " active" : "")
                                }
                            >
                                Games
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    "nav-link text-white" + (isActive ? " active" : "")
                                }
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

