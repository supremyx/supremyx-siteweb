import { Tournament, Participant, RegistrationSystem } from '../types/tournament';
import { mockDb } from './mockDb';
import { v4 as uuid } from 'uuid';

export class TournamentRegistrationService {
  async createTournament(t: Omit<Tournament, 'id' | 'currentParticipants'>): Promise<Tournament> {
    const id = uuid();
    const tournament: Tournament = {
      ...t,
      id,
      currentParticipants: 0,
    };
    mockDb.tournaments.set(id, tournament);
    return tournament;
  }

  async createRegistrationSystem(tournamentId: string, config: RegistrationSystem): Promise<RegistrationSystem> {
    const tournament = mockDb.tournaments.get(tournamentId);
    if (!tournament) throw new Error('Tournament not found');
    tournament.registrationSystem = config;
    mockDb.tournaments.set(tournamentId, tournament);
    return config;
  }

  async registerParticipant(tournamentId: string, userId: string | undefined, data: Record<string, any>): Promise<Participant> {
    const tournament = mockDb.tournaments.get(tournamentId);
    if (!tournament) throw new Error('Tournament not found');

    const max = tournament.maxParticipants ?? Infinity;
    if ((tournament.currentParticipants ?? 0) >= max) {
      throw new Error('Tournament is full');
    }

    // Basic validation for required custom fields
    for (const field of tournament.registrationSystem.customFields || []) {
      if (field.required && (data[field.id] === undefined || data[field.id] === '')) {
        throw new Error(`Field ${field.name} is required`);
      }
    }

    const participant: Participant = {
      id: uuid(),
      tournamentId,
      userId,
      registrationData: data,
      status: tournament.registrationSystem.requiresApproval ? 'pending' : 'confirmed',
      registeredAt: new Date().toISOString(),
    };

    mockDb.participants.push(participant);
    tournament.currentParticipants = (tournament.currentParticipants ?? 0) + 1;
    mockDb.tournaments.set(tournamentId, tournament);

    return participant;
  }

  async updateRegistrationStatus(participantId: string, status: Participant['status']): Promise<Participant> {
    const p = mockDb.participants.find((x) => x.id === participantId);
    if (!p) throw new Error('Participant not found');
    p.status = status;
    return p;
  }

  async getTournamentRegistrations(tournamentId: string): Promise<Participant[]> {
    return mockDb.participants.filter((p) => p.tournamentId === tournamentId);
  }
}

export const registrationService = new TournamentRegistrationService();
