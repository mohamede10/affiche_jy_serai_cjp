'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Participant } from '@/lib/storage';
import { partners } from '@/lib/partners';

interface AfficheProps {
  participant: Participant;
}

export default function Affiche({ participant }: AfficheProps) {
  const afficheRef = useRef<HTMLDivElement>(null);

  const downloadAffiche = async () => {
    if (!afficheRef.current) return;
    
    try {
      const canvas = await html2canvas(afficheRef.current, {
        scale: 2.5,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `affiche_cjp_${participant.nom}_${participant.code_id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la génération');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Conteneur avec défilement horizontal sur mobile */}
      <div className="w-full overflow-x-auto">
        {/* AFFICHE - Largeur fixe identique sur tous les appareils */}
        <div
          ref={afficheRef}
          className="w-[800px] shadow-2xl overflow-hidden mx-auto"
          style={{ background: 'linear-gradient(45deg, #92d7ff 0%, #fffcfc 50%, #92d7ff 100%)' }}
        >
          {/* En-tête */}
          <div className="p-4">
            <div className="flex justify-center items-center gap-4">
              <img src="/img/logo.png" alt="cjp" className="w-28 rounded-xl" />
              <div className="text-center">
                <p className="text-black text-2xl font-black">FORUM DU DÉVELOPPEMENT WEB <br /> ET RÉSEAUX</p>
                <p>Panel, Formations, Hackathon et Présentation de projets</p>
                <span className="text-yellow-500 text-2xl font-bold">4ÈME ÉDITION</span>
              </div>
              <img src="/img/Logo_univ_labe.png" alt="Logo" className="w-48 rounded-xl" />
            </div>
          </div>
          
          <hr className="border-t border-gray-300" />
          
          {/* Contenu principal */}
          <div className="p-8">
            <div className="flex flex-col items-center">
              <div className="flex items-end justify-center gap-6">
                {/* Photo */}
                <div className="ml-10">
                  <div className="w-80 h-80 overflow-hidden shadow-2xl relative" style={{ border: '1px solid #bfdbfe' }}>
                    <div
                      className="w-full h-full bg-center bg-cover"
                      style={{ backgroundImage: `url('${participant.photo_base64}')` }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-full h-[70px]"
                      style={{
                        background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.05) 40%, transparent 100%)',
                        backdropFilter: 'blur(2px)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>
                
                {/* Badge J'Y SERAI */}
                <div className="relative px-8 -top-20 py-6 text-center min-w-[180px] ml-20 mb-20">
                  <div className="absolute top-12 -left-4 text-4xl animate-pulse">✨</div>
                  <div className="text-yellow-500 font-black text-5xl leading-tight tracking-tighter">J'Y<br />SERAI !</div>
                </div>
              </div>
              
              {/* Nom et informations */}
              <div className="flex items-center justify-between gap-6 mt-8 ml-10">
                <div className="text-left relative -ml-15 w-64 flex-shrink-0">
                  <div className="w-full">
                    <h6 className="text-2xl text-center font-black text-gray-800 break-words">
                      {participant.nom.toUpperCase()}
                    </h6>
                    
                    {/* Poste pour Paneliste */}
                    {participant.statut === 'Paneliste' && participant.poste_paneliste && (
                      <div className="flex justify-center mt-1">
                        <p className="text-base font-semibold text-gray-600 text-center">
                          {participant.poste_paneliste}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-center">
                      <p className="font-black mt-2 text-black p-2 inline-block text-center">
                        {participant.fonction_affiche}
                      </p>
                    </div>
                    
                    <svg className="absolute -bottom-6 left-0 w-full h-10" viewBox="0 0 400 40" fill="none">
                      <path
                        d="M 20 10 Q 200 35, 380 10"
                        stroke="#000000"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Ligne courbe */}
                <div className="absolute left-1/2 transform -translate-x-1/2" style={{ marginLeft: 350, marginBottom: 250 }}>
                  <svg width="60" height="180" viewBox="0 0 60 180" fill="none">
                    <path
                      d="M 10 10 C 40 60, 40 120, 10 170"
                      stroke="#000000"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="10" cy="10" r="10" fill="#000000" />
                  </svg>
                </div>
                
                {/* Date */}
                <div className="-mt-40 ml-20 w-full flex justify-center">
                  <div className="px-6 py-3 rounded-xl inline-block">
                    <div className="text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="font-semibold text-black">Vendredi et Samedi</span>
                        <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center shadow-md">
                          <span className="text-2xl font-black text-white leading-tight text-center">15<br />16</span>
                        </div>
                        <span className="font-semibold text-black">MAI 2026</span>
                      </div>
                      <span className="font-semibold text-black mt-3 flex items-center justify-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Université de Labé
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Partenaires */}
            <br />
            <div className="flex justify-between items-center border-b border-yellow-400 pb-1 mb-3">
              <p className="text-xl font-bold text-black uppercase tracking-wider">Nos partenaires</p>
            </div>
            
            {/* Logos partenaires */}
            <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
              {partners.map((partner) => (
                <img
                  key={partner.id}
                  src={partner.logo}
                  alt={partner.name}
                  className="w-20 rounded-xl p-2 hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 text-center" style={{ 
            background: 'linear-gradient(45deg, #92d7ff 0%, #92d7ff 50%, #ffffff 100%)' 
          }}>
            <div className="flex justify-between items-center">
              <div className="text-left">
                <p className="text-black text-2xl">www.club-jp.com</p>
              </div>
              <p className="font-black text-yellow-500 text-4xl text-center">CJP-FODR-2026</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Boutons */}
      <div className="mt-8 flex gap-4">
        <button onClick={downloadAffiche} className="bg-yellow-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-black transition">
          ⬇️ TÉLÉCHARGER L'AFFICHE
        </button>
        <button className="bg-black text-white font-bold px-8 py-3 rounded-xl hover:bg-yellow-600 transition">
          <a href="/">← Retour</a>
        </button>
      </div>
    </div>
  );
}