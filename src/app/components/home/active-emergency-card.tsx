// components/home/ActiveEmergencyCard.tsx
"use client";

import { type ActiveEmergency, EMERGENCY_TYPES } from "../data/mock-home-data";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Flame,
  HeartPulse,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  RefreshCw,
  Share2,
  ShieldAlert,
  User,
  X,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface ActiveEmergencyCardProps {
  emergency: ActiveEmergency;
  onResolve: () => void;
  onCancel: () => void;
}

const RESPONDER_PATH = [
  { x: 72, y: 68 },
  { x: 65, y: 60 },
  { x: 58, y: 52 },
  { x: 50, y: 44 },
  { x: 44, y: 38 },
];

const RESPONDER_PHONE = "+2348031234567";

const typeIconMap: Record<string, React.ReactNode> = {
  general:  <AlertTriangle className="w-4 h-4" />,
  medical:  <HeartPulse className="w-4 h-4" />,
  fire:     <Flame className="w-4 h-4" />,
  security: <ShieldAlert className="w-4 h-4" />,
};

// ── Share Status Bottom Sheet ──────────────────────────────────
interface ShareSheetProps {
  emergency: ActiveEmergency;
  trackingUrl: string;
  onClose: () => void;
}

const ShareSheet: React.FC<ShareSheetProps> = ({ emergency, trackingUrl, onClose }) => {
  const [copied, setCopied] = useState(false);
  const config = EMERGENCY_TYPES.find((t) => t.id === emergency.type) ?? EMERGENCY_TYPES[0];

  const shareMessage = `🚨 Atlas Emergency Alert\n\n${config.label} emergency reported.\n\nTrack live: ${trackingUrl}\n\nResponder is en route. Please stand by.\n\n- Atlas Safety`;

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () =>
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, "_blank");

  const handleSMS = () =>
    window.open(`sms:?body=${encodeURIComponent(shareMessage)}`, "_blank");

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: "Atlas Emergency Alert", text: shareMessage, url: trackingUrl }).catch(() => {});
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-t-2xl overflow-hidden shadow-2xl pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div>
            <p className="text-sm font-bold text-gray-900">Share Live Status</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Contacts can track the emergency in real-time
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>

        {/* Tracking link preview */}
        <div className="mx-5 mt-4 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: config.bg }}
              >
                <span style={{ color: config.color }}>{typeIconMap[emergency.type]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900">{config.label} Emergency — Live</p>
                <p className="text-xs text-gray-400">Updates every 10 seconds</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-semibold text-red-500">LIVE</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5">
            <span className="text-xs text-gray-500 flex-1 truncate font-mono">{trackingUrl}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all flex-shrink-0"
              style={{
                backgroundColor: copied ? "#F0FDF4" : "#F3F4F6",
                color: copied ? "#133D13" : "#374151",
              }}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Share options */}
        <div className="px-5 mt-4 space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Share via</p>

          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-all shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#25D366" }}>
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
              <p className="text-xs text-gray-400">Send live tracking link to a contact</p>
            </div>
          </button>

          <button
            onClick={handleSMS}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-all shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#3B82F6" }}>
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">SMS</p>
              <p className="text-xs text-gray-400">Send via native messages app</p>
            </div>
          </button>

          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-all shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#6B7280" }}>
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">More options</p>
                <p className="text-xs text-gray-400">Telegram, email, AirDrop...</p>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── ActiveEmergencyCard ────────────────────────────────────────
const ActiveEmergencyCard: React.FC<ActiveEmergencyCardProps> = ({
  emergency,
  onResolve,
  onCancel,
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [etaSeconds, setEtaSeconds] = useState((emergency.etaMinutes ?? 2) * 60);
  const [responderPos, setResponderPos] = useState(0);
  const [stage, setStage] = useState<"en_route" | "arrived" | "resolved">("en_route");

  const config = EMERGENCY_TYPES.find((t) => t.id === emergency.type) ?? EMERGENCY_TYPES[0];
  const trackingUrl = `https://atlasapp.ng/track/${emergency.id}`;

  useEffect(() => {
    if (stage !== "en_route") return;
    const t = setInterval(() => {
      setEtaSeconds((prev) => {
        if (prev <= 1) { clearInterval(t); setStage("arrived"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "en_route") return;
    const t = setInterval(() => {
      setResponderPos((prev) => Math.min(prev + 1, RESPONDER_PATH.length - 1));
    }, 8000);
    return () => clearInterval(t);
  }, [stage]);

  const formatEta = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const pos = RESPONDER_PATH[responderPos];

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header strip */}
        <div
          className="px-4 py-3 flex items-center justify-between text-white"
          style={{ backgroundColor: stage === "arrived" ? "#133D13" : config.color }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-bold tracking-wide uppercase">
              {stage === "en_route" ? "Responder En Route" : stage === "arrived" ? "Responder On Scene" : "Resolved"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-white/20 px-2 py-1 rounded-full">
            {typeIconMap[emergency.type]}
            <span className="font-semibold">{config.label}</span>
          </div>
        </div>

        {/* Mock map */}
        <div className="relative bg-gray-100 overflow-hidden" style={{ height: 180 }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect width="100" height="100" fill="#f3f4f6" />
            {[15, 30, 45, 60, 75, 90].map((v) => (
              <React.Fragment key={v}>
                <line x1={v} y1="0" x2={v} y2="100" stroke="#e5e7eb" strokeWidth="3" />
                <line x1="0" y1={v} x2="100" y2={v} stroke="#e5e7eb" strokeWidth="3" />
              </React.Fragment>
            ))}
            <line x1="0" y1="50" x2="100" y2="50" stroke="#d1d5db" strokeWidth="5" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#d1d5db" strokeWidth="5" />
            {[
              [17, 17, 11, 11], [32, 17, 11, 11], [62, 17, 11, 11], [17, 32, 11, 11],
              [62, 32, 11, 11], [17, 62, 11, 11], [32, 62, 11, 11], [62, 62, 11, 11],
              [32, 32, 11, 11],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="1" fill="#e9eaec" />
            ))}
            <polyline
              points={`${pos.x},${pos.y} ${pos.x - 10},${pos.y - 12} 38,35`}
              fill="none" stroke={config.color} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.6"
            />
            <circle cx="38" cy="35" r="5" fill={config.color} opacity="0.2" />
            <circle cx="38" cy="35" r="3" fill={config.color} />
            <circle cx="38" cy="35" r="1.5" fill="white" />
            <circle cx={pos.x} cy={pos.y} r="4" fill="white" stroke={config.color} strokeWidth="1.5" />
            <circle cx={pos.x} cy={pos.y} r="2" fill={config.color} />
          </svg>
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1.5 shadow-sm border border-gray-100">
            <MapPin className="w-3 h-3 text-red-500" />
            <span className="text-xs font-semibold text-gray-700">Your location</span>
          </div>
          <div
            className="absolute bottom-2 right-2 rounded-lg px-2 py-1 flex items-center gap-1.5 shadow-sm text-white text-xs font-bold"
            style={{ backgroundColor: config.color }}
          >
            <Navigation className="w-3 h-3" />
            {stage === "en_route" ? `${formatEta(etaSeconds)} away` : "On scene"}
          </div>
          <div
            className="absolute bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm border border-gray-100 text-xs font-semibold text-gray-700"
            style={{ left: `${pos.x}%`, top: `${pos.y + 6}%`, transform: "translateX(-50%)" }}
          >
            {emergency.responderName ?? "John O."}
          </div>
        </div>

        {/* Info section */}
        <div className="px-4 py-3 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
              <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">ETA</p>
                <p className="text-sm font-black text-gray-900 tabular-nums leading-tight">
                  {stage === "en_route" ? formatEta(etaSeconds) : stage === "arrived" ? "Here" : "Done"}
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
              <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Responder</p>
                <p className="text-sm font-bold text-gray-900 leading-tight truncate">
                  {emergency.responderName ?? "John O."}
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Distance</p>
                <p className="text-sm font-bold text-gray-900 leading-tight">320m</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl px-3 py-2.5 flex items-center gap-2" style={{ backgroundColor: config.bg }}>
            {stage === "en_route" ? (
              <Navigation className="w-4 h-4 flex-shrink-0" style={{ color: config.color }} />
            ) : (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: config.color }} />
            )}
            <p className="text-xs font-medium" style={{ color: config.color }}>
              {stage === "en_route"
                ? `${emergency.responderName ?? "John O."} is on the way · Live location updating every 10s`
                : `${emergency.responderName ?? "John O."} has arrived on scene`}
            </p>
          </div>

          {emergency.status === "pending_sync" && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-red-500 animate-spin flex-shrink-0" style={{ animationDuration: "2s" }} />
              <p className="text-xs font-medium text-red-600">
                Alert queued — retrying every 5s (attempt #{emergency.retryCount ?? 1})
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            {/* Call responder — native dialer */}
            <a
              href={`tel:${RESPONDER_PHONE}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#133D13]" />
              Call responder
            </a>

            {/* Share status — opens sheet */}
            <button
              onClick={() => setShowShareSheet(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-[#133D13]" />
              Share status
            </button>

            {stage === "arrived" && (
              <button
                onClick={onResolve}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all"
                style={{ backgroundColor: "#133D13" }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mark resolved
              </button>
            )}
          </div>

          {/* Cancel emergency */}
          <div className="border-t border-gray-100 pt-2">
            {showCancelConfirm ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 space-y-2">
                <p className="text-xs font-semibold text-gray-700 text-center">
                  Cancel emergency? Responders will be notified.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="flex-1 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    Keep active
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

      {/* Share sheet — outside card to escape overflow:hidden */}
      {showShareSheet && (
        <ShareSheet
          emergency={emergency}
          trackingUrl={trackingUrl}
          onClose={() => setShowShareSheet(false)}
        />
      )}
    </>
  );
};

export default ActiveEmergencyCard;