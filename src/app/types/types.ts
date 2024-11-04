
export type UserRole = "ADMIN" | "USER"
export interface User {
    name: string;
    email: string;
    image: string | null; // image can be a string or null
    id: string;
    role: UserRole; 
  }
  