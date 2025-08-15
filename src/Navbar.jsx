import { useState, useEffect} from "react";
import PopupQuestion from './PopUpQuestion';
import ball from './assets/ball.png'
export default function App() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  useEffect(() => {
    if(localStorage.getItem("teamMessage")) {
      setIsButtonDisabled(true)
    }

  })
    return (
        <div className="full-page">        
            <nav className="navbar navbar-expand navbar-dark bg-dark px-3 ">
                <a className="navbar-brand d-flex align-items-center" href="">
                <img
                    src={ball}
                    alt="Logo"
                    width="140"
                    height="140"
                    className="me-2"
                    />
                </a>
                
                <ul className={`navbar-nav ms-auto  ${isButtonDisabled===true ? "d-none" : ""}`}>
                    <li className={`nav-item ${isButtonDisabled===true ? "d-none" : ""}" `}>
                        <PopupQuestion/>
                    </li>
                </ul>
            </nav>
        </div>
    );
  }