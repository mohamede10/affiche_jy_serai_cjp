'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getNextAttestationCode, saveAttestation } from '@/lib/attestation-storage';

async function compressImage(file: File, maxWidth = 150, maxHeight = 150): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        const newWidth = Math.round(width * ratio);
        const newHeight = Math.round(height * ratio);
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Cannot get canvas context');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, newWidth, newHeight);
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        resolve(base64);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AttestationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    statut: 'Participant',
    titre_formation: '',
    theme_panel: '',
    poste_paneliste: '',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    if (!formData.nom || !formData.prenom) {
      setError('Nom et prénom sont obligatoires');
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

    try {
      const photo_base64 = await compressImage(photoFile);
      const code_attestation = getNextAttestationCode();
      const uniqueId = Date.now().toString();

      const attestation = {
        id: uniqueId,
        nom: formData.nom,
        prenom: formData.prenom,
        statut: formData.statut as any,
        titre_formation: formData.titre_formation,
        theme_panel: formData.theme_panel,
        poste_paneliste: formData.poste_paneliste,
        photo_base64,
        code_attestation,
        date_creation: new Date().toISOString(),
      };

      saveAttestation(attestation);
      router.push(`/attestation/${uniqueId}`);
    } catch (err) {
      setError('Erreur lors du traitement de l\'image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const themeOptions = [
    { value: 'Cloud souverain et hébergement local', label: '15 MAI - Cloud souverain et hébergement local' },
    { value: 'Genre et inclusion numérique & IA', label: '16 MAI - Genre et inclusion numérique & IA' },
    { value: 'Rôle du numérique dans la construction des alumnis', label: '16 MAI - Rôle du numérique dans la construction des alumnis' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#0e1a3a] to-[#1a1f4a] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-white p-6 text-center border-b">
          <img src="/img/logo.png" alt="cjp" className="w-24 mx-auto mb-2" />
          <h1 className="text-3xl font-black text-black">CJP #FODR 2026</h1>
          <p className="text-gray-500">Générateur d'attestation de participation</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
              <input type="text" name="nom" value={formData.nom} onChange={handleChange} required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom *</label>
              <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Statut *</label>
            <select name="statut" value={formData.statut} onChange={handleChange} required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none">
              <option value="Participant">Participant</option>
              <option value="Formateur">Formateur</option>
              <option value="Paneliste">Paneliste</option>
              <option value="Partenaire">Partenaire</option>
            </select>
          </div>
          
          {formData.statut === 'Formateur' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Titre de la formation *</label>
              <input type="text" name="titre_formation" value={formData.titre_formation} onChange={handleChange}
                placeholder="Ex: Introduction à l'IA"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none" />
            </div>
          )}
          
          {formData.statut === 'Paneliste' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Thème du panel *</label>
                <select name="theme_panel" value={formData.theme_panel} onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none">
                  <option value="">Sélectionnez un thème</option>
                  {themeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Poste / Service *</label>
                <input type="text" name="poste_paneliste" value={formData.poste_paneliste} onChange={handleChange}
                  placeholder="Ex: Directeur IT, Consultant"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none" />
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Photo de profil *</label>
            <input type="file" accept="image/jpeg,image/png" onChange={handlePhotoChange} required
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer" />
            {photoPreview && (
              <div className="mt-2 flex justify-center">
                <img src={photoPreview} alt="Aperçu" className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500" />
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Format JPG/PNG (max 2MB)</p>
          </div>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center text-sm">❌ {error}</div>
          )}
          
          <button type="submit" disabled={loading}
            className="w-full bg-yellow-500 text-white font-bold py-4 rounded-xl hover:bg-black transition disabled:opacity-50">
            {loading ? '⏳ GÉNÉRATION...' : '✨ GÉNÉRER MON ATTESTATION'}
          </button>
          
          <a href="/" className="w-full bg-gray-600 text-white font-bold py-4 rounded-xl hover:bg-gray-700 transition text-center block">
            ← RETOUR À L'ACCUEIL
          </a>
        </form>
      </div>
    </div>
  );
}