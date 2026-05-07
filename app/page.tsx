'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  CalendarIcon, MapPinIcon, ClockIcon, UserIcon, ChevronDownIcon,
  EnvelopeIcon, PhoneIcon, AcademicCapIcon, UserGroupIcon, 
  ChartBarIcon, BookOpenIcon, StarIcon, BriefcaseIcon,
  CpuChipIcon, GlobeAltIcon, RocketLaunchIcon, TrophyIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'about' | 'program' | 'partners'>('about');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '+4 000', label: 'Personnes sensibilisées', icon: <UserGroupIcon className="w-8 h-8 text-yellow-500" /> },
    { value: '+20', label: 'Experts', icon: <StarIcon className="w-8 h-8 text-yellow-500" /> },
    { value: '+15', label: 'Partenaires', icon: <BriefcaseIcon className="w-8 h-8 text-yellow-500" /> },
    { value: '+10', label: 'Formations', icon: <BookOpenIcon className="w-8 h-8 text-yellow-500" /> },
  ];

  const schedule = [
    { time: '09:00 - 10:00', title: 'Cérémonie d\'ouverture', speaker: 'Président du CJP', day: 'Jour 1 - 15 Mai' },
    { time: '10:00 - 12:00', title: 'Panel: Cloud souverain et hébergement local', speaker: 'Experts cybersécurité', day: 'Jour 1 - 15 Mai' },
    { time: '12:00 - 13:00', title: 'Pause déjeuner & Networking', speaker: '-', day: 'Jour 1 - 15 Mai' },
    { time: '13:00 - 16:00', title: 'Ateliers de formation', speaker: 'Formateurs certifiés', day: 'Jour 1 - 15 Mai' },
    { time: '16:00 - 17:00', title: 'Présentation de projets', speaker: 'Étudiants', day: 'Jour 1 - 15 Mai' },
    { time: '09:00 - 11:00', title: 'Panel: Genre, inclusion numérique & IA', speaker: 'Panelistes invités', day: 'Jour 2 - 16 Mai' },
    { time: '11:00 - 13:00', title: 'Ateliers pratiques', speaker: 'Experts', day: 'Jour 2 - 16 Mai' },
    { time: '13:00 - 14:00', title: 'Pause déjeuner & Networking', speaker: '-', day: 'Jour 2 - 16 Mai' },
    { time: '14:00 - 16:00', title: 'Panel: Rôle du numérique dans la construction des alumnis', speaker: 'Experts éducation', day: 'Jour 2 - 16 Mai' },
    { time: '16:00 - 17:00', title: 'Clôture et remise des prix', speaker: 'Comité d\'organisation', day: 'Jour 2 - 16 Mai' },
  ];

  const formationThemes = [
    'Réseaux et Cybersécurité',
    'Intégrations système (Administration des serveurs)',
    'Développement d\'application mobile',
    'Développement d\'application web',
    'Programmation Arduino et Raspberry Pi',
    'Configuration des serveurs sur cloud',
    'Gestion de projet GitHub',
    'Logiciel de collecte et de traitement de données',
    'Marketing digital numérique',
    'Atelier de découverte d\'un Fablab',
  ];

  const partners = [
    { name: 'ANSUTEN', logo: '/img/ansuten.jpeg', category: 'Institutionnel' },
    { name: 'Guinée Dev', logo: '/img/guineedev.jpeg', category: 'Communauté' },
    { name: 'Novtec', logo: '/img/novtec.jpeg', category: 'Tech' },
    { name: 'Aguipe', logo: '/img/Aguipe2.png', category: 'Institutionnel' },
    { name: 'Kumy', logo: '/img/kumy.jpeg', category: 'Startup' },
    { name: 'ETI', logo: '/img/eti.jpeg', category: 'Éducation' },
    { name: 'Santou Lab', logo: '/img/santoulab.jpeg', category: 'Innovation' },
    { name: 'E-Booster', logo: '/img/ebooster.jpeg', category: 'Accélérateur' },
  ];

  const objectives = [
    'Créer une plateforme de partage de connaissances et de sensibilisation aux enjeux de durabilité',
    'Former à l\'esprit d\'entrepreneuriat pour favoriser la création de richesse et l\'auto-emploi',
    'Permettre aux professionnels de partager leurs expériences',
    'Sensibiliser plus de 4 000 personnes autour de l\'entrepreneuriat numérique',
    'Faciliter les échanges d\'idées entre les acteurs du secteur',
    'Promouvoir les meilleures pratiques en matière de durabilité numérique',
    'Fournir des opportunités de formation pour le renforcement des compétences',
    'Encourager la création d\'initiatives entrepreneuriales responsables',
  ];

  return (
    <>
      {/* Navbar fixe */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f2c]/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/img/logo.png" alt="CJP" className="h-10 w-auto" />
            <span className="text-white font-bold text-xl hidden sm:inline">CJP - FODR 2026</span>
          </div>
          <div className="flex gap-3">
            <Link href="/generateur/affiche" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-full transition">
              Générer mon affiche
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f2c] via-[#0e1a3a] to-[#1a1f4a]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              CJP - FODR 2026
              <span className="block text-yellow-500 text-3xl md:text-4xl mt-2">Forum du Développement et Réseaux</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Le plus grand rassemblement technologique de Guinée. Découvrez les technologies émergentes, 
              participez à des formations gratuites et connectez-vous avec des experts.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/hakaton" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-full transition transform hover:scale-105">
                Hackathon
              </Link>  
              <Link href="/panel" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-full transition transform hover:scale-105">
                Panel
              </Link>
              <Link href="/presentation_projet" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-full transition transform hover:scale-105">
                Présentation de projets
              </Link>
              <Link href="/formation" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-full transition transform hover:scale-105">
                Formations
              </Link>
            </div>
          </div>
          
          {/* Date et lieu avec icônes Tailwind */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 text-white">
            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <CalendarIcon className="w-5 h-5 text-yellow-400" />
              <span>15-16 Mai 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <MapPinIcon className="w-5 h-5 text-yellow-400" />
              <span>Université de Labé</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <ClockIcon className="w-5 h-5 text-yellow-400" />
              <span>09h00 - 17h00</span>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-white/50 hover:text-white transition">
            <ChevronDownIcon className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* Section Statistiques */}
      <section id="stats" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="flex justify-center mb-3 transform group-hover:scale-110 transition">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-gray-800">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section À propos du FODR */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800">À propos du FODR</h2>
            <div className="h-1 w-20 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">C'est quoi le FODR ?</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Le <strong className="text-yellow-600">Forum du Développement et des Réseaux (FODR)</strong>, initié par le Club des Jeunes 
                Programmeurs en collaboration avec le Département Informatique, vise à éveiller, informer et inspirer la jeunesse 
                guinéenne quant à l'utilisation des technologies émergentes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Ce projet offre une opportunité unique aux jeunes Guinéens de se familiariser avec les métiers de l'ITC 
                (Technologies de l'Information et de la Communication) tout en approfondissant leurs connaissances dans ce domaine en plein essor.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Contexte et justification</h3>
              <p className="text-gray-600 leading-relaxed">
                Le monde numérique évolue rapidement, et avec lui émergent des préoccupations cruciales telles que la durabilité 
                et l'entrepreneuriat. Ce forum est une réponse à la nécessité croissante de promouvoir des pratiques responsables 
                dans le développement web et les réseaux. En mettant l'accent sur la durabilité et l'entrepreneuriat numérique, 
                nous cherchons à inspirer une nouvelle génération de professionnels conscients des défis environnementaux.
              </p>
            </div>
          </div>

          {/* Objectifs généraux */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Objectifs du forum</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <RocketLaunchIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact attendu */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">RÉSULTAT ATTENDU ET IMPACT</h3>
            <p className="text-black/90 mb-6">
              Le Forum et les ateliers aspirent à doter les étudiants des compétences techniques et des connaissances pratiques nécessaires pour exceller dans le domaine du développement web et des réseaux. L'impact attendu est la création d'une génération de professionnels bien préparés et innovants, prêts à relever les défis de demain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-black/20 px-4 py-2 rounded-full text-black font-semibold">🚀 Booster l'employabilité</span>
              <span className="bg-black/20 px-4 py-2 rounded-full text-black font-semibold">💼 Lutter contre le chômage</span>
              <span className="bg-black/20 px-4 py-2 rounded-full text-black font-semibold">🌍 Lutter contre l'immigration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Programme détaillé - 2 colonnes avec icônes Tailwind */}
      <section id="program" className="py-20 bg-gradient-to-br from-[#0a0f2c] via-[#0e1a3a] to-[#1a1f4a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white">Programme détaillé</h2>
            <div className="h-1 w-20 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-300 mt-4">Découvrez le programme complet des deux jours</p>
          </div>
          
          {/* Programme en 2 colonnes */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Jour 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
              <div className="bg-yellow-500/20 p-4 text-center border-b border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Jour 1 - 15 Mai 2026
                </h3>
              </div>
              <div className="divide-y divide-white/10">
                {schedule.filter(item => item.day === 'Jour 1 - 15 Mai').map((item, idx) => (
                  <div key={idx} className="p-4 hover:bg-white/5 transition">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="bg-yellow-500/20 rounded-lg px-3 py-1 text-center">
                          <p className="text-yellow-400 font-mono text-xs">{item.time.split(' - ')[0]}</p>
                          <p className="text-yellow-400 font-mono text-xs">-</p>
                          <p className="text-yellow-400 font-mono text-xs">{item.time.split(' - ')[1]}</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{item.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <UserIcon className="w-3 h-3 text-gray-400" />
                          <p className="text-gray-400 text-sm">{item.speaker}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Jour 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
              <div className="bg-yellow-500/20 p-4 text-center border-b border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Jour 2 - 16 Mai 2026
                </h3>
              </div>
              <div className="divide-y divide-white/10">
                {schedule.filter(item => item.day === 'Jour 2 - 16 Mai').map((item, idx) => (
                  <div key={idx} className="p-4 hover:bg-white/5 transition">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="bg-yellow-500/20 rounded-lg px-3 py-1 text-center">
                          <p className="text-yellow-400 font-mono text-xs">{item.time.split(' - ')[0]}</p>
                          <p className="text-yellow-400 font-mono text-xs">-</p>
                          <p className="text-yellow-400 font-mono text-xs">{item.time.split(' - ')[1]}</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{item.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <UserIcon className="w-3 h-3 text-gray-400" />
                          <p className="text-gray-400 text-sm">{item.speaker}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thèmes de formation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800">Thèmes de formation</h2>
            <div className="h-1 w-20 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-600 mt-4">Découvrez les domaines de formation proposés</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {formationThemes.map((theme, idx) => (
              <span key={idx} className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-200 transition">
                {theme}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">Prêt à rejoindre l'aventure ?</h2>
          <p className="text-lg text-black/80 mb-8">Créez votre affiche ou générez votre attestation dès maintenant</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/generateur/affiche" className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-3 rounded-full transition transform hover:scale-105">
              Générer mon affiche
            </Link>
            <a href="mailto:contact@club-jp.com" className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-3 rounded-full transition transform hover:scale-105">
              Devenir partenaire →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f2c] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="/img/logo.png" alt="CJP" className="h-12 mb-4" />
              <p className="text-gray-400 text-sm">Club de Jeunes Programmeurs</p>
              <p className="text-gray-500 text-xs mt-2">© 2023–{new Date().getFullYear()} - cjp. Tous droits réservés.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/generateur/affiche" className="hover:text-yellow-400">Générateur d'affiche</Link></li>
                <li><Link href="/generateur/attestation" className="hover:text-yellow-400">Générateur d'attestation</Link></li>
                <li><Link href="/liste" className="hover:text-yellow-400">Participants</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4 text-yellow-400" />
                  <span>contact@club-jp.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-yellow-400" />
                  <span>+224 620 77 29 01 (Labé)</span>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-yellow-400" />
                  <span>+224 622 29 43 67 (Hafia)</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-yellow-400" />
                  <span>Université de Labé</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <div className="flex">
                <input type="email" placeholder="Votre adresse email" className="px-3 py-2 rounded-l-lg text-sm w-full bg-gray-800 text-white border-none focus:outline-none focus:ring-1 focus:ring-yellow-500" />
                <button className="bg-yellow-500 px-4 py-2 rounded-r-lg text-sm font-semibold hover:bg-yellow-400 transition">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
      `}</style>
    </>
  );
}