// src/pages/Home/Home.jsx - Page d'accueil avec menu principal
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import './Home.scss';
import bannerImage from '../assets/banner-statistics.png';

const Home = () => {
  const menuItems = [
    {
      title: 'Gestion des prix d\'achat catalogue',
      description: 'Gérer les prix d\'achat des prestations et calculer les marges',
      link: '/pricing',
      icon: 'pi pi-shopping-cart',
      color: 'bg-cer-red hover:bg-orange-700'
    },
    {
      title: 'Interface Marge des affaires CERALIS',
      description: 'Analyser les marges des affaires vendues et importer depuis Kinexo',
      link: '/analysis',
      icon: 'pi pi-chart-line',
      color: 'bg-cer-yellow hover:bg-amber-600'
    },
    // {
    //   title: 'Pilotage des marges par vendeur',
    //   description: 'Tableaux de bord et exports pour le pilotage des marges',
    //   link: '/reports',
    //   icon: 'pi pi-chart-bar',
    //   color: 'bg-cer-blue hover:bg-teal-700'
    // }
  ];

  return (
    <>
      <Header />
      
      <div className="home-page min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            
            {/* Bandeau image avec overlay */}
            <div className="banner-container relative mb-8 rounded-lg overflow-hidden shadow-lg">
              
              {/* Option 1: Image réelle */}
              <img 
                src={bannerImage}
                alt="Analyse statistiques" 
                className="w-full h-80 object-cover"
              />
              
              {/* Option 2: Bandeau avec dégradé et icônes */}
              {/*<div className="banner-gradient relative bg-gradient-to-r from-cer-blue via-cer-blue to-teal-600 h-64 flex items-center justify-center overflow-hidden">
                
                {/* Grille de fond pour effet "feuille de calcul" */}
                {/*<div className="banner-grid absolute inset-0 opacity-10"></div>
                
                {/* Icônes flottantes décoratives */}
                {/*<div className="banner-icons">
                  <i className="pi pi-chart-bar banner-icon icon-top-left"></i>
                  <i className="pi pi-calculator banner-icon icon-top-right"></i>
                  <i className="pi pi-chart-line banner-icon icon-bottom-left"></i>
                  <i className="pi pi-percentage banner-icon icon-bottom-right"></i>
                  <i className="pi pi-table banner-icon icon-center-left"></i>
                  <i className="pi pi-money-bill banner-icon icon-center-right"></i>
                </div>
                
                {/* Contenu central */}
                {/*<div className="banner-content relative z-10 text-center text-white px-8">
                  <div className="mb-4">
                    <i className="pi pi-chart-pie text-6xl mb-4 opacity-80 animate-pulse"></i>
                  </div>
                  <h1 className="text-2xl font-bold mb-2 opacity-90">
                    Analyse & Pilotage
                  </h1>
                  <p className="text-lg opacity-75">
                    Optimisez vos marges avec des données précises
                  </p>
                </div>
                
                <div className="banner-overlay absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>*/}
            </div>

            {/* Titre principal */}
            <h1 className="main-title text-3xl md:text-4xl font-extrabold text-cer-gray mb-2">
                  Analyse & Pilotage
            </h1>
            <p className="text-lg opacity-75">
              Gestion des prix d'achat et pilotage des marges
            </p> 
          </div>

          {/* Grille des modules principaux */}
          <div className="modules-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="module-card group"
              >
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                  <div className={`module-header ${item.color} text-white p-6 text-center transition-all duration-300`}>
                    <i className={`${item.icon} text-4xl mb-4 block transition-transform duration-300 group-hover:scale-110`}></i>
                    <h3 className="text-xl font-bold mb-2 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="module-content p-6">
                    <p className="text-gray-600 text-center leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;