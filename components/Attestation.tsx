'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import type { Attestation } from '@/lib/attestation-storage';

interface AttestationProps {
  attestation: Attestation;
}

export default function AttestationComponent({ attestation }: AttestationProps) {
  const attestationRef = useRef<HTMLDivElement>(null);

  const downloadAttestation = async () => {
    if (!attestationRef.current) return;
    
    try {
      const canvas = await html2canvas(attestationRef.current, {
        scale: 2.5,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `attestation_remerciement_${attestation.prenom}_${attestation.nom}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la génération');
    }
  };

  const getContributionText = () => {
    switch (attestation.statut) {
      case 'Participant':
        return 'pour sa participation active à la 4ème édition du Forum du Développement et Réseaux (FODR)';
      case 'Formateur':
        return `pour avoir animé la formation "${attestation.titre_formation}" avec professionnalisme et dévouement`;
      case 'Paneliste':
        return `pour son intervention enrichissante en tant que Paneliste sur le thème "${attestation.theme_panel}"`;
      case 'Partenaire':
        return 'pour son soutien précieux et sa collaboration en tant que Partenaire officiel';
      default:
        return 'pour sa contribution à l\'événement';
    }
  };

  const getBadgeColor = () => {
    switch (attestation.statut) {
      case 'Participant': return 'border-blue-700 bg-blue-100';
      case 'Formateur': return 'border-green-600 bg-green-100';
      case 'Paneliste': return 'border-purple-600 bg-purple-100';
      case 'Partenaire': return 'border-yellow-500 bg-yellow-100';
      default: return 'border-gray-400 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="sm:hidden text-center text-xs text-gray-400 mb-2">
        ← Glissez horizontalement pour voir l'attestation →
      </div>
      
      <div className="w-full overflow-x-auto">
        <div
          ref={attestationRef}
          className="w-[800px] shadow-2xl overflow-hidden mx-auto"
          style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}
        >
          {/* Bandeau doré haut */}
          <div className="h-2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600"></div>
          
          {/* En-tête */}
          <div className="p-6 border-b border-yellow-300 bg-white/50">
                <div className="flex items-center justify-between">
                    <div className="flex-1 text-left">
                    <img src="/img/logo.png" alt="cjp" className="h-24 w-auto object-contain" />
                    </div>
                    <div className="flex-1 text-center">
                    <h1 className="text-3xl font-black text-gray-800">CJP - FODR 2026</h1> <p className="text-yellow-600 text-xs font-semibold">4ème Édition</p>
                    <p className="text-black text-sm">Forum du Développement et Réseaux</p>
                    <p className="text-center text-black text-xs mt-3">15-16 Mai 2026 • Université de Labé</p>
                    </div>
                    <div className="flex-1 text-right">
                    <img src="/img/Logo_univ_labe.png" alt="Université" className="h-16 w-auto object-contain ml-auto opacity-80" />
                    </div>
                </div>                
            </div>          
          {/* Corps */}
          <div className="p-8 bg-white/80">
            <div className="text-center mb-6">
              <div className="inline-block border-b-4 border-yellow-500 pb-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  ATTESTATION DE REMERCIEMENT
                </h2>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-gray-700">
                Le Club de Jeunes Programmeurs (CJP) adresse ses sincères remerciements à
              </p>
              
              <div className={`py-4 px-6 rounded-xl ${getBadgeColor()} border-l-4 shadow-md`}>
                {attestation.photo_base64 && (
                    <div className="text-center">
                    <div className="w-24 h-24 rounded overflow-hidden mx-auto bg-white">
                        <img src={attestation.photo_base64} alt="Photo" className="w-full h-full object-cover" />
                    </div>
                    </div>
                )}
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl"></span>
                  <p className="text-2xl font-bold text-gray-800">
                    {attestation.prenom.toUpperCase()} {attestation.nom.toUpperCase()}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700">
                <strong>{getContributionText()}</strong>
              </p>
              
              {attestation.statut === 'Paneliste' && attestation.poste_paneliste && (
                <p className="text-gray-500 text-sm italic">{attestation.poste_paneliste}</p>
              )}
              
              <div className="mt-6 p-4 rounded-lg">
                <p className="text-gray-700 italic">
                  "Votre engagement et votre confiance ont grandement contribué au succès de cet événement. 
                  Nous espérons pouvoir compter sur votre participation pour les prochaines éditions."
                </p>
              </div>
            </div>
            
            {/* Signature */}
            <div className="flex justify-between items-end mt-8 pt-4 border-t border-gray-200">              
              <div className="text-right flex-1">
                  {/* Signature  <div className="w-32 h-16 border-b-2 border-gray-300 mx-auto"></div>*/} 
                  <br /> <br />
                <p className="text-sm font-semibold text-gray-700 mt-1">Le Président du CJP</p>
                <p className="text-xs text-gray-400">M. Salif SOUMAH</p>
              </div>
            </div>
            
            {/* Date de création attestation */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-800 mt-2">
                Délivrée le {new Date(attestation.date_creation).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-800 py-3 px-6 text-center">
            <p className="text-gray-400 text-xs">www.club-jp.com • contact@club-jp.com</p>
          </div>
          
          {/* Bandeau doré bas */}
          <div className="h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600"></div>
        </div>
      </div>
      
      {/* Boutons */}
      <div className="mt-6 flex gap-3 flex-wrap justify-center">
        <button onClick={downloadAttestation} className="bg-yellow-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-black transition">
          ⬇️ TÉLÉCHARGER (PNG)
        </button>
        <a href="/" className="bg-black text-white font-bold px-6 py-2 rounded-xl hover:bg-yellow-600 transition text-center">
          ← ACCUEIL
        </a>
      </div>
    </div>
  );
}