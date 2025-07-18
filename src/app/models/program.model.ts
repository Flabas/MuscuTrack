export interface Program {
    id: string;
    name: string;
    description?: string;
    created_at: Date | string;
    userId: string;
}