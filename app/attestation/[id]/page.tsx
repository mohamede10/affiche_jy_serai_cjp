'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAttestations, type Attestation } from '@/lib/attestation-storage';
import AttestationComponent from '@/components/Attestation';

export default function AttestationPage() {
  const { id } = useParams();
  const [attestation, setAttestation] = useState<Attestation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const attestations = getAttestations();
    const found = attestations.find(a => a.id === id);
    setAttestation(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (!attestation) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-500">Attestation non trouvée</div>
      </div>
    );
  }

  return <AttestationComponent attestation={attestation} />;
}