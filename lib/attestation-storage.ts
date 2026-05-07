// lib/attestation-storage.ts
export interface Attestation {
  id: string;
  nom: string;
  prenom: string;
  statut: 'Participant' | 'Formateur' | 'Paneliste' | 'Partenaire';
  titre_formation?: string;
  theme_panel?: string;
  poste_paneliste?: string;
  photo_base64: string;
  code_attestation: string;
  date_creation: string;
}

const STORAGE_KEY = 'cjp_attestations';

export function getAttestations(): Attestation[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveAttestation(attestation: Attestation): void {
  const attestations = getAttestations();
  attestations.push(attestation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attestations));
}

export function getNextAttestationCode(): string {
  const attestations = getAttestations();
  const lastCode = attestations[attestations.length - 1]?.code_attestation;
  
  if (lastCode && lastCode.match(/CJP-ATT-(\d+)/)) {
    const lastNum = parseInt(lastCode.match(/CJP-ATT-(\d+)/)![1]);
    const nextNum = lastNum + 1;
    return 'CJP-ATT-' + nextNum.toString().padStart(4, '0');
  }
  return 'CJP-ATT-0001';
}