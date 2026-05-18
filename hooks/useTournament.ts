import { useEffect, useState } from 'react';
import { Tournament } from '../lib/types/tournament';

export function useTournament(id: string) {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const res = await fetch('/api/tournaments');
      const all = await res.json();
      if (!mounted) return;
      const t = all.find((x: any) => x.id === id) || null;
      setTournament(t);
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  return { tournament, loading };
}
