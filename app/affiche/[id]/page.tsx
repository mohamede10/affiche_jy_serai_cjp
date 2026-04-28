'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getParticipants, Participant } from '@/lib/storage';
import Affiche from '@/components/Affiche';

export default function AffichePage() {
  const { id } = useParams();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const participants = getParticipants();
    const found = participants.find(p => p.id === id);
    setParticipant(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (!participant) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-500">Affiche non trouvée</div>
      </div>
    );
  }

  return <Affiche participant={participant} />;
}