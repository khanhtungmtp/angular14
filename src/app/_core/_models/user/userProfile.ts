export interface UserProfile {
    userid: string;
    name: string;
    password: string;
    email: string;
    role: string | null;
    isActive: boolean | null;
}
export interface UserUpdate {
    userid: string;
    role: string | null;
    isActive: boolean | null;
}