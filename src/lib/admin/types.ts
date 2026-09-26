export type AdminRole = "ADMIN" | "MANAGER" | "EDITOR" | "VIEWER";

export type AdminSession = {
  email: string;
  role: AdminRole;
  name: string;
  sessionId: string;
  expiresAt: number;
};

export type AdminPropertySummary = {
  id: string;
  reference: string;
  title: string;
  type: string;
  status: string;
  price: string;
  website: string;
  zoopla: string;
  updated: string;
};

export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Closed";
export type ViewingStatus =
  | "Requested"
  | "Contact Required"
  | "Booked"
  | "Completed"
  | "Cancelled"
  | "No Show";
export type ValuationStatus = "New" | "Contacted" | "Qualified" | "Closed";
export type RepairStatus =
  | "New"
  | "Landlord Contact Required"
  | "Awaiting Approval"
  | "Contractor Required"
  | "Booked"
  | "In Progress"
  | "Completed"
  | "Closed";
