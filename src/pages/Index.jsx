import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Index.css?v=3.5';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n';
import { useTranslation } from 'react-i18next';
import Carousel from '../components/carousel';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const [isFirstMap, setIsFirstMap] = useState(true);
  const { t, i18n } = useTranslation();
  

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }

    // Simulación de obtener coordenadas
    fetch('https://790cebce69f947b6e00a5ba226c8389a.loophole.site/api/lugares/buscar/?nombre=mapa_folleteria')
      .then((response) => response.json())
      .then((data) => {
        setLat(data.latitud || -35.699248); // Coordenadas de ejemplo
        setLng(data.longitud || -71.4146915);
      })
      .catch((error) => console.error('Error fetching location data:', error));
  }, [i18n]);

  const toggleVideoPlay = () => {
    if (isPlaying) {
      videoRef.current.src = videoRef.current.src.replace("autoplay=1", "autoplay=0");
    } else {
      videoRef.current.src = videoRef.current.src.replace("autoplay=0", "autoplay=1");
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMap = () => {
    setIsFirstMap(!isFirstMap);
  };

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header />
      {/* Hero Section */}
      <div className="hero2">
      <iframe
        ref={videoRef}
        width="560"
        height="315"
        src="https://www.youtube.com/embed/7l3B_AjYnhI?autoplay=1&mute=1&loop=1&playlist=7l3B_AjYnhI&vq=hd1080"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
        <div className="hero-content2">
          <h1>{t('ColbunTitle')}</h1>
          <h2>{t('SubtitleMessage')}</h2>
          <br></br>
          <br></br>
          <a href="https://www.youtube.com/watch?v=7l3B_AjYnhI&list=TLGGPI4M4bKt7X4xMDEyMjAyNA&t=3s" target="colbun" rel="municipalidad_Colbun">
            <button className="btn-blue">
              {t('WatchNow')}
              <img src="/assets/img/verahora_icon.png" alt="icono de reproducción" className="button-icon" />
            </button>
          </a>
        </div>
        <button className="play-button" onClick={toggleVideoPlay}>
          {isPlaying ? <i className="bi bi-pause"></i> : <i className="bi bi-play"></i>}
        </button>
      </div>

      <Carousel/>

      <section className="community-section1">
        <div className="community-content1">
          <h1>{t('ComeCloser')}<br />{t('OurCommunity')}</h1>
          <p>{t('ColbunServiceCountry')}</p>
          <a href="https://linktr.ee/serviciopaiscolbun" target="colbun" rel="municipalidad_Colbun">
            <button className="btn-blue">{t('Collaboration')}</button>
          </a>
        </div>
      </section>

      <div className="info-section1">
        {/* Map Section */}
        <section className="map-section">
          <iframe
            src={
              isFirstMap
                ? "https://www.google.com/maps/d/embed?mid=1p6ZeFia-PILCBaTmJbeDvMfmEy6ZwRUx&ehbc=2E312F"
                : "https://www.google.com/maps/embed?pb=!4v1729508776865!6m8!1m7!1sCAoSLEFGMVFpcE52eG9fOUs1ZkRac2VzYnNNQ3hsYnBpOWFOdnJpcUFUU0VSazhv!2m2!1d-35.87360339666832!2d-71.11635919023739!3f166.054998459084!4f12.54037435121353!5f0.7820865974627469"
            }
            width="100%"
            height="1200"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </section>

        {/* Existing Content Section */}
        <section className="info-content">
          <h5>{t('UnforgettablePlaces')}</h5>
          <h1>{t('Remember')}</h1>
          <br></br>
          <p>{t('ColbunBeauty')}</p>
          <br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://maps.app.goo.gl/GZSD4dNAL8uKZx1N6", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMap}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>
      <SocialSection/>
      <Footer/>
    </div>
  );
};

export default Index;