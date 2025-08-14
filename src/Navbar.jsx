import { useState, useEffect} from "react";
import PopupQuestion from './PopUpQuestion';
import ball from './assets/ball.png'
export default function App() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  useEffect(() => {
    if(localStorage.getItem("teamMessage")) {
      setIsButtonDisabled(true)
    }

    console.log(isButtonDisabled)
  })
    return (
        <div className="full-page">        
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 ">
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
                className={`navbar-toggler ${isButtonDisabled===true ? "d-none" : ""} `}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isButtonDisabled===true ? "d-none" : ""}`} id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className={`nav-item ${isButtonDisabled===true ? "d-none" : ""}" `}>
                        <PopupQuestion/>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    );
  }