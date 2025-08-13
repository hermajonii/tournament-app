import { useRef } from "react";
import PopupQuestion from './PopUpQuestion';
import ball from './assets/ball.png'
export default function App() {
    return (
        <div className="full-page">        
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
                <a className="navbar-brand d-flex align-items-center" href="#">
                <img
                    src={ball}
                    alt="Logo"
                    width="140"
                    height="140"
                    className="me-2"
                    />
                </a>
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <PopupQuestion/>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    );
  }