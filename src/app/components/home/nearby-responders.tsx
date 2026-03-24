// components/home/NearbyResponders.tsx
"use client";

import React from "react";
import { MapPin, Clock, ShieldCheck, HeartPulse, Flame } from "lucide-react";
import { type Responder } from "../data/mock-home-data";

interface NearbyRespondersProps {
  responders: Responder[];
}

const roleConfig: Record<Responder["role"], { color: string; bg: string; icon: React.ReactNode }> = {
  Security: { color: "#133D13", bg: "#F0FDF4", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  Medical:  { color: "#2563EB", bg: "#EFF6FF", icon: <HeartPulse className="w-3.5 h-3.5" /> },
  Fire:     { color: "#EA580C", bg: "#FFF7ED", icon: <Flame className="w-3.5 h-3.5" /> },
};

const statusDot: Record<Responder["status"], string> = {
  available: "bg-green-400",
  busy:      "bg-amber-400",
  offline:   "bg-gray-300",
};

const NearbyResponders: React.FC<NearbyRespondersProps> = ({ responders }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Nearby Responders</h3>
        <span className="text-xs text-[#133D13] font-medium">
          {responders.filter((r) => r.status === "available").length} available
        </span>
      </div>

      <div className="space-y-2">
        {responders.map((responder) => {
          const config = roleConfig[responder.role];
          return (
            <div
              key={responder.id}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: config.bg, color: config.color }}
                >
                  {responder.initials}
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${statusDot[responder.status]}`}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{responder.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: config.bg, color: config.color }}
                  >
                    {config.icon}
                    {responder.role}
                  </span>
                  <span className="text-xs text-gray-400 truncate">· {responder.zone}</span>
                </div>
              </div>

              {/* Distance & ETA */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 justify-end text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>
                    {responder.distanceMetres < 1000
                      ? `${responder.distanceMetres}m`
                      : `${(responder.distanceMetres / 1000).toFixed(1)}km`}
                  </span>
                </div>
                <div className="flex items-center gap-1 justify-end text-xs font-semibold text-[#133D13] mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>~{responder.etaMinutes} min</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NearbyResponders;