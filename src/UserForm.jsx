import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function UserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const handleChange = (e) => setSelected(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      setMessage("Molimo odaberite spol.");
      return;
    }
    setMessage("");
    alert(`${firstName} ${lastName} – ${selected}`);
  };

  return (
    <>
      {/* <style>{css}</style> */}
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
            <div className="form-error">{message}</div>
            <button type="submit" className="form-btn-primary">{t("goForward")} &#x2192;</button>
            <button type="button" className="form-btn-secondary" data-bs-dismiss="modal">&#x2190; {t("goBack")}</button>
          </form>
        </div>
      </div>
    </>
  );
}