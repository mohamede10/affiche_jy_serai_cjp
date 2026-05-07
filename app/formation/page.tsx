'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CalendarIcon, MapPinIcon, ClockIcon, AcademicCapIcon, 
  UserGroupIcon, BookOpenIcon, CheckCircleIcon, XMarkIcon,
  InformationCircleIcon, DocumentTextIcon, PencilSquareIcon
} from '@heroicons/react/24/outline';

interface Formation {
  id: number;
  titre: string;
  description: string;
  duree: string;
  date_debut: string;
  date_fin: string;
  lieu: string;
  formateur: {
    nom: string;
    titre: string;
    photo: string;
    bio: string;
  };
  places: number;
  prerequis: string[];
  programme: string[];
  image?: string;
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé';
  categorie: string;
}

export default function FormationsPage() {
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [inscriptionNom, setInscriptionNom] = useState('');
  const [inscriptionEmail, setInscriptionEmail] = useState('');
  const [inscriptionSuccess, setInscriptionSuccess] = useState(false);

  const formations: Formation[] = [
    {
      id: 1,
      titre: "L'intégration de l'IA dans les pratiques pédagogiques",
      description: "Cette formation explore comment intégrer efficacement l'intelligence artificielle dans les pratiques pédagogiques afin d'améliorer l'apprentissage et l'engagement des étudiants.",
      duree: '2 jours',
      date_debut: '2026-05-15',
      date_fin: '2026-05-16',
      lieu: 'Université de Labé',
      formateur: {
        nom: 'Alimou DIALLO',
        titre: 'Formateur certifié et expert technique',
        photo: '/img/formateurs/alimou.jpg',
        bio: 'Formateur certifié et expert technique en Data Science, Intelligence Artificielle, DevOps et automatisation'
      },
      places: 25,
      prerequis: ['Connaissances de base en informatique', 'Aucune expérience en IA requise'],
      programme: [
        'Introduction à l\'IA dans l\'éducation',
        'Outils IA pour la création de contenu pédagogique',
        'Personnalisation de l\'apprentissage avec l\'IA',
        'Éthique et responsabilité dans l\'usage de l\'IA',
        'Atelier pratique : Création d\'un assistant pédagogique'
      ],
      niveau: 'Intermédiaire',
      categorie: 'IA & Éducation'
    },
    {
      id: 2,
      titre: 'Développement Web Full Stack',
      description: 'Maîtrisez les technologies modernes du développement web : front-end et back-end.',
      duree: '3 jours',
      date_debut: '2026-05-15',
      date_fin: '2026-05-17',
      lieu: 'Université de Labé - Salle B',
      formateur: {
        nom: 'Mamadou Saliou Diallo',
        titre: 'Expert Full Stack Developer',
        photo: '/img/formateurs/msdiallo.jpg',
        bio: 'Expert Full Stack Developer avec plus de 8 ans d\'expérience dans le développement d\'applications web et mobile.'
      },
      places: 20,
      prerequis: ['Bases HTML/CSS/JavaScript'],
      programme: [
        'React.js avancé',
        'Node.js et Express',
        'Base de données MongoDB',
        'Déploiement sur cloud'
      ],
      niveau: 'Intermédiaire',
      categorie: 'Développement Web'
    },
    {
      id: 3,
      titre: 'Cybersécurité et Protection des données',
      description: 'Apprenez à sécuriser vos systèmes et à protéger les données sensibles.',
      duree: '2 jours',
      date_debut: '2026-05-15',
      date_fin: '2026-05-16',
      lieu: 'Université de Labé - Salle C',
      formateur: {
        nom: 'Ibrahima Baldé',
        titre: 'Expert en Cybersécurité',
        photo: '/img/formateurs/ibrahima.jpg',
        bio: 'Expert en cybersécurité certifié CISSP, spécialisé dans la sécurité des réseaux et la protection des données.'
      },
      places: 15,
      prerequis: ['Connaissances de base en informatique'],
      programme: [
        'Fondamentaux de la cybersécurité',
        'Sécurité des réseaux',
        'Cryptographie',
        'RGPD et protection des données'
      ],
      niveau: 'Débutant',
      categorie: 'Cybersécurité'
    }
  ];

  const handleVoirDetails = (formation: Formation) => {
    setSelectedFormation(formation);
    setShowModal(true);
  };

  const submitInscription = () => {
    if (inscriptionNom && inscriptionEmail) {
      setInscriptionSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setInscriptionNom('');
        setInscriptionEmail('');
        setInscriptionSuccess(false);
      }, 2000);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getNiveauColor = (niveau: string) => {
    switch (niveau) {
      case 'Débutant': return 'bg-green-100 text-green-700';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-700';
      case 'Avancé': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#0e1a3a] to-[#1a1f4a]">
      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/img/logo.png" alt="CJP" className="h-10 w-auto" />
            <span className="text-white font-bold text-xl hidden sm:inline">CJP - FODR 2026</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="text-white hover:text-yellow-400 transition">Accueil</Link>
            <Link href="/formations" className="text-yellow-400 font-semibold">Formations</Link>
            <Link href="/generateur/affiche" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full text-sm font-semibold transition">
              Générer mon affiche j'y serai
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Nos Formations au FODR 2026
          </h1>
          <p className="text-xl text-gray-300">
            Des formations gratuites et certifiantes animées par des experts
          </p>
          <div className="h-1 w-24 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
        </div>
      </section>

      {/* Grille des formations */}
      <section className="py-8 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {formations.map((formation) => (
              <div key={formation.id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* En-tête */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-5">
                  <h3 className="text-2xl font-bold text-white">{formation.titre}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-white/90 text-sm">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{formatDate(formation.date_debut)} au {formatDate(formation.date_fin)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{formation.lieu}</span>
                    </div>
                  </div>
                </div>
                
                {/* Corps */}
                <div className="p-6">
                  {/* Formateur */}
                  <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                      {formation.formateur.nom.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{formation.formateur.nom}</h4>
                      <p className="text-gray-500 text-sm">{formation.formateur.titre}</p>
                    </div>
                  </div>
                  
                  {/* Résumé */}
                  <div className="mb-5">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-1">
                      <DocumentTextIcon className="w-4 h-4 text-yellow-500" />
                      Résumé de la formation
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {formation.description}
                    </p>
                  </div>
                  
                  {/* Infos complémentaires */}
                  <div className="flex flex-wrap gap-4 mb-5 text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <ClockIcon className="w-4 h-4" />
                      <span>{formation.duree}</span>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${getNiveauColor(formation.niveau)}`}>
                      <AcademicCapIcon className="w-3 h-3" />
                      <span className="text-xs">{formation.niveau}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <UserGroupIcon className="w-4 h-4" />
                      <span>{formation.places} places</span>
                    </div>
                  </div>
                  
                  {/* Boutons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleVoirDetails(formation)}
                      className="flex-1 border border-yellow-500 text-yellow-600 font-semibold py-2.5 rounded-xl hover:bg-yellow-50 transition flex items-center justify-center gap-2"
                    >
                      <InformationCircleIcon className="w-4 h-4" />
                      En savoir plus
                    </button>
                    <button
                      onClick={() => handleVoirDetails(formation)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                      S'inscrire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Détails */}
      {showModal && selectedFormation && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedFormation.titre}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-white/80 text-sm mt-1">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{formatDate(selectedFormation.date_debut)} au {formatDate(selectedFormation.date_fin)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{selectedFormation.lieu}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="text-white hover:bg-white/20 p-2 rounded-full transition">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {!inscriptionSuccess ? (
                <>
                  {/* Formateur */}
                  <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
                      {selectedFormation.formateur.nom.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-xl">{selectedFormation.formateur.nom}</h3>
                      <p className="text-gray-500">{selectedFormation.formateur.titre}</p>
                      <p className="text-gray-600 text-sm mt-1">{selectedFormation.formateur.bio}</p>
                    </div>
                  </div>
                  
                  {/* Description détaillée */}
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                      <DocumentTextIcon className="w-5 h-5 text-yellow-500" />
                      Description détaillée
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedFormation.description}
                    </p>
                  </div>
                  
                  {/* Programme */}
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                      <BookOpenIcon className="w-5 h-5 text-yellow-500" />
                      Programme de la formation
                    </h3>
                    <ul className="space-y-2">
                      {selectedFormation.programme.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <span className="text-yellow-500">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Prérequis */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                      Prérequis
                    </h3>
                    <ul className="space-y-1">
                      {selectedFormation.prerequis.map((p, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-center gap-1">
                          <CheckCircleIcon className="w-3 h-3 text-green-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Formulaire d'inscription */}
                  <div className="border-t pt-5">
                    <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                      <PencilSquareIcon className="w-5 h-5 text-yellow-500" />
                      Formulaire d'inscription
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Nom complet"
                        value={inscriptionNom}
                        onChange={(e) => setInscriptionNom(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={inscriptionEmail}
                        onChange={(e) => setInscriptionEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500"
                      />
                      <button
                        onClick={submitInscription}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                      >
                        <CheckCircleIcon className="w-5 h-5" />
                        Confirmer mon inscription
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircleIcon className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Inscription confirmée !</h3>
                  <p className="text-gray-600">
                    Vous recevrez un email de confirmation avec tous les détails.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}