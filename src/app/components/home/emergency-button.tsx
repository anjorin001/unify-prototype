// components/home/EmergencyButton.tsx
"use client";

import {
  AlertTriangle,
  Flame,
  HeartPulse,
  PhoneCall,
  Save,
  Shield,
  ShieldAlert,
  WifiOff,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { EMERGENCY_TYPES, type EmergencyType } from "../data/mock-home-data";

interface EmergencyButtonProps {
  selectedType: EmergencyType;
  onTypeChange: (type: EmergencyType) => void;
  onEmergencyConfirmed: (type: EmergencyType) => void;
  isOnline: boolean;
  hasCellSignal: boolean;
}

const typeIcons: Record<EmergencyType, React.ReactNode> = {
  general: <AlertTriangle className="w-4 h-4" />,
  medical: <HeartPulse className="w-4 h-4" />,
  fire: <Flame className="w-4 h-4" />,
  security: <ShieldAlert className="w-4 h-4" />,
};

const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  selectedType,
  onTypeChange,
  onEmergencyConfirmed,
  isOnline,
  hasCellSignal,
}) => {
  const [counting, setCounting] = useState(false);
  const [count, setCount] = useState(5);
  const [showOfflineConfirm, setShowOfflineConfirm] = useState(false);
  const [swipeFlash, setSwipeFlash] = useState<string | null>(null); // type id that just changed
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const selectedConfig = EMERGENCY_TYPES.find((t) => t.id === selectedType)!;
  const isFullyOffline = !isOnline && !hasCellSignal;

  // Cycle type on swipe
  const handleSwipeType = (direction: "left" | "right") => {
    if (counting) return;
    const idx = EMERGENCY_TYPES.findIndex((t) => t.id === selectedType);
    const next = direction === "left"
      ? (idx + 1) % EMERGENCY_TYPES.length
      : (idx - 1 + EMERGENCY_TYPES.length) % EMERGENCY_TYPES.length;
    const nextType = EMERGENCY_TYPES[next].id as EmergencyType;
    onTypeChange(nextType);
    setSwipeFlash(nextType);
    setTimeout(() => setSwipeFlash(null), 500);
  };

  const startCountdown = () => {
    setCounting(true);
    setCount(5);
  };

  const cancelCountdown = () => {
    setCounting(false);
    setCount(5);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!counting) return;
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setCounting(false);
          setCount(5);
          onEmergencyConfirmed(selectedType);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [counting]);

  const circumference = 2 * Math.PI * 54;
  const progress = counting ? ((5 - count) / 5) * circumference : 0;

  // Offline confirmation overlay (no internet, no cell)
  if (showOfflineConfirm) {
    return (
      <div className="flex flex-col items-center gap-4 py-2">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <WifiOff className="w-7 h-7 text-red-500" />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-gray-900">No signal detected</p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-xs">
            Your alert will be saved locally and sent automatically the moment
            your device finds a signal.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <button
            onClick={() => {
              setShowOfflineConfirm(false);
              onEmergencyConfirmed(selectedType);
            }}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-all shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save alert & keep trying
          </button>
          <button
            onClick={() => setShowOfflineConfirm(false)}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Emergency type selector */}
      <div className="flex gap-2 flex-wrap justify-center">
        {EMERGENCY_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => !counting && onTypeChange(type.id as EmergencyType)}
            disabled={counting}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all disabled:opacity-50 ${
              selectedType === type.id
                ? "border-transparent shadow-sm"
                : "border-gray-200 text-gray-500 bg-white hover:border-gray-300"
            } ${swipeFlash === type.id ? "scale-110" : "scale-100"}`}
            style={
              selectedType === type.id
                ? {
                    backgroundColor: type.bg,
                    color: type.color,
                    borderColor: type.color + "40",
                    boxShadow: swipeFlash === type.id
                      ? `0 0 0 3px ${type.color}40`
                      : undefined,
                  }
                : {}
            }
          >
            <span
              style={{
                color: selectedType === type.id ? type.color : undefined,
              }}
            >
              {typeIcons[type.id as EmergencyType]}
            </span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Swipe hint */}
      {!counting && (
        <p className="text-xs text-gray-400 -mt-2 text-center select-none tracking-wide opacity-70">
          ← swipe button to change →
        </p>
      )}

      {/* The Button */}
      <div className="relative flex items-center justify-center">
        {!counting && (
          <>
            <span
              className="absolute w-52 h-52 rounded-full opacity-10 animate-ping pointer-events-none"
              style={{
                backgroundColor: isFullyOffline
                  ? "#DC2626"
                  : selectedConfig.color,
                animationDuration: "2s",
              }}
            />
            <span
              className="absolute w-44 h-44 rounded-full opacity-15 animate-ping pointer-events-none"
              style={{
                backgroundColor: isFullyOffline
                  ? "#DC2626"
                  : selectedConfig.color,
                animationDuration: "2s",
                animationDelay: "0.4s",
              }}
            />
          </>
        )}

        {counting && (
          <svg className="absolute w-52 h-52 -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="4"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={selectedConfig.color}
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.9s linear" }}
            />
          </svg>
        )}

        <button
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null || touchStartY.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            const dy = e.changedTouches[0].clientY - touchStartY.current;
            touchStartX.current = null;
            touchStartY.current = null;
            // Only count as swipe if horizontal movement dominates and > 40px
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
              e.preventDefault();
              handleSwipeType(dx < 0 ? "left" : "right");
              return; // don't trigger click/countdown
            }
          }}
          onClick={() => {
            if (counting) {
              cancelCountdown();
              return;
            }
            if (isFullyOffline) {
              setShowOfflineConfirm(true);
              return;
            }
            startCountdown();
          }}
          className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 transition-all active:scale-95 select-none"
          style={{
            backgroundColor: counting
              ? "#1f2937"
              : isFullyOffline
                ? "#DC2626"
                : selectedConfig.color,
            boxShadow: counting
              ? "0 20px 60px rgba(0,0,0,0.4)"
              : `0 20px 60px ${isFullyOffline ? "#DC262660" : selectedConfig.color + "60"}, 0 8px 24px ${isFullyOffline ? "#DC262640" : selectedConfig.color + "40"}`,
          }}
        >
          {counting ? (
            <>
              <span className="text-white text-5xl font-black leading-none tabular-nums">
                {count}
              </span>
              <span className="text-white/60 text-xs font-medium tracking-wide">
                TAP TO CANCEL
              </span>
              <X className="w-4 h-4 text-white/40 absolute bottom-5" />
            </>
          ) : (
            <>
              {isFullyOffline ? (
                <WifiOff className="w-10 h-10 text-white" strokeWidth={1.5} />
              ) : (
                <Shield className="w-10 h-10 text-white" strokeWidth={1.5} />
              )}
              <span className="text-white text-sm font-bold tracking-widest uppercase">
                SOS
              </span>
              <span className="text-white/60 text-xs">
                {isFullyOffline
                  ? "Offline mode"
                  : !isOnline
                    ? "SMS only"
                    : "Tap to send"}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Label below */}
      <div className="text-center space-y-1">
        {counting ? (
          <p className="text-sm font-semibold text-gray-700">
            Sending{" "}
            <span style={{ color: selectedConfig.color }}>
              {selectedConfig.label}
            </span>{" "}
            alert in {count}s...
          </p>
        ) : isFullyOffline ? (
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-semibold text-red-600">
              No signal — tap to queue alert
            </p>
            <p className="text-xs text-gray-400">
              Will auto-send when connection returns
            </p>
          </div>
        ) : !isOnline && hasCellSignal ? (
          <div className="flex items-center justify-center gap-1.5 text-amber-600">
            <PhoneCall className="w-3.5 h-3.5" />
            <p className="text-xs font-semibold">Tap SOS or dial *346*911#</p>
          </div>
        ) : (
          <p className="text-sm text-gray-400 font-medium">
            Tap for{" "}
            <span className="font-semibold text-gray-600">
              {selectedConfig.label.toLowerCase()} emergency
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default EmergencyButton;
