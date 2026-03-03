import { useState, useEffect} from "react";
import PopupQuestion from './PopUpQuestion';
import ball from './assets/ball.png'
import LanguageSelector from './LanguageSelector';
export default function App() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    
  useEffect(() => {
    if(localStorage.getItem("teamMessage")) {
      setIsButtonDisabled(true)
    }

  })
    return (
        <div className="full-page">       
            <LanguageSelector /> 
            <nav className="navbar navbar-expand shadow-sm py-2 px-4 bg-black"  >
              <a className="navbar-brand d-flex align-items-center m-0 p-0" href="">
                <img src={ball} alt="Logo" width="120" height="120" />
              </a>
              
              <ul className={`navbar-nav ms-auto p-0 ${isButtonDisabled ? "d-none" : ""}`}>
                <li className="nav-item">
                  <PopupQuestion />
                </li>
              </ul>
            </nav>
           
        </div>
    );
  }