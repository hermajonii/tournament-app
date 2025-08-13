import { useState } from "react";
export default function UserForm() {
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [message, setMessage] = useState("");
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
          body: JSON.stringify({firstName:firstName, lastName:lastName})
        });
        const result = await response.json();
        if(result.error)
          setMessage(result.error)
        if(response.status===200){
          setFirstName("");
          setLastName("");
          
          localStorage.setItem("teamMessage", result.message);    

          //if(!localStorage.getItem("serverSessionId")){
            fetch("https://tournament-backend-app.onrender.com")
            .then(res => res.json())
            .then(data => {
              localStorage.setItem("serverSessionId",  data.sessionId);
            })
          //}
          window.location.href = "/";
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
        <h2 className="mb-4 text-center">Prijava igrača</h2>
        <div class="form-floating mb-3">
          <input class="form-control" id="firstName" placeholder="name@example.com" value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required/>
          <label for="firstName"  className="text-success">Ime</label>
        </div>
        <div class="form-floating mb-3">
          <input class="form-control" id="lastName" placeholder="name@example.com" value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required/>
          <label for="lastName"  className="text-success">Prezime</label>
        </div>
        <p className="text-danger">{message}</p>
        <button type="submit" className="mt-3 btn btn-success w-100 text-dark fw-bold">
          Ubaci me u nasumičnu grupu
        </button>
        <button className="btn btn-danger mt-3 w-100" type="button" data-bs-dismiss="modal">
          &lt;&lt; Vrati se nazad na raspored
        </button>
      </form>
    </div>
  );
}
