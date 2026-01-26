export interface User {
  id: number;
  fullName: string;
  email: string;
  role: 'Admin' | 'User' | 'Support';
  status: 'Active' | 'Inactive';
  created: string; // ISO string o 'YYYY-MM-DD'
}
