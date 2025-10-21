import { useRef,useEffect,useState } from "react";
import UserForm from './UserForm';
import bambi from './assets/bambi.jpeg'
import { useTranslation } from 'react-i18next';
export default function App() {
  const modalRef = useRef(null);
  const modal2Ref = useRef(null);
  const modal3Ref = useRef(null);
  const { t } = useTranslation();
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

  return (
    <div className='container'>
      <button className='btn border-0 text-light btn-lg text-decoration-underline m-0 p-0' onClick={openModal}>
        {t('assignTeam')}
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
              <h3 className="mb-4 text-info">{t('showMessage1')}</h3>
              <h5 className="fs-4 mb-5 mt-4">{t('showMessage2')}</h5> 
              <div className='row justify-content-center align-items-cente'>
                <button
                  className="btn btn-outline-success p-4 col-5 me-4"
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={handleYesClick}
                >
                  {t('messageResponseYes')}
                </button>
                <button
                  className="btn btn-outline-danger p-4 col-5 "
                  data-bs-dismiss="modal"
                  onClick={handleNoClick}
                >
                  {t('messageResponseNo')}
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
              <h2 className="mb-4">{t('goodLuckMessage')}</h2>
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
              <h2 className="my-3">{t('photoMessage')}
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
