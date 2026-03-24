// data/mockHomeData.ts

export interface Responder {
  id: string;
  name: string;
  initials: string;
  role: "Security" | "Medical" | "Fire";
  distanceMetres: number;
  etaMinutes: number;
  status: "available" | "busy" | "offline";
  zone: string;
}

export interface RecentAlert {
  id: string;
  type: "security" | "medical" | "fire" | "false_alarm" | "general";
  date: string;
  location: string;
  status: "resolved" | "pending" | "cancelled";
  responseTimeSeconds?: number;
  responderName?: string;
}

export type EmergencyType = "general" | "medical" | "fire" | "security";

export type EmergencyStatus =
  | "sending"       // online: just confirmed, posting to backend
  | "dispatched"    // online: responder assigned, en route
  | "pending_sync"  // offline: saved locally, retrying
  | "resolved";

export interface ActiveEmergency {
  id: string;
  type: EmergencyType;
  status: EmergencyStatus;
  triggeredAt: number;         // Date.now()
  location: string;
  responderName?: string;
  etaMinutes?: number;
  retryCount?: number;         // for offline sync attempts
}

export const MOCK_RESPONDERS: Responder[] = [
  {
    id: "r1",
    name: "John Okafor",
    initials: "JO",
    role: "Security",
    distanceMetres: 320,
    etaMinutes: 2,
    status: "available",
    zone: "Zone A - Main Gate",
  },
  {
    id: "r2",
    name: "Amaka Eze",
    initials: "AE",
    role: "Medical",
    distanceMetres: 580,
    etaMinutes: 4,
    status: "available",
    zone: "Zone B - Medical Center",
  },
  {
    id: "r3",
    name: "Tunde Bello",
    initials: "TB",
    role: "Security",
    distanceMetres: 910,
    etaMinutes: 6,
    status: "busy",
    zone: "Zone C - East Wing",
  },
];

export const MOCK_RECENT_ALERTS: RecentAlert[] = [
  {
    id: "ALT001",
    type: "false_alarm",
    date: "Today, 9:14 AM",
    location: "Main Campus, Gate A",
    status: "cancelled",
  },
  {
    id: "ALT002",
    type: "security",
    date: "Jan 15, 11:32 PM",
    location: "Hostel Block C",
    status: "resolved",
    responseTimeSeconds: 72,
    responderName: "John O.",
  },
];

export const EMERGENCY_TYPES: { id: EmergencyType; label: string; color: string; bg: string }[] = [
  { id: "general",  label: "General",  color: "#DC2626", bg: "#FEF2F2" },
  { id: "medical",  label: "Medical",  color: "#2563EB", bg: "#EFF6FF" },
  { id: "fire",     label: "Fire",     color: "#EA580C", bg: "#FFF7ED" },
  { id: "security", label: "Security", color: "#133D13", bg: "#F0FDF4" },
];