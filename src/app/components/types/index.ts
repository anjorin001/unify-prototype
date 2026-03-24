export interface User {
  name: string;
  email: string;
  phone: string;
  avatarInitials?: string;
}

export type TabId = "home" | "history" | "profile";

export interface NavItem {
  id: TabId;
  label: string;
  icon: React.ElementType;
}
