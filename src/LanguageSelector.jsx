import React,{ useState } from 'react';
import srFlag from './assets/Flag_srb.webp';
import enFlag from './assets/Flag_uk.png';
import { useTranslation } from 'react-i18next';


const languages = [
    { value: 'sr', code:'sr', label: 'SRB', flag: srFlag },
    { value: 'en', code:'en', label: 'ENG', flag: enFlag }
];

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [selected, setSelected] = useState(
      languages.find(l => l.code === localStorage.getItem('lang')) || languages[0]
    );
  
    const handleSelect = (lang) => {
      setSelected(lang);
      i18n.changeLanguage(lang.code); 
      localStorage.setItem('lang', lang.code);
    };
  
    return (
    <div className='row bg-dark d-flex align-items-end m-0'>
        <div className="col d-flex justify-content-end p-1">
            <div className="dropdown">
                <button
                className="btn btn-dark  dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                <img src={selected.flag} alt={selected.label} style={{ width: 20, height: 20, marginRight: 8 }} />
                {selected.label}
                </button>
                <ul className="dropdown-menu bg-dark text-light">
                {languages.map(lang => (
                    <li key={lang.code}>
                    <button
                        className="dropdown-item d-flex align-items-center bg-dark text-light"
                        onClick={() => handleSelect(lang)}
                    >
                        <img src={lang.flag} alt={lang.label} style={{ width: 20, height: 20, marginRight: 8 }} />
                        {lang.label}
                    </button>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    </div>
    );
  }