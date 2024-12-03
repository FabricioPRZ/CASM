export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  last_name: string;
  speciality?: string | null;
  phone?: string | null;
  role_name: string;
  cedula?: string | null;
  profile_img?: string | null;
  address?: string | null;
  premium?: boolean;
  is_active: boolean;
}
