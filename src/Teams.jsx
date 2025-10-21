import { useEffect,useState } from "react";
import { useTranslation } from 'react-i18next';
export default function App() {
    const [teams, setTeams] = useState([]);
    const [courts, setCourts] = useState([]);
    const [wins, setWins] = useState([]);
    const [numOfPlayers, setNumOfPlayers] = useState([]);
    const [activeTab, setActiveTab] = useState("teams");
    const [message, setMessage] = useState(" ");
    const { t } = useTranslation();
    useEffect(() => {
      const fetchResults = async () => {
        try {
          const res = await fetch("https://tournament-backend-app.onrender.com/results");
          const data = await res.json();
          setCourts(data.results);
          setWins(data.wins);
          setNumOfPlayers(data.numOfPlayers);
        } catch (err) {
          console.error("Greška prilikom učitavanja rezultata:", err);
        }
      };
      fetchResults()
      
      fetch("https://tournament-backend-app.onrender.com/session-id")
      .then(res => res.json())
      .then(data => {
        const savedSessionId = localStorage.getItem("serverSessionId");

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


        
        // Interval na svakih 15 sekundi
        const intervalId = setInterval(fetchResults, 5000);
    
        // Čišćenje intervala kada se komponenta unmountuje
        return () => clearInterval(intervalId);
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
                {t('showTeam')}
            </button>
            </li>
            <li className="nav-item  text-info">
            <button
                className={`nav-link text-info ${activeTab === "results" ? "active bg-info text-dark" : ""}`}
                onClick={() => {setActiveTab("results");}}
            >
                {t('showResults')}
            </button>
            </li>
        </ul>
    

        {activeTab === "teams" && (
            teams.map(team => (
                <div key={team.team} className="m-5 p-3">
                <h5 className="text-info">{t('team')} {team.team} - {t('members')}</h5>
                <table className="table table-bordered table-stripped">
                    <tbody>
                    {Array.from({ length: numOfPlayers }).map((_, i) => (
                        <tr key={i}>
                            <td className="col-1 bg-dark text-light text-center pb-1 align-middle"> {i+1}.</td>
                            <td className="bg-dark text-light text-center pb-1 align-middle">{team.members[i]?.name || " "}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            ))
        )}
       {activeTab === "results" && wins && (
        <div className="m-5 p-3">
          <h3 className="text-info">{t('numOfWins')}: </h3>
          <table className="table table-bordered table-stripped">
            <thead>
              <tr>
                <td className="col-6 bg-dark text-light text-center pb-1 align-middle"> {t('team')}</td>
                <td className="bg-dark text-light text-center pb-1 align-middle">{t('wins')}</td>
              </tr>   
            </thead>
            <tbody>
              {wins.map(team => (
                <tr key={team.team}>
                  <td className="col-6 bg-dark text-light text-center pb-1 align-middle"> {t('team')} {team.team} </td>
                  <td className="bg-dark text-light text-center pb-1 align-middle">{team.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        {
            activeTab === "results" && courts && (
              
              Object.keys(courts).map(courtNum => (
                <div key={courtNum} className="m-5">
                  <h3 className="my-3 pt-3 text-info ">{t('field')} {parseInt(courtNum)+1}</h3>
                  <table className="table table-bordered text-center table-striped">
                    <thead>
                      <tr>
                        <th className="bg-dark text-light">{t('game')}</th>
                        <th className="bg-dark text-light">{t('score')}</th>
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