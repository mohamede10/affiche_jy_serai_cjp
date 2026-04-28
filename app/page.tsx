'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getNextCodeId, countAffichesByNom, saveParticipant } from '@/lib/storage';

// Fonction pour compresser et redimensionner l'image
async function compressAndResizeImage(file: File, maxWidth = 500, maxHeight = 500): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();  // Utiliser window.Image au lieu de new Image()
      img.onload = () => {
        // Créer un canvas pour redimensionner
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculer le ratio pour remplir le cadre (priorité haut)
        const ratio = Math.max(maxWidth / width, maxHeight / height);
        const newWidth = Math.round(width * ratio);
        const newHeight = Math.round(height * ratio);
        
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Cannot get canvas context');
        
        // Fond blanc
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, maxWidth, maxHeight);
        
        // Calculer les positions (centré horizontalement, collé en haut)
        const x = (maxWidth - newWidth) / 2;
        const y = 0;
        
        // Dessiner l'image redimensionnée
        ctx.drawImage(img, x, y, newWidth, newHeight);
        
        // Convertir en base64 avec compression
        const quality = 0.75;
        const base64 = canvas.toDataURL('image/jpeg', quality);
        resolve(base64);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function HomePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: '',
    statut: 'Participant',
    titre_formation: '',
    theme_panel: '',
    poste_paneliste: '',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validation
    if (!formData.nom) {
      setError('Le nom est obligatoire');
      setLoading(false);
      return;
    }

    if (!photoFile) {
      setError('Veuillez sélectionner une photo');
      setLoading(false);
      return;
    }

    if (formData.statut === 'Formateur' && !formData.titre_formation) {
      setError('Veuillez saisir le titre de la formation');
      setLoading(false);
      return;
    }

    if (formData.statut === 'Paneliste') {
      if (!formData.theme_panel) {
        setError('Veuillez sélectionner un thème');
        setLoading(false);
        return;
      }
      if (!formData.poste_paneliste) {
        setError('Veuillez saisir votre poste/service');
        setLoading(false);
        return;
      }
    }

    // Vérifier la limite (max 2 affiches par nom)
    const count = countAffichesByNom(formData.nom);
    if (count >= 2) {
      setModalMessage(`${formData.nom}, vous avez déjà créé ${count} affiche(s). La limite est de 2 affiches maximum par personne.`);
      setShowModal(true);
      setLoading(false);
      return;
    }

    try {
      // Compresser l'image
      const photo_base64 = await compressAndResizeImage(photoFile);
      
      // Déterminer le texte à afficher
      let fonction_affiche = formData.statut;
      if (formData.statut === 'Formateur') {
        fonction_affiche = `Formateur - Formation : ${formData.titre_formation}`;
      } else if (formData.statut === 'Paneliste') {
        const theme_clean = formData.theme_panel.replace(/^\d{1,2} MAI - /, '');
        fonction_affiche = `Paneliste - Thème : ${theme_clean}`;
      }
      
      // Générer l'ID
      const code_id = getNextCodeId();
      const uniqueId = Date.now().toString();
      
      // Sauvegarder
      const participant = {
        id: uniqueId,
        nom: formData.nom,
        statut: formData.statut as any,
        titre_formation: formData.titre_formation,
        theme_panel: formData.theme_panel,
        poste_paneliste: formData.poste_paneliste,
        photo_base64,
        fonction_affiche,
        code_id,
        date_inscription: new Date().toISOString(),
      };
      
      saveParticipant(participant);
      
      // Rediriger vers l'affiche
      router.push(`/affiche/${uniqueId}`);
    } catch (err) {
      setError('Erreur lors du traitement de l\'image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const themeOptions = [
    { value: 'Cloud souverain et hébergement local enjeux et opportunités', label: '15 MAI - Cloud souverain et hébergement local' },
    { value: 'Genre et inclusion numérique impact de l\'IA dans la transformation de l\'emploi', label: '16 MAI - Genre et inclusion numérique & IA' },
    { value: 'Rôle du numérique dans la construction des alumnis au développement et l\'innovation dans les institutions', label: '16 MAI - Rôle du numérique dans la construction des alumnis' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#0e1a3a] to-[#1a1f4a] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-white p-6 text-center border-b">
          <h1 className="text-4xl font-black text-black">CJP #FODR 2026</h1>
          <p className="text-gray-500 mt-1">Forum du Développement et Réseaux - 4ème Édition</p>
        </div>
        <div className="text-center text-xs text-gray-500 pt-4">
          Du 15 au 16 Mai 2026 — Université de Labé, De 09h à 17h<br />
          Organisé par le Club de Jeunes Programmeurs (CJP)
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet *</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#008878] focus:outline-none transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Statut *</label>
            <select
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#008878] focus:outline-none transition"
            >
              <option value="Participant">Participant</option>
              <option value="Formateur">Formateur</option>
              <option value="Paneliste">Paneliste</option>
              <option value="Partenaire">Partenaire</option>
            </select>
          </div>
          
          {formData.statut === 'Formateur' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Titre de la formation *</label>
              <input
                type="text"
                name="titre_formation"
                value={formData.titre_formation}
                onChange={handleChange}
                placeholder="Ex: Introduction à l'IA"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#008878] focus:outline-none transition"
              />
            </div>
          )}
          
          {formData.statut === 'Paneliste' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Thème du panel *</label>
                <select
                  name="theme_panel"
                  value={formData.theme_panel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#008878] focus:outline-none transition"
                >
                  <option value="">Sélectionnez un thème</option>
                  {themeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Poste / Service *</label>
                <input
                  type="text"
                  name="poste_paneliste"
                  value={formData.poste_paneliste}
                  onChange={handleChange}
                  placeholder="Ex: Directeur IT, Consultant, Expert Cybersécurité"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#008878] focus:outline-none transition"
                />
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Photo de profil *</label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handlePhotoChange}
              required
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer"
            />
            {photoPreview && (
              <div className="mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoPreview} alt="Aperçu" className="w-20 h-20 object-cover rounded-lg" />
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Format JPG/PNG (max 2MB)</p>
          </div>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center text-sm">
              ❌ {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 text-white font-bold py-4 rounded-xl hover:bg-black transition disabled:opacity-50"
          >
            {loading ? '⏳ GÉNÉRATION...' : '✨ GÉNÉRER MON AFFICHE "J\'Y SERAI A LABE"'}
          </button>
          
          <button type="button" className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-yellow-600 transition">
            <a href="https://www.club-jp.com/" className="text-white no-underline">FERMER</a>
          </button>
        </form>
      </div>
      
      {/* Modal de limite */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-8 max-w-md w-full text-center border border-white/10">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-red-500 mb-4">Limite atteinte !</h2>
            <p className="text-gray-300 mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              ← Retour au formulaire
            </button>
          </div>
        </div>
      )}
    </div>
  );
}