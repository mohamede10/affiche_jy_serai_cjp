// lib/storage.ts
export interface Participant {
  id: string;
  nom: string;
  statut: 'Participant' | 'Formateur' | 'Paneliste' | 'Partenaire';
  titre_formation?: string;
  theme_panel?: string;
  poste_paneliste?: string;
  photo_base64: string;
  fonction_affiche: string;
  code_id: string;
  date_inscription: string;
}

// Clé pour le localStorage
const STORAGE_KEY = 'cjp_participants';

// Récupérer tous les participants
export function getParticipants(): Participant[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Sauvegarder un participant
export function saveParticipant(participant: Participant): void {
  const participants = getParticipants();
  participants.push(participant);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
}

// Générer le prochain code ID
export function getNextCodeId(): string {
  const participants = getParticipants();
  const lastCode = participants[participants.length - 1]?.code_id;
  
  if (lastCode && lastCode.match(/CJP-FODR-(\d+)/)) {
    const lastNum = parseInt(lastCode.match(/CJP-FODR-(\d+)/)![1]);
    const nextNum = lastNum + 1;
    return '#CJP-FODR-' + nextNum.toString().padStart(4, '0');
  }
  return '#CJP-FODR-0001';
}

// Compter les affiches par nom
export function countAffichesByNom(nom: string): number {
  const participants = getParticipants();
  return participants.filter(p => p.nom === nom).length;
}

// Supprimer un participant (optionnel)
export function deleteParticipant(id: string): void {
  const participants = getParticipants();
  const filtered = participants.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}