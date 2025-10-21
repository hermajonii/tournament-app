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
            <nav className="navbar navbar-expand navbar-dark bg-dark p-0 m-0 px-1 pt-1">
            
                <a className="navbar-brand d-flex align-items-center m-0 p-0" href="">
                <img
                    src={ball}
                    alt="Logo"
                    width="140"
                    height="140"
                    className="m-0 p-0"
                    />
                </a>
                
                <ul className={`navbar-nav ms-auto p-0  ${isButtonDisabled===true ? "d-none" : ""}`}>
                    <li className={`nav-item ${isButtonDisabled===true ? "d-none" : ""}" `}>
                        <PopupQuestion/>
                    </li>
                </ul>
                
            </nav>
           
        </div>
    );
  }