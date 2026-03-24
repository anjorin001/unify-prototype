// components/home/OfflineEmergencyCard.tsx
"use client";

import { EMERGENCY_TYPES, type ActiveEmergency } from "../data/mock-home-data";
import type { User } from "../types";

import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  MessageSquare,
  PhoneCall,
  RefreshCw,
  Shield,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface OfflineEmergencyCardProps {
  emergency: ActiveEmergency;
  user: User;
  retryCount: number;
  hasCellSignal: boolean;
  onCancel: () => void;
}

const OfflineEmergencyCard: React.FC<OfflineEmergencyCardProps> = ({
  emergency,
  user,
  retryCount,
  hasCellSignal,
  onCancel,
}) => {
  const [elapsed, setElapsed] = useState(0);
  const [copied, setCopied] = useState(false);
  const [nextRetryIn, setNextRetryIn] = useState(5);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const config = EMERGENCY_TYPES.find((t) => t.id === emergency.type)!;

  // Elapsed time since alert
  useEffect(() => {
    const t = setInterval(() => {
      setElapsed(Math.floor((Date.now() - emergency.triggeredAt) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [emergency.triggeredAt]);

  // Next retry countdown (5s cycle)
  useEffect(() => {
    const t = setInterval(() => {
      setNextRetryIn((prev) => (prev <= 1 ? 5 : prev - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [retryCount]); // reset visual when retryCount increments

  const formatElapsed = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  const handleCopyUSSD = () => {
    navigator.clipboard.writeText("*346*911#").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-sm"
      style={{ borderColor: "#fca5a5" }}
    >
      {/* Top alert strip — pulsing red */}
      <div
        className="px-4 py-3.5 flex items-center justify-between"
        style={{ backgroundColor: "#DC2626" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <span className="text-white text-xs font-bold tracking-wide uppercase">
            Alert Queued — No Signal
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full">
          <Clock className="w-3 h-3 text-white" />
          <span className="text-white text-xs font-bold tabular-nums">
            {formatElapsed(elapsed)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white px-4 py-4 space-y-4">
        {/* Retry status */}
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <RefreshCw
            className="w-5 h-5 text-red-500 flex-shrink-0"
            style={{ animation: "spin 2s linear infinite" }}
          />
          <div className="flex-1">
            <p className="text-xs font-bold text-red-700">
              Retrying every 5 seconds
            </p>
            <p className="text-xs text-red-500 mt-0.5">
              Attempt <span className="font-bold">#{retryCount}</span> · Next in{" "}
              <span className="font-bold tabular-nums">{nextRetryIn}s</span>
            </p>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
            style={{ backgroundColor: "#DC2626" }}
          >
            {retryCount}
          </div>
        </div>

        {/* What's been done */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            What Atlas has done
          </p>
          {[
            {
              done: true,
              icon: <Shield className="w-3.5 h-3.5" />,
              text: `${config.label} alert saved to device`,
            },
            {
              done: true,
              icon: <RefreshCw className="w-3.5 h-3.5" />,
              text: "Retrying every 5s in the background",
            },
            {
              done: false,
              icon: <MessageSquare className="w-3.5 h-3.5" />,
              text: "SMS to contacts (sends on reconnect)",
            },
            {
              done: false,
              icon: <Shield className="w-3.5 h-3.5" />,
              text: "Responders alerted when signal returns",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: item.done ? "#F0FDF4" : "#F9FAFB",
                  color: item.done ? "#133D13" : "#9CA3AF",
                }}
              >
                {item.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  item.icon
                )}
              </div>
              <p
                className="text-xs"
                style={{
                  color: item.done ? "#166534" : "#6B7280",
                  fontWeight: item.done ? 600 : 400,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Manual actions */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Act now — no internet needed
          </p>

          {/* Cell signal: USSD */}
          {hasCellSignal ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 space-y-2">
              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-amber-800">
                    You have cell signal — dial now
                  </p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    This sends an emergency alert through your cell network, no
                    internet required.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-white border border-amber-200 rounded-lg px-3 py-2">
                  <span className="text-sm font-black text-amber-800 tracking-widest font-mono">
                    *346*911#
                  </span>
                </div>
                <button
                  onClick={handleCopyUSSD}
                  className="px-3 py-2 rounded-lg border border-amber-200 bg-white text-amber-700 hover:bg-amber-50 transition-all flex items-center gap-1.5 text-xs font-semibold"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
                <a
                  href="tel:*346*911%23"
                  className="px-3 py-2 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                  style={{ backgroundColor: "#D97706" }}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Dial
                </a>
              </div>
            </div>
          ) : (
            /* No cell: scream for help physically */
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-700">
                  No cell signal either
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Move to an open area or higher ground. Atlas will send the moment any signal is detected.
                </p>
              </div>
            </div>
          )}

          {/* Call emergency contact directly */}
          <button
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
            onClick={() => window.open(`tel:${user.phone}`)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#133D13]/10 flex items-center justify-center">
                <span className="text-xs font-bold text-[#133D13]">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-900">
                  Call yourself / emergency contact
                </p>
                <p className="text-xs text-gray-400">{user.phone}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* Cancel emergency */}
        <div className="border-t border-gray-100 pt-3">
          {showCancelConfirm ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 space-y-2">
              <p className="text-xs font-semibold text-gray-700 text-center">
                Are you sure? Cancelling will stop all alerts.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-all"
                >
                  Keep alert active
                </button>
                <button
                  onClick={onCancel}
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-all"
                >
                  Yes, cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50 hover:text-red-600 hover:border-red-200 transition-all"
            >
              <XCircle className="w-3.5 h-3.5" />
              Cancel Emergency
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineEmergencyCard;
