// components/home/RecentActivity.tsx
"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Flame,
  HeartPulse,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { type RecentAlert } from "../data/mock-home-data";

interface RecentActivityProps {
  alerts: RecentAlert[];
}

const typeConfig = {
  security: {
    icon: <ShieldCheck className="w-4 h-4" />,
    color: "#133D13",
    bg: "#F0FDF4",
    label: "Security",
  },
  medical: {
    icon: <HeartPulse className="w-4 h-4" />,
    color: "#2563EB",
    bg: "#EFF6FF",
    label: "Medical",
  },
  fire: {
    icon: <Flame className="w-4 h-4" />,
    color: "#EA580C",
    bg: "#FFF7ED",
    label: "Fire",
  },
  false_alarm: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "#9CA3AF",
    bg: "#F9FAFB",
    label: "False Alarm",
  },
  general: {
    icon: <ShieldCheck className="w-4 h-4" />,
    color: "#6B7280",
    bg: "#F3F4F6",
    label: "General",
  },
};

const statusConfig = {
  resolved: {
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />,
    label: "Resolved",
    text: "text-green-600",
  },
  pending: {
    icon: <Clock className="w-3.5 h-3.5 text-amber-500" />,
    label: "Pending",
    text: "text-amber-600",
  },
  cancelled: {
    icon: <XCircle className="w-3.5 h-3.5 text-gray-400" />,
    label: "Cancelled",
    text: "text-gray-500",
  },
};

const RecentActivity: React.FC<RecentActivityProps> = ({ alerts }) => {
  const navigate = useNavigate();

  if (alerts.length === 0) {
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
        <div className="bg-white border border-gray-100 rounded-xl px-4 py-6 text-center shadow-sm">
          <ShieldCheck className="w-8 h-8 text-[#133D13]/30 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-500">
            No incidents recorded
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Stay safe out there</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
        <button
          onClick={() => {
            navigate("/history");
          }}
          className="text-xs text-[#133D13] font-medium hover:underline"
        >
          View all
        </button>
      </div>

      <div className="space-y-2">
        {alerts.slice(0, 3).map((alert) => {
          const tConf = typeConfig[alert.type];
          const sConf = statusConfig[alert.status];
          return (
            <div
              key={alert.id}
              className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
            >
              {/* Type icon */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: tConf.bg, color: tConf.color }}
              >
                {tConf.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {tConf.label} Alert
                  </p>
                  <div className="flex items-center gap-1">
                    {sConf.icon}
                    <span className={`text-xs font-medium ${sConf.text}`}>
                      {sConf.label}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-800 mt-0.5">
                  {alert.date} · {alert.location}
                </p>
                {alert.responseTimeSeconds && (
                  <p className="text-xs text-gray-800 mt-1">
                    Response:{" "}
                    <span className="font-semibold text-[#133D13]">
                      {alert.responseTimeSeconds}s
                    </span>
                    {alert.responderName && (
                      <span> · {alert.responderName}</span>
                    )}
                  </p>
                )}
              </div>

              {/* Alert ID */}
              <span className="text-xs text-gray-800 font-mono flex-shrink-0">
                #{alert.id}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
