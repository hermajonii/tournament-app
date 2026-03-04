import { useState } from "react";
import { useTranslation } from 'react-i18next';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export default function UserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const [secretCode, setSecretCode] = useState("");
  const handleChange = (e) => setSelected(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if(firstName.trim().length==0 || lastName.trim().length==0){
        setMessage(t('messageNoData'));
        return;
      }
      if (!selected) {
        setMessage(t('messageGender'));
        return;
      }      
      if (secretCode.trim().length === 0) {
        setMessage(t('messageNoCode'));
        return;
      }
      if(localStorage.getItem("teamMessage")){
        setMessage('Već je prijavljen igrač sa ovog uređaja!')
        return;
      }
      setMessage("");      

      const response = await fetch(`${SERVER_URL}/add-player`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({firstName:firstName, lastName:lastName, gender: selected, secretCode:secretCode})
      });
      const result = await response.json();
      
      if(response.status===401)
        setMessage(t('messageWrongKey'))
      if(result.error){
        setMessage(result.error)
      }

      if(response.status===200){
        setFirstName("");
        setLastName("");
        
        localStorage.setItem("teamMessage", result.message);    
        
        fetch(`${SERVER_URL}/session-id`)
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("serverSessionId",  data.sessionId);
          window.location.href = "/";
        })        
      }
      
    } catch (err) {
      console.error(err);
      setMessage(err.message)
    }
  };

  return (
    <>
      <div className="form-scene">
        <div className="form-card animate__animated animate__fadeInUp">
          <h2 className="form-title">{t("goodLuckMessage")}</h2>
          <p className="form-subtitle">{t("assignMessage")}</p>
          <div className="form-divider">
            <div className="form-divider-line" />
            <div className="form-divider-dot" />
            <div className="form-divider-line" />
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <input id="firstName" type="text" placeholder=" " value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              <label htmlFor="firstName">{t("name")}</label>
            </div>
            <div className="form-field">
              <input id="lastName" type="text" placeholder=" " value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              <label htmlFor="lastName">{t("surname")}</label>
            </div>
            <span className="gender-label">{t("gender")}</span>
            <div className="radio-group">
              <div className="radio-option">
                <input type="radio" id="radio-f" name="gender" value="f" checked={selected === "f"} onChange={handleChange} />
                <label htmlFor="radio-f">{t("female")}</label>
              </div>
              <div className="radio-option">
                <input type="radio" id="radio-m" name="gender" value="m" checked={selected === "m"} onChange={handleChange} />
                <label htmlFor="radio-m">{t("male")}</label>
              </div>
            </div>
            <div className="form-field">
              <input
                id="secretCode"
                type="text"
                placeholder=" "
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                required
              />
              <label htmlFor="secretCode">{t('secretCode')}</label>
            </div>
            <div className="form-error">{message}</div>
            <button type="submit" className="form-btn-primary">{t("goForward")} &#x2192;</button>
            <button type="button" className="form-btn-secondary" data-bs-dismiss="modal">&#x2190; {t("goBack")}</button>
          </form>
        </div>
      </div>
    </>
  );
}