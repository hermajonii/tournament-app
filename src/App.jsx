import './App.css'
import './i18n';
import Navbar from './Navbar'
import Teams from './Teams'
import Footer from './Footer'
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("title");
  }, [i18n.language, t]); // kad se promeni jezik -> setuj title

  return (
    <>
     <div className='container-fluid bg-light p-0 m-0'>
      <Navbar/>
      <Teams/>
      <Footer />
     </div>
    </>
  )
}

export default App
