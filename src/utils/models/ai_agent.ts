export interface AIAgent{
    id: number;
    name: string;
    description: string;
    behavior: string;
    instructions: string;
    personality: string;
    teacher: number;
    public: boolean;
    created?: Date;
    updated?: Date;
}