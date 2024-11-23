export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  last_name: string;
  speciality?: string | null;
  phone?: string | null;
  role?: string | null;
  document?: string | null;
  profile_img?: string | null;
  id_referency?: string | null;
  premium?: boolean;
}
