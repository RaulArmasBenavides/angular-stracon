export interface User {
  id: number;
  fullName: string;
  email: string;
  role: 'Admin' | 'User' | 'Support';
  status: 'Active' | 'Inactive';
  createdAt: string; // ISO string o 'YYYY-MM-DD'
}
