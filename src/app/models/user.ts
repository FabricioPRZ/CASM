export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    specialty: string;
    phone: string;
    role?: string;
    profileImage?: string;
    isPremium?: boolean;
  }
  