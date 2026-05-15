// Jours de la semaine pour la répétition hebdomadaire
export type WeekDay = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi" | "samedi" | "dimanche"

export const WEEK_DAYS: { value: WeekDay; label: string; index: number }[] = [
  { value: "lundi", label: "Lundi", index: 1 },
  { value: "mardi", label: "Mardi", index: 2 },
  { value: "mercredi", label: "Mercredi", index: 3 },
  { value: "jeudi", label: "Jeudi", index: 4 },
  { value: "vendredi", label: "Vendredi", index: 5 },
  { value: "samedi", label: "Samedi", index: 6 },
  { value: "dimanche", label: "Dimanche", index: 0 },
]

export interface WeeklySchedule {
  enabled: boolean
  days: WeekDay[] // Jours de répétition (ex: ["lundi", "mercredi", "vendredi"])
  startDate?: Date // Date de début de la répétition
  endDate?: Date // Date de fin de la répétition (optionnel)
}

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
  // Nouvelle fonctionnalité de répétition hebdomadaire
  weeklySchedule?: WeeklySchedule
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
    date: "Chaque Mardi & Jeudi",
    dateObj: new Date(2026, 4, 26),
    time: "20h00",
    prize: "6000 FCFA",
    slots: 50,
    registered: 0,
    status: "open",
    type: "duo",
    weeklySchedule: {
      enabled: true,
      days: ["mardi", "jeudi"],
      startDate: new Date(2026, 4, 1), // 1er Mai 2026
      endDate: new Date(2026, 11, 31), // 31 Décembre 2026
    },
  },
  {
    id: "3",
    name: "Tournois Solo Champion",
    date: "Chaque Mercredi",
    dateObj: new Date(2026, 4, 28),
    time: "20h00",
    prize: "3000 FCFA",
    slots: 100,
    registered: 0,
    status: "open",
    type: "solo",
    weeklySchedule: {
      enabled: true,
      days: ["mercredi"],
      startDate: new Date(2026, 4, 1),
      endDate: new Date(2026, 11, 31),
    },
  },
  {
    id: "4",
    name: "Weekend Warriors",
    date: "Chaque Weekend",
    dateObj: null,
    time: "18h00",
    prize: "10000 FCFA",
    slots: 25,
    registered: 0,
    status: "open",
    type: "squad",
    weeklySchedule: {
      enabled: true,
      days: ["samedi", "dimanche"],
      startDate: new Date(2026, 4, 1),
      endDate: new Date(2026, 11, 31),
    },
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

// Helper pour convertir un jour de la semaine en index (0 = Dimanche, 1 = Lundi, etc.)
function getWeekDayIndex(day: WeekDay): number {
  const dayData = WEEK_DAYS.find(d => d.value === day)
  return dayData ? dayData.index : 0
}

// Helper pour vérifier si une date correspond à un jour de répétition
function isDateInWeeklySchedule(date: Date, schedule: WeeklySchedule): boolean {
  if (!schedule.enabled || schedule.days.length === 0) return false
  
  const dayOfWeek = date.getDay()
  const isCorrectDay = schedule.days.some(day => getWeekDayIndex(day) === dayOfWeek)
  
  if (!isCorrectDay) return false
  
  // Vérifier les dates de début et fin
  if (schedule.startDate && date < schedule.startDate) return false
  if (schedule.endDate && date > schedule.endDate) return false
  
  return true
}

// Helper pour obtenir les tournois avec une date valide (pour le calendrier)
export function getTournamentsWithDates(): Tournament[] {
  return tournaments.filter(t => t.dateObj !== null || t.weeklySchedule?.enabled)
}

// Helper pour obtenir les tournois d'un mois/année spécifique
export function getTournamentsForMonth(year: number, month: number): Tournament[] {
  return tournaments.filter(t => 
    (t.dateObj !== null && 
    t.dateObj.getFullYear() === year && 
    t.dateObj.getMonth() === month) ||
    t.weeklySchedule?.enabled
  )
}

// Helper pour obtenir les tournois d'une date spécifique
export function getTournamentsForDate(date: Date): Tournament[] {
  return tournaments.filter(t => {
    // Vérifier d'abord la répétition hebdomadaire
    if (t.weeklySchedule?.enabled && isDateInWeeklySchedule(date, t.weeklySchedule)) {
      return true
    }
    
    // Sinon vérifier la date unique
    return (
      t.dateObj !== null &&
      t.dateObj.getFullYear() === date.getFullYear() &&
      t.dateObj.getMonth() === date.getMonth() &&
      t.dateObj.getDate() === date.getDate()
    )
  })
}

// Helper pour obtenir les jours avec des tournois dans un mois donné
export function getDaysWithTournaments(year: number, month: number): number[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysWithTournaments: number[] = []
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    if (getTournamentsForDate(date).length > 0) {
      daysWithTournaments.push(day)
    }
  }
  
  return daysWithTournaments
}

// Helper pour formater les jours de répétition en texte lisible
export function formatWeeklySchedule(schedule: WeeklySchedule): string {
  if (!schedule.enabled || schedule.days.length === 0) return ""
  
  const dayLabels = schedule.days.map(day => {
    const dayData = WEEK_DAYS.find(d => d.value === day)
    return dayData ? dayData.label : day
  })
  
  if (dayLabels.length === 1) {
    return `Chaque ${dayLabels[0]}`
  } else if (dayLabels.length === 2) {
    return `Chaque ${dayLabels.join(" & ")}`
  } else {
    return `Chaque ${dayLabels.slice(0, -1).join(", ")} & ${dayLabels[dayLabels.length - 1]}`
  }
}
