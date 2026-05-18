// Very small in-memory mock database used for prototyping. Replace with a real DB in production.
import { Tournament, Participant } from '../types/tournament';

const tournaments = new Map<string, Tournament>();
const participants: Participant[] = [];

// Seed a sample tournament if none exists
if (tournaments.size === 0) {
  const sampleId = 'sample-tournament-1';
  tournaments.set(sampleId, {
    id: sampleId,
    name: 'Tournoi exemple',
    description: 'Un tournoi exemple avec système d\'inscription personnalisé',
    date: new Date().toISOString(),
    maxParticipants: 16,
    currentParticipants: 0,
    registrationSystem: {
      type: 'open',
      requiresApproval: false,
      customFields: [
        { id: 'nickname', name: 'Pseudo', type: 'text', required: true },
        { id: 'email', name: 'Email', type: 'email', required: true },
      ],
      fee: 0,
      deadline: null,
    },
  });
}

export const mockDb = {
  tournaments,
  participants,
};
