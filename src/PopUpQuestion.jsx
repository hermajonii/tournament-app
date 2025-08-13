import { useRef,useEffect,useState } from "react";
import UserForm from './UserForm';
import bambi from './assets/bambi.jpeg'
export default function App() {
  const modalRef = useRef(null);
  const modal2Ref = useRef(null);
  const modal3Ref = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };
  const openModal2 = () => {
    const modal2 = new window.bootstrap.Modal(modal2Ref.current);
    modal2.show();
  };
  const openModal3 = () => {
    const modal3 = new window.bootstrap.Modal(modal3Ref.current);
    modal3.show();
  };
  const handleNoClick = () => {
    const modal = window.bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    openModal3();
  };

  const handleYesClick = () => {
    const modal = window.bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
    openModal2();
  };
  useEffect(() => {
    if(localStorage.getItem("teamMessage")) {
      setIsButtonDisabled(true)
    }
  })

  return (
    <div className={`container ${isButtonDisabled === true ? "d-none" : ""}`}>
      <button className='btn border-0 text-light btn-lg text-decoration-underline' onClick={openModal}>
        Dodeli mi tim
      </button>

      {/* Modal 1 */}
      <div
        className="modal fade"
        tabIndex="-1"
        ref={modalRef}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen bg-dark">
          <div className="modal-content text-light bg-dark">
            <div className="modal-body d-flex flex-column justify-content-center align-items-center text-center">
              <h3 className="mb-4 text-info">Da li igrate danas? Dodela tima je samo za one koji igraju danas, budi fer!!!</h3>
              <h5 className="fs-4 mb-5 mt-4">
                Da li ste baš baš baaaaaaaaš sigurni da danas igrate???
              </h5> 
              <div>
                <button
                  className="btn btn-outline-success p-4 me-3"
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={handleYesClick}
                >
                  Da, sigurno igram danas :)
                </button>
                <button
                  className="btn btn-outline-danger p-4"
                  data-bs-dismiss="modal"
                  onClick={handleNoClick}
                >
                  Ne igram danas :(
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 2 */}
      <div
        className="modal fade"
        tabIndex="-1"
        ref={modal2Ref}
        aria-hidden="true"
      >
       
        <div className="modal-dialog modal-fullscreen bg-success">
          <div className="modal-content text-light bg-success">
            
            <div className="modal-body d-flex flex-column justify-content-center align-items-center text-center">
              <h2 className="mb-4">Srećno danas! 🏆</h2>
              <UserForm/>
              
            </div>
          </div>
        </div>
      </div>

      {/* Modal 3 */}
      <div
        className="modal fade"
        tabIndex="-1"
        ref={modal3Ref}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen bg-success">
          <div className="modal-content text-light bg-success">
            <div className="modal-header border-0"><button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Zatvori"
              ></button>
            </div>
            <div className="modal-body border-0 d-flex flex-column justify-content-center align-items-center text-center">
              <h2 className="my-3">Bravo za poštenje! Izvoli:
              </h2>
              <div>
                <img src={bambi} alt="Bambi"  className="img-thumbnail col-12 col-md-4 animate__animated animate__tada  "/>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
