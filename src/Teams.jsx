import { useEffect,useState } from "react";
import { useTranslation } from 'react-i18next';
import MessageBanner from "./MessageBanner";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
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
          const res = await fetch(`${SERVER_URL}/results`);
          const data = await res.json();
          setCourts(data.results);
          setWins(data.wins);
          setNumOfPlayers(data.numOfPlayers);
        } catch (err) {
          console.error("Greška prilikom učitavanja rezultata:", err);
        }
      };
      fetchResults()
      
      fetch(`${SERVER_URL}/session-id`)
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
        
        
      fetch(`${SERVER_URL}/teams`)
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
     <div className="bg-black pb-2" >
        <MessageBanner message={message} />
        <ul className="nav nav-tabs rounded border-evergreen">
            <li className="nav-item bg-black border-evergreen">
            <button
                className={`nav-link ${activeTab === "teams" ? "active bg-evergreen text-light border-evergreen" : "text-evergreen  bg-black border-evergreen border-bottom"}`}
                onClick={() => setActiveTab("teams")}
            >
                {t('showTeam')}
            </button>
            </li>
            <li className="nav-item text-light bg-evergreen rounded-end">
            <button
                className={`nav-link  ${activeTab === "results" ? "active bg-evergreen text-light border-evergreen" : "text-evergreen  bg-black border-evergreen border-bottom"}`}
                onClick={() => {setActiveTab("results");}}
            >
                {t('showResults')}
            </button>
            </li>
        </ul>
    

        {activeTab === "teams" && (
            teams.map(team => (
                <div key={team.team} className="my-5 px-3 mx-3">
                  <h5 className="pt-3 bg-gradient text-light rounded-top p-2 m-0 border-dark">{t('team')} {team.team} - {t('members')}</h5>
                  <table className="table table-bordered border-0">
                    <thead>
                      <tr>
                        <td className=" bg-black text-orange text-center pb-1 align-middle border-dark form-subtitle"> {t('number')}</td>
                        <td className="bg-black text-orange text-center pb-1 align-middle border-dark form-subtitle">{t('fullname')}</td>
                      </tr>   
                    </thead>
                      <tbody>
                      {Array.from({ length: numOfPlayers }).map((_, i) => (
                          <tr key={i}>
                              <td className="col-1 bg-black text-light text-center pb-1 align-middle border-dark"> {i+1}.</td>
                              <td className="bg-black text-light text-center pb-1 align-middle border-dark">{team.members[i]?.name || " "}</td>
                          </tr>
                      ))}
                      </tbody>
                  </table>
                  <div className="form-divider mt-5">
                    <div className="form-divider-line" />
                    <div className="form-divider-dot" />
                    <div className="form-divider-line" />
                  </div>
                </div>
                
            ))
            
        )}
       {activeTab === "results" && wins && (
        <div className="m-5 mb-0 p-3">
          <h3 className="pt-3 bg-gradient text-light rounded-top p-2 m-0 border-dark">{t('numOfWins')}: </h3>
          <table className="table table-bordered table-stripped border-0">
            <thead>
              <tr>
                <td className="col-6 bg-black text-orange text-center pb-1 align-middle border-dark form-subtitle"> {t('team')}</td>
                <td className="bg-black text-orange text-center pb-1 align-middle border-dark form-subtitle">{t('wins')}</td>
              </tr>   
            </thead>
            <tbody>
              {wins.map(team => (
                <tr key={team.team}>
                  <td className="col-6 bg-black text-light text-center pb-1 align-middle border-dark"> {t('team')} {team.team} </td>
                  <td className="bg-black text-light text-center pb-1 align-middle border-dark">{team.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        {
            activeTab === "results" && courts && (
              
              Object.keys(courts).map(courtNum => (
                <div key={courtNum} className="mx-5 mb-5 p-3">
                  <div className="form-divider mb-5">
                    <div className="form-divider-line" />
                    <div className="form-divider-dot" />
                    <div className="form-divider-line" />
                  </div>
                  <h3 className="pt-3 bg-gradient text-light rounded-top p-2 m-0 border-dark">{t('field')} {parseInt(courtNum)+1}</h3>
                  <table className="table table-bordered text-center table-striped mt-0 border-0">
                    <thead>
                      <tr>
                        <th className="bg-black text-orange col-6 border-dark form-subtitle">{t('game')}</th>
                        <th className="bg-black text-orange col-6 border-dark form-subtitle">{t('score')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courts[courtNum].map((g, idx) => (
                        <tr key={idx}>
                          <td className="bg-black text-light border-dark">{g.game}</td>
                          <td className="bg-black text-light border-dark">{g.result || "–"}</td>
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