'use client';

import { useEffect, useState } from 'react';
import { getParticipants, Participant } from '@/lib/storage';
import Link from 'next/link';

export default function ListePage() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    setParticipants(getParticipants());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#0e1a3a] to-[#1a1f4a] p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-white border-b">
          <h1 className="text-3xl font-black text-black">Liste des inscrits - CJP FODR 2026</h1>
          <p className="text-gray-500">Total : {participants.length} participants</p>
        </div>
        
        <div className="overflow-x-auto p-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Photo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Détail</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {participants.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div
                      className="w-12 h-12 rounded-xl bg-cover bg-center"
                      style={{ backgroundImage: `url('${p.photo_base64}')` }}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-mono font-bold text-yellow-600">{p.code_id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.nom}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      p.statut === 'Participant' ? 'bg-blue-100 text-blue-800' :
                      p.statut === 'Formateur' ? 'bg-green-100 text-green-800' :
                      p.statut === 'Paneliste' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {p.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {p.statut === 'Formateur' && p.titre_formation}
                    {p.statut === 'Paneliste' && (
                      <div>
                        <div>{p.theme_panel?.replace(/^\d{1,2} MAI - /, '')}</div>
                        <div className="text-xs text-gray-400">{p.poste_paneliste}</div>
                      </div>
                    )}
                    {p.statut === 'Participant' && '-'}
                    {p.statut === 'Partenaire' && '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(p.date_inscription).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/affiche/${p.id}`} className="text-yellow-600 hover:text-yellow-800">
                      Voir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-gray-50 text-center">
          <Link href="/" className="bg-yellow-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-black transition">
            Retour au formulaire
          </Link>
        </div>
      </div>
    </div>
  );
}