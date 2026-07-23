export interface BgdNotification {
  id: string;
  type: "reminder" | "encouragement" | "report" | "system";
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionUrl?: string;
}

const NOTIFICATIONS_STORAGE_KEY = "bgd_notifications_list";

export function getNotificationsList(): BgdNotification[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }

  const defaultNotifications: BgdNotification[] = [
    {
      id: "notif-1",
      type: "reminder",
      title: "Rappel de Suivi Quotidien (20h)",
      message: "N'oubliez pas de renseigner votre journal spirituel pour valider votre journée !",
      date: new Date().toISOString(),
      read: false,
      actionUrl: "/suivi",
    },
    {
      id: "notif-2",
      type: "encouragement",
      title: "Encouragement Pastoral",
      message: "Excellente régularité ! Vous avez maintenu 12 jours d'affilée dans la prière.",
      date: new Date(Date.now() - 3600000 * 5).toISOString(),
      read: false,
    },
    {
      id: "notif-3",
      type: "report",
      title: "Compte Rendu Hebdomadaire Prêt",
      message: "Votre bilan spirituel de la semaine est prêt à être transmis au mentor.",
      date: new Date(Date.now() - 3600000 * 24).toISOString(),
      read: true,
      actionUrl: "/comptes-rendus",
    },
  ];

  return defaultNotifications;
}

export function markNotificationAsRead(id: string): BgdNotification[] {
  const list = getNotificationsList();
  const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
  if (typeof window !== "undefined") {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function markAllNotificationsAsRead(): BgdNotification[] {
  const list = getNotificationsList();
  const updated = list.map((n) => ({ ...n, read: true }));
  if (typeof window !== "undefined") {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}
