import { NavLink } from "react-router-dom"

import "./Header.css"

function Header() {
    return <div className="header navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
            <a className="navbar-brand title">TILL Airlines</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-0 mb-lg-0">
                    <li className="nav-item">
                        <NavLink to="/"
                            end
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >Inicio
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/destinos"
                            end
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >Destinos
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default Header