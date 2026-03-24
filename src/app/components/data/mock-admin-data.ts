// data/mockAdminData.ts

export type IncidentStatus = "active" | "dispatched" | "resolved" | "cancelled";
export type IncidentType   = "security" | "medical" | "fire" | "general";
export type ResponderStatus = "available" | "busy" | "offline";

export interface AdminIncident {
  id: string;
  type: IncidentType;
  status: IncidentStatus;
  reporterName: string;
  reporterPhone: string;
  location: string;
  zone: string;
  triggeredAt: string;      // "2 mins ago", "9:14 AM", etc.
  triggeredMs: number;      // Date.now() equivalent for sorting
  assignedTo?: string;      // responder name
  responseTimeSeconds?: number;
}

export interface AdminResponder {
  id: string;
  name: string;
  initials: string;
  role: "Security" | "Medical" | "Fire";
  zone: string;
  status: ResponderStatus;
  phone: string;
  alertsToday: number;
  avgResponseSeconds: number;
  lastPing: string;         // "Just now", "3 mins ago", etc.
  currentIncidentId?: string;
}

export interface DailyStat {
  label: string;     // "Mon", "Tue", etc.
  count: number;
}

// ── Live incidents (mix of active + recent) ───────────────────
export const MOCK_ADMIN_INCIDENTS: AdminIncident[] = [
  {
    id: "INC-2401",
    type: "medical",
    status: "active",
    reporterName: "Chioma Obi",
    reporterPhone: "+2348031234567",
    location: "Faculty of Science, Room 204",
    zone: "Zone B",
    triggeredAt: "Just now",
    triggeredMs: Date.now() - 60_000,
    assignedTo: undefined,
  },
  {
    id: "INC-2400",
    type: "security",
    status: "dispatched",
    reporterName: "Emeka Nwosu",
    reporterPhone: "+2347045678901",
    location: "Hostel Block D, Floor 3",
    zone: "Zone C",
    triggeredAt: "4 mins ago",
    triggeredMs: Date.now() - 240_000,
    assignedTo: "John Okafor",
  },
  {
    id: "INC-2399",
    type: "general",
    status: "dispatched",
    reporterName: "Adaeze Umeh",
    reporterPhone: "+2348056789012",
    location: "Main Library, Entrance",
    zone: "Zone A",
    triggeredAt: "11 mins ago",
    triggeredMs: Date.now() - 660_000,
    assignedTo: "Tunde Bello",
  },
  {
    id: "INC-2398",
    type: "security",
    status: "resolved",
    reporterName: "Kelechi Eze",
    reporterPhone: "+2349067890123",
    location: "Engineering Block, Parking",
    zone: "Zone D",
    triggeredAt: "Today, 9:14 AM",
    triggeredMs: Date.now() - 3_600_000,
    assignedTo: "John Okafor",
    responseTimeSeconds: 68,
  },
  {
    id: "INC-2397",
    type: "medical",
    status: "resolved",
    reporterName: "Ngozi Akpan",
    reporterPhone: "+2348078901234",
    location: "Sports Complex",
    zone: "Zone E",
    triggeredAt: "Today, 8:55 AM",
    triggeredMs: Date.now() - 4_500_000,
    assignedTo: "Amaka Eze",
    responseTimeSeconds: 92,
  },
  {
    id: "INC-2396",
    type: "fire",
    status: "resolved",
    reporterName: "Oluwaseun Adeola",
    reporterPhone: "+2347089012345",
    location: "Chemistry Lab, Block 3",
    zone: "Zone B",
    triggeredAt: "Yesterday, 6:30 PM",
    triggeredMs: Date.now() - 54_000_000,
    assignedTo: "Biodun Salami",
    responseTimeSeconds: 45,
  },
];

// ── Responders roster ────────────────────────────────────────
export const MOCK_ADMIN_RESPONDERS: AdminResponder[] = [
  {
    id: "r1",
    name: "John Okafor",
    initials: "JO",
    role: "Security",
    zone: "Zone A – Main Gate",
    status: "busy",
    phone: "+2348031234567",
    alertsToday: 3,
    avgResponseSeconds: 68,
    lastPing: "Just now",
    currentIncidentId: "INC-2400",
  },
  {
    id: "r2",
    name: "Amaka Eze",
    initials: "AE",
    role: "Medical",
    zone: "Zone B – Medical Centre",
    status: "available",
    phone: "+2348045678901",
    alertsToday: 2,
    avgResponseSeconds: 92,
    lastPing: "1 min ago",
  },
  {
    id: "r3",
    name: "Tunde Bello",
    initials: "TB",
    role: "Security",
    zone: "Zone C – East Wing",
    status: "busy",
    phone: "+2348056789012",
    alertsToday: 1,
    avgResponseSeconds: 110,
    lastPing: "Just now",
    currentIncidentId: "INC-2399",
  },
  {
    id: "r4",
    name: "Biodun Salami",
    initials: "BS",
    role: "Fire",
    zone: "Zone D – West Campus",
    status: "available",
    phone: "+2348067890123",
    alertsToday: 1,
    avgResponseSeconds: 45,
    lastPing: "2 mins ago",
  },
  {
    id: "r5",
    name: "Funke Adewale",
    initials: "FA",
    role: "Medical",
    zone: "Zone E – Sports",
    status: "offline",
    phone: "+2348078901234",
    alertsToday: 0,
    avgResponseSeconds: 0,
    lastPing: "2 hrs ago",
  },
];

// ── Weekly trend for the mini chart ─────────────────────────
export const WEEKLY_STATS: DailyStat[] = [
  { label: "Mon", count: 3 },
  { label: "Tue", count: 5 },
  { label: "Wed", count: 2 },
  { label: "Thu", count: 7 },
  { label: "Fri", count: 4 },
  { label: "Sat", count: 6 },
  { label: "Sun", count: 4 },
];