import { useEffect,useState } from "react";

export default function App() {
    const [teams, setTeams] = useState([]);
    const [courts, setCourts] = useState([]);
    const [activeTab, setActiveTab] = useState("teams");
    const [message, setMessage] = useState(" ");
    useEffect(() => {
      fetch("https://tournament-backend-app.onrender.com/session-id")
        .then(res => res.json())
        .then(data => {
          const savedSessionId = localStorage.getItem("serverSessionId");
          let mess = localStorage.getItem("teamMessage")
          console.log(mess)
          if (savedSessionId === data.sessionId) {
            let mess = localStorage.getItem("teamMessage")
            setMessage(mess);
          }
          else {
            localStorage.removeItem("teamMessage");            
          }
        });
        
        fetch("https://tournament-backend-app.onrender.com/teams")
        .then(res => res.json())
        .then(data => {
            setTeams(data.teams);
            setCourts(data.results);
        })
        .catch(err => console.error(err));
    }, []);
  return (
     <div className="bg-dark text-light pb-2">
        <h3 className="bg-dark p-3">{message}</h3>
        <ul className="nav nav-tabs text-info">
            <li className="nav-item  text-info">
            <button
                className={`nav-link text-info ${activeTab === "teams" ? "active  bg-info text-dark" : ""}`}
                onClick={() => setActiveTab("teams")}
            >
                Timovi
            </button>
            </li>
            <li className="nav-item  text-info">
            <button
                className={`nav-link text-info ${activeTab === "results" ? "active bg-info text-dark" : ""}`}
                onClick={() => setActiveTab("results")}
            >
                Rezultati
            </button>
            </li>
        </ul>
    

        {activeTab === "teams" && (
            teams.map(team => (
                <div key={team.team} className="m-5 p-3">
                <h5 className="text-info">Tim {team.team} - članovi</h5>
                <table className="table table-bordered table-stripped">
                    <tbody>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <tr key={i}>
                            <td className="col-1 bg-dark text-light text-center pb-1 align-middle"> {i+1}.</td>
                            <td className="bg-dark text-light text-center pb-1 align-middle">{team.members[i] || " "}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            ))
        )}
        {
            activeTab === "results" && (
                Object.keys(courts).map(courtNum => (
                    <div key={courtNum} className="m-5">
                      <h3 className="my-3 pt-3 text-info ">Teren {parseInt(courtNum)+1}</h3>
                      <table className="table table-bordered text-center table-striped">
                        <thead>
                          <tr>
                            <th className="bg-dark text-light">Game</th>
                            <th className="bg-dark text-light">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courts[courtNum].map((g, idx) => (
                            <tr key={idx}>
                              <td className="bg-dark text-light">{g.game}</td>
                              <td className="bg-dark text-light">{g.result || "–"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))
            )
        }
    </div>
    );
}