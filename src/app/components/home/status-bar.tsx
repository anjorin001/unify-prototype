// components/home/StatusBar.tsx
"use client";

import React from "react";
import { Wifi, WifiOff, Signal, CheckCircle2, RefreshCw, PhoneCall } from "lucide-react";

interface StatusBarProps {
  isOnline: boolean;
  hasCellSignal: boolean;
  locationEnabled: boolean;
  hasPendingAlert?: boolean;
  retryCount?: number;
}

const StatusBar: React.FC<StatusBarProps> = ({
  isOnline,
  hasCellSignal,
  hasPendingAlert = false,
  retryCount = 0,
}) => {
  const overallStatus = isOnline ? "protected" : hasCellSignal ? "limited" : "offline";

  const statusConfig = {
    protected: {
      bg: "#133D13",
      label: "Fully Protected",
      sublabel: "Internet · GPS · Cell signal active",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    limited: {
      bg: "#D97706",
      label: "Limited Coverage",
      sublabel: "No internet — dial *346*911# for SMS alert",
      icon: <PhoneCall className="w-3.5 h-3.5" />,
    },
    offline: {
      bg: "#DC2626",
      label: "No Signal",
      sublabel: "Alert saved locally · will sync automatically",
      icon: <WifiOff className="w-3.5 h-3.5" />,
    },
  };

  const config = statusConfig[overallStatus];

  return (
    <div className="flex flex-col gap-2">
      {/* Main status pill */}
      <div
        className="rounded-xl px-4 py-3 flex items-center gap-3 text-white"
        style={{ backgroundColor: config.bg }}
      >
        <div className="flex-shrink-0 opacity-90">{config.icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold leading-tight">{config.label}</p>
          <p className="text-xs opacity-70 leading-tight mt-0.5">{config.sublabel}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div
            className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: isOnline ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)", opacity: isOnline ? 1 : 0.4 }}
          >
            <Wifi className="w-3 h-3" />
          </div>
          <div
            className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: hasCellSignal ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)", opacity: hasCellSignal ? 1 : 0.4 }}
          >
            <Signal className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* USSD prompt banner — shown when cell only */}
      {!isOnline && hasCellSignal && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
          <PhoneCall className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-amber-800">No internet detected</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Dial <span className="font-mono font-bold bg-amber-100 px-1 rounded">*346*911#</span> on your phone to send an emergency alert via your cell network.
            </p>
          </div>
        </div>
      )}

      {/* Retry banner — shown when offline with pending alert */}
      {hasPendingAlert && !isOnline && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <RefreshCw className="w-4 h-4 text-red-500 flex-shrink-0 animate-spin" style={{ animationDuration: "2s" }} />
          <div className="flex-1">
            <p className="text-xs font-semibold text-red-700">Alert queued — retrying every 5s</p>
            <p className="text-xs text-red-500 mt-0.5">Attempt #{retryCount} · Will send the moment signal returns</p>
          </div>
          <span className="text-xs font-bold text-red-400 bg-red-100 px-2 py-1 rounded-lg">{retryCount}</span>
        </div>
      )}
    </div>
  );
};

export default StatusBar;