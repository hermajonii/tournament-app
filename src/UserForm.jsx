import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next';
export default function UserForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(localStorage.getItem("teamMessage"))
        setMessage('Već je prijavljen igrač sa ovog uređaja!')
      else if(firstName.trim()!=='' && lastName.trim()!==''){
        const response = await fetch("https://tournament-backend-app.onrender.com/add-player", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({firstName:firstName, lastName:lastName, gender: selected})
        });
        const result = await response.json();
        if(result.error)
          setMessage(t('errorMenPlace'))

        if(response.status===200){
          setFirstName("");

          setLastName("");
          
          localStorage.setItem("teamMessage", message);    
          
          fetch("https://tournament-backend-app.onrender.com/session-id")
          .then(res => res.json())
          .then(data => {
            localStorage.setItem("serverSessionId",  data.sessionId);
            navigate("/")
            window.location.reload();
          })
          
        }
      }
      else
        setMessage('Niste uneli sve podatke!')
    } catch (err) {
      console.error(err);
      setMessage(err.message)
    }
    
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <form 
        onSubmit={handleSubmit} 
        className="p-5 text-light"
        style={{ minWidth: "300px" }}
      >
        <h2 className="mb-4 text-center">{t('assignMessage')}</h2>
        <div className="form-floating mb-3">
          <input className="form-control" id="firstName" placeholder="name@example.com" value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required/>
          <label htmlFor="firstName"  className="text-success">{t('name')}</label>
        </div>
        <div className="form-floating mb-3">
          <input className="form-control" id="lastName" placeholder="name@example.com" value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required/>
          <label htmlFor="lastName"  className="text-success">{t('surname')}</label>
        </div>
        <h4 className="mb-3">{t('gender')}: </h4>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="radio1"
            value="f"
            checked={selected === "f"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="radio1">
          {t('female')}
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="radio2"
            value="m"
            checked={selected === "m"}
            onChange={handleChange}
            required   
          />
          <label className="form-check-label" htmlFor="radio2">
          {t('male')}
          </label>
        </div>
        <p className="text-danger">{message}</p>
        <button type="submit" className="mt-3 btn btn-success w-100 text-dark fw-bold">
        {t('goForward')}
        </button>
        <button className="btn btn-danger mt-3 w-100" type="button" data-bs-dismiss="modal">
          &lt;&lt; {t('goBack')}
        </button>
      </form>
    </div>
  );
}
