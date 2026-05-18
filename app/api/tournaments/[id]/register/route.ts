import { NextResponse } from 'next/server';
import { registrationService } from '../../../../lib/services/tournamentRegistration';
import { mockDb } from '../../../../lib/services/mockDb';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    // Expect body: { userId?, registrationData }
    const participant = await registrationService.registerParticipant(id, body.userId, body.registrationData || {});
    return NextResponse.json(participant, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 400 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const regs = await registrationService.getTournamentRegistrations(id);
  return NextResponse.json(regs);
}
