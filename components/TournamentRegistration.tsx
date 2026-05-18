'use client';

import React, { useEffect, useState } from 'react';
import { CustomField } from '../lib/types/tournament';

type Props = {
  tournamentId: string;
};

export default function TournamentRegistration({ tournamentId }: Props) {
  const [fields, setFields] = useState<CustomField[]>([]);
  const [values, setValues] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/tournaments`);
      const all = await res.json();
      const t = all.find((x: any) => x.id === tournamentId);
      if (t) setFields(t.registrationSystem.customFields || []);
    }
    load();
  }, [tournamentId]);

  function onChange(id: string, v: any) {
    setValues((s) => ({ ...s, [id]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/tournaments/${tournamentId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationData: values }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Erreur');
      setStatus('Inscription réussie');
    } catch (err: any) {
      setStatus(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map((f) => (
        <div key={f.id}>
          <label className="block text-sm font-medium text-gray-700">{f.name}{f.required ? ' *' : ''}</label>
          {f.type === 'select' ? (
            <select required={f.required} onChange={(e) => onChange(f.id, e.target.value)} className="mt-1 block w-full">
              <option value="">--</option>
              {f.options?.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              required={f.required}
              type={f.type === 'number' ? 'number' : 'text'}
              onChange={(e) => onChange(f.id, e.target.value)}
              className="mt-1 block w-full"
            />
          )}
        </div>
      ))}

      <button type="submit" disabled={loading} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? 'En cours...' : 'S'inscrire'}
      </button>

      {status && <p className="mt-2">{status}</p>}
    </form>
  );
}
