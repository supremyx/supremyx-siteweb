export interface Tournament {
  id: string
  name: string
  date: string // Format lisible pour affichage (ex: "23 Mai 2026")
  dateObj: Date | null // Date réelle pour le calendrier (null si "Bientôt" ou non défini)
  time: string
  prize: string
  slots: number
  registered: number
  status: "open" | "full" | "upcoming" | "live"
  type: "solo" | "duo" | "squad"
}

// Source unique de vérité pour tous les tournois
// Modifiez ce fichier pour ajouter/modifier des tournois
// Les changements se reflèteront automatiquement dans le calendrier et la liste des tournois
export const tournaments: Tournament[] = [
  {
    id: "1",
    name: "Clan Battles League CI (CBL1)",
    date: "23 Mai 2026",
    dateObj: new Date(2026, 4, 23), // Mai = mois 4 (0-indexed)
    time: "20h00",
    prize: "20000 FCFA",
    slots: 20,
    registered: 0,
    status: "open",
    type: "squad",
  },
  {
    id: "2",
    name: "Tournois Duo Masters",
    date: "26 Mai 2026",
    dateObj: new Date(2026, 4, 26),
    time: "20h00",
    prize: "6000 FCFA",
    slots: 50,
    registered: 0,
    status: "open",
    type: "duo",
  },
  {
    id: "3",
    name: "Tournois Solo Champion",
    date: "28 Mai 2026",
    dateObj: new Date(2026, 4, 28),
    time: "20h00",
    prize: "3000 FCFA",
    slots: 100,
    registered: 0,
    status: "open",
    type: "solo",
  },
  {
    id: "4",
    name: "Weekend Warriors",
    date: "Bientôt",
    dateObj: null, // Pas encore de date définie
    time: "",
    prize: "",
    slots: 25,
    registered: 0,
    status: "upcoming",
    type: "squad",
  },
  {
    id: "5",
    name: "Elite Rush League CI (ERL1)",
    date: "Bientôt",
    dateObj: null,
    time: "",
    prize: "",
    slots: 24,
    registered: 0,
    status: "upcoming",
    type: "squad",
  },
  {
    id: "6",
    name: "NexDominion League Africa",
    date: "",
    dateObj: null,
    time: "",
    prize: "",
    slots: Infinity,
    registered: 0,
    status: "upcoming",
    type: "squad",
  },
]

// Helper pour obtenir les tournois avec une date valide (pour le calendrier)
export function getTournamentsWithDates(): Tournament[] {
  return tournaments.filter(t => t.dateObj !== null)
}

// Helper pour obtenir les tournois d'un mois/année spécifique
export function getTournamentsForMonth(year: number, month: number): Tournament[] {
  return tournaments.filter(t => 
    t.dateObj !== null && 
    t.dateObj.getFullYear() === year && 
    t.dateObj.getMonth() === month
  )
}

// Helper pour obtenir les tournois d'une date spécifique
export function getTournamentsForDate(date: Date): Tournament[] {
  return tournaments.filter(t => 
    t.dateObj !== null &&
    t.dateObj.getFullYear() === date.getFullYear() &&
    t.dateObj.getMonth() === date.getMonth() &&
    t.dateObj.getDate() === date.getDate()
  )
}
