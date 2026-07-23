"use client";

import React, { useState, useEffect } from "react";
import { Bell, CheckCircle2, Clock, Sparkles, FileText, Check, X } from "lucide-react";
import Link from "next/link";
import {
  BgdNotification,
  getNotificationsList,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/lib/notification-service";

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<BgdNotification[]>([]);

  useEffect(() => {
    setNotifications(getNotificationsList());
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkRead = (id: string) => {
    const updated = markNotificationAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllRead = () => {
    const updated = markAllNotificationsAsRead();
    setNotifications(updated);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "encouragement":
        return <Sparkles className="w-4 h-4 text-blue-600" />;
      case "report":
        return <FileText className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="relative">
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
        title="Centre de notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-blue-950 font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl shadow-blue-950/20 border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-900" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading">
                Notifications ({unreadCount} non lues)
              </span>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] font-semibold text-blue-700 hover:text-blue-900"
              >
                Tout marquer comme lu
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                Aucune notification pour le moment.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3.5 flex items-start gap-3 transition-colors ${
                    !notif.read ? "bg-amber-50/40" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white border border-slate-200/80 shrink-0">
                    {getIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900 truncate">
                        {notif.title}
                      </h5>
                      {!notif.read && (
                        <button
                          onClick={() => handleMarkRead(notif.id)}
                          className="text-slate-400 hover:text-blue-600 p-0.5"
                          title="Marquer comme lu"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {notif.message}
                    </p>

                    {notif.actionUrl && (
                      <Link
                        href={notif.actionUrl}
                        onClick={() => {
                          handleMarkRead(notif.id);
                          setIsOpen(false);
                        }}
                        className="inline-block text-[11px] font-bold text-blue-700 hover:underline pt-0.5"
                      >
                        Ouvrir →
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
