"use client";

import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  RefreshCw,
  Users,
  WifiOff,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { EMERGENCY_TYPES, type EmergencyType } from "../data/mock-home-data";
import type { User } from "../types";


interface EmergencyConfirmedModalProps {
  emergencyType: EmergencyType;
  user: User;
  isOnline: boolean;
  onDismiss: () => void;
}

const EmergencyConfirmedModal: React.FC<EmergencyConfirmedModalProps> = ({
  emergencyType,
  user,
  isOnline,
  onDismiss,
}) => {
  const [stage, setStage] = useState<"sending" | "dispatched">("sending");
  const config = EMERGENCY_TYPES.find((t) => t.id === emergencyType)!;

  useEffect(() => {
    if (!isOnline) return; // offline: stays in "sending" until dismissed
    const t = setTimeout(() => setStage("dispatched"), 2500);
    return () => clearTimeout(t);
  }, [isOnline]);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div
          className="px-5 pt-5 pb-4 text-white"
          style={{
            backgroundColor: !isOnline
              ? "#DC2626"
              : stage === "dispatched"
                ? "#133D13"
                : config.color,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              {!isOnline ? (
                <WifiOff className="w-5 h-5" />
              ) : stage === "dispatched" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <div className="w-5 h-5 border-2 border-white/60 border-t-white rounded-full animate-spin" />
              )}
              <span className="text-sm font-bold">
                {!isOnline
                  ? "Alert Saved Locally"
                  : stage === "sending"
                    ? "Sending Alert..."
                    : "Help Dispatched ✓"}
              </span>
            </div>
            <button
              onClick={onDismiss}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Online dispatched info */}
          {isOnline && stage === "dispatched" && (
            <div className="flex items-center gap-3 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" /> John O. responding
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> ~2 min ETA
              </span>
            </div>
          )}

          {/* Offline info */}
          {!isOnline && (
            <div className="flex items-center gap-2 text-xs text-white/80 mt-1">
              <RefreshCw
                className="w-3 h-3 animate-spin"
                style={{ animationDuration: "2s" }}
              />
              <span>Retrying every 5s · Will send when signal returns</span>
            </div>
          )}
        </div>

        {/* SMS preview */}
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
            {isOnline
              ? "SMS sent to emergency contacts"
              : "SMS queued — will send when online"}
          </p>
          <div
            className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-700 leading-relaxed border border-gray-100 whitespace-pre-line"
            style={{ fontFamily: "ui-monospace, monospace" }}
          >
            {`🚨 EMERGENCY ALERT - Atlas

`}
            <span className="font-semibold text-gray-900">{user.name}</span>
            {` needs help!

📍 Location: 6.5244°N, 3.3792°E
(Victoria Island, Lagos)

🕐 Time: ${new Date().toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}

📞 Call them: ${user.phone}

- Sent via Atlas`}
          </div>
        </div>

        {/* Detail rows */}
        <div className="px-5 py-4 space-y-2.5">
          {[
            {
              icon: <MapPin className="w-4 h-4 text-gray-400" />,
              text: "Victoria Island, Lagos · GPS locked",
            },
            {
              icon: <Phone className="w-4 h-4 text-gray-400" />,
              text: isOnline
                ? "Emergency contacts notified"
                : "Contacts will be notified when online",
            },
            {
              icon: <Users className="w-4 h-4 text-gray-400" />,
              text: isOnline
                ? "Nearest Atlas responders alerted"
                : "Responders will be alerted on sync",
            },
          ].map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              {row.icon}
              <span>{row.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-5 pb-5">
          <button
            onClick={onDismiss}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              backgroundColor:
                isOnline && stage === "dispatched"
                  ? "#133D13"
                  : isOnline
                    ? config.color
                    : "#DC2626",
            }}
          >
            {isOnline && stage === "dispatched"
              ? "Track Responder →"
              : isOnline
                ? "Sending..."
                : "Got it — keep retrying"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyConfirmedModal;
