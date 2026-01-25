export interface Supplier {
  id: string;              // Guid
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;       // o Date, según tu API
}
