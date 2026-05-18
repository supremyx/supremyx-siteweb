import { NextResponse } from 'next/server';
import { registrationService } from '../../../lib/services/tournamentRegistration';
import { mockDb } from '../../../lib/services/mockDb';

export async function GET() {
  const list = Array.from(mockDb.tournaments.values());
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Expect body to be: { name, description?, date?, maxParticipants?, registrationSystem }
    const created = await registrationService.createTournament(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 400 });
  }
}
