/* eslint-disable react-hooks/set-state-in-effect */
// components/home/HomeScreen.tsx
"use client";

import { Bell, BookOpen } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MOCK_RECENT_ALERTS,
  MOCK_RESPONDERS,
  type ActiveEmergency,
  type EmergencyType,
  type RecentAlert,
} from "./data/mock-home-data";
import { MOCK_USER } from "./data/mock-user";
import ActiveEmergencyCard from "./home/active-emergency-card";
import EmergencyButton from "./home/emergency-button";
import EmergencyConfirmedModal from "./home/emergency-confirmed-model";
import OfflineEmergencyCard from "./home/inactive-emergency-card";
import NearbyResponders from "./home/nearby-responders";
import RecentActivity from "./home/recent-activity";
import StatusBar from "./home/status-bar";
import type { User } from "./types";

interface HomeScreenProps {
  user?: User;
}

const LS_ACTIVE_KEY = "atlas_active_emergency";
const LS_ALERTS_KEY = "atlas_recent_alerts";

const HomeScreen: React.FC<HomeScreenProps> = ({ user = MOCK_USER }) => {
  const navigate = useNavigate();
  // ── Network simulation state (toggle-able for demo) ─────────
  const [isOnline, setIsOnline] = useState(true);
  const [hasCellSignal, setHasCellSignal] = useState(true);

  // ── Emergency state ─────────────────────────────────────────
  const [selectedType, setSelectedType] = useState<EmergencyType>("general");
  const [showModal, setShowModal] = useState(false);
  const [activeEmergency, setActiveEmergency] =
    useState<ActiveEmergency | null>(() => {
      if (typeof window === "undefined") return null;
      try {
        const saved = localStorage.getItem(LS_ACTIVE_KEY);
        return saved ? (JSON.parse(saved) as ActiveEmergency) : null;
      } catch {
        return null;
      }
    });

  // ── Alert history (merges mock + local) ─────────────────────
  const [alerts, setAlerts] = useState<RecentAlert[]>(() => {
    if (typeof window === "undefined") return MOCK_RECENT_ALERTS;
    try {
      const saved = localStorage.getItem(LS_ALERTS_KEY);
      return saved ? (JSON.parse(saved) as RecentAlert[]) : MOCK_RECENT_ALERTS;
    } catch {
      return MOCK_RECENT_ALERTS;
    }
  });

  // ── Retry counter for offline queue ─────────────────────────
  const [retryCount, setRetryCount] = useState(0);
  const retryRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const firstName = user.name.split(" ")[0];
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // ── Persist active emergency to localStorage ────────────────
  useEffect(() => {
    if (activeEmergency) {
      localStorage.setItem(LS_ACTIVE_KEY, JSON.stringify(activeEmergency));
    } else {
      localStorage.removeItem(LS_ACTIVE_KEY);
    }
  }, [activeEmergency]);

  // ── Persist alerts to localStorage ──────────────────────────
  useEffect(() => {
    localStorage.setItem(LS_ALERTS_KEY, JSON.stringify(alerts));
  }, [alerts]);

  // ── Retry loop: runs every 5s when offline + pending alert ───
  useEffect(() => {
    const hasPending = activeEmergency?.status === "pending_sync";

    if (!isOnline && hasPending) {
      retryRef.current = setInterval(() => {
        setRetryCount((c) => c + 1);
        // If online comes back, this effect will re-run and clear interval
      }, 5000);
    }

    // If we were offline and come back online with a pending alert
    if (isOnline && hasPending) {
      // Simulate sync success
      setActiveEmergency((prev) =>
        prev
          ? {
              ...prev,
              status: "dispatched",
              responderName: "John O.",
              etaMinutes: 2,
            }
          : null,
      );

      setRetryCount(0);
      if (retryRef.current) clearInterval(retryRef.current);
    }

    return () => {
      if (retryRef.current) clearInterval(retryRef.current);
    };
  }, [isOnline, activeEmergency?.status]);

  // ── Called when countdown hits 0 ────────────────────────────
  const handleEmergencyConfirmed = useCallback(
    (type: EmergencyType) => {
      const newAlert: ActiveEmergency = {
        id: `ALT${Date.now()}`,
        type,
        status: isOnline ? "sending" : "pending_sync",
        triggeredAt: Date.now(),
        location: "Victoria Island, Lagos",
        retryCount: 0,
        ...(isOnline && { responderName: "John O.", etaMinutes: 2 }),
      };

      setActiveEmergency(newAlert);
      setShowModal(true);

      // Online: simulate status upgrade to "dispatched" after 3s
      if (isOnline) {
        setTimeout(() => {
          setActiveEmergency((prev) =>
            prev ? { ...prev, status: "dispatched" } : null,
          );
        }, 3000);
      }
    },
    [isOnline],
  );

  // ── Called when user dismisses confirmed modal ───────────────
  const handleModalDismiss = useCallback(() => {
    setShowModal(false);
    // Active card takes over — no change to activeEmergency state
  }, []);

  // ── Called when user marks emergency resolved ────────────────
  const handleResolve = useCallback(() => {
    if (!activeEmergency) return;

    const elapsed = Math.round(
      (Date.now() - activeEmergency.triggeredAt) / 1000,
    );
    const newEntry: RecentAlert = {
      id: activeEmergency.id,
      type:
        activeEmergency.type === "general" ? "general" : activeEmergency.type,
      date: "Just now",
      location: activeEmergency.location,
      status: "resolved",
      responseTimeSeconds: elapsed,
      responderName: activeEmergency.responderName,
    };

    setAlerts((prev) => [newEntry, ...prev.slice(0, 9)]);
    setActiveEmergency(null);
    setRetryCount(0);
  }, [activeEmergency]);

  // ── Called when user cancels the emergency ──────────────────
  const handleCancel = useCallback(() => {
    if (!activeEmergency) return;

    const newEntry: RecentAlert = {
      id: activeEmergency.id,
      type:
        activeEmergency.type === "general" ? "general" : activeEmergency.type,
      date: "Just now",
      location: activeEmergency.location,
      status: "cancelled",
    };

    setAlerts((prev) => [newEntry, ...prev.slice(0, 9)]);
    setActiveEmergency(null);
    setShowModal(false);
    setRetryCount(0);
    if (retryRef.current) clearInterval(retryRef.current);
  }, [activeEmergency]);

  const hasPendingAlert = activeEmergency?.status === "pending_sync";

  return (
    <>
      <div className="h-full overflow-y-auto flex flex-col gap-5 px-4 pt-5 pb-28 max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">{greeting},</p>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              {firstName} 👋
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/splash")}
              className="w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
              title="View onboarding guide"
            >
              <BookOpen className="w-4 h-4 text-gray-600" />
            </button>
            <button className="relative w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </div>
        {/* Network toggle (prototype only) */}
        <div className="flex gap-2 p-2 bg-gray-100 rounded-xl text-xs">
          <span className="text-gray-400 font-medium self-center mr-1">
            Demo:
          </span>
          {[
            { label: "🟢 Online", online: true, cell: true },
            { label: "🟡 Cell only", online: false, cell: true },
            { label: "🔴 Offline", online: false, cell: false },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => {
                setIsOnline(opt.online);
                setHasCellSignal(opt.cell);
              }}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                isOnline === opt.online && hasCellSignal === opt.cell
                  ? "bg-white shadow-sm text-gray-800"
                  : "text-gray-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {/* Status bar */}
        <StatusBar
          isOnline={isOnline}
          hasCellSignal={hasCellSignal}
          locationEnabled={true}
          hasPendingAlert={hasPendingAlert}
          retryCount={retryCount}
        />

        {activeEmergency && !showModal ? (
          activeEmergency.status === "pending_sync" ? (
            <OfflineEmergencyCard
              emergency={activeEmergency}
              user={user}
              retryCount={retryCount}
              hasCellSignal={hasCellSignal}
              onCancel={handleCancel}
            />
          ) : (
            <ActiveEmergencyCard
              emergency={activeEmergency}
              onResolve={handleResolve}
              onCancel={handleCancel}
            />
          )
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-8">
            <EmergencyButton
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              onEmergencyConfirmed={handleEmergencyConfirmed}
              isOnline={isOnline}
              hasCellSignal={hasCellSignal}
            />
          </div>
        )}
        {/* Nearby Responders */}
        {activeEmergency && activeEmergency.status !== "pending_sync" && (
          <NearbyResponders responders={MOCK_RESPONDERS} />
        )}
        {/* Recent Activity — live, driven by state */}
        <RecentActivity alerts={alerts} />
        {/* Safety tip */}
        <div className="bg-[#133D13]/5 border border-[#133D13]/10 rounded-xl px-4 py-3 flex gap-3 items-start">
          <div className="w-1.5 h-1.5 rounded-full bg-[#133D13] mt-1.5 flex-shrink-0" />
          <p className="text-xs text-[#133D13]/80 leading-relaxed">
            <span className="font-semibold">Stay safe tip:</span> Share your
            live location with trusted contacts before traveling at night.
          </p>
        </div>
      </div>

      {/* Confirmed modal — shows immediately after countdown */}
      {showModal && activeEmergency && (
        <EmergencyConfirmedModal
          emergencyType={activeEmergency.type}
          user={user}
          isOnline={isOnline}
          onDismiss={handleModalDismiss}
        />
      )}
    </>
  );
};

export default HomeScreen;
