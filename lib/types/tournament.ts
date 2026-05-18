export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox';
  required: boolean;
  options?: string[];
}

export interface RegistrationSystem {
  type: 'open' | 'moderated' | 'invited';
  requiresApproval: boolean;
  customFields: CustomField[];
  fee?: number;
  deadline?: string | null;
}

export interface Tournament {
  id: string;
  name: string;
  description?: string;
  date?: string | null;
  registrationSystem: RegistrationSystem;
  maxParticipants?: number;
  currentParticipants?: number;
}

export interface Participant {
  id: string;
  tournamentId: string;
  userId?: string;
  registrationData: Record<string, any>;
  status: 'pending' | 'approved' | 'rejected' | 'confirmed';
  registeredAt: string;
}
