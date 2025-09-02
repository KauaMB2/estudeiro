import { StaticImageData } from "next/image";

export interface AIAgent{
    id: number;
    name: string;
    description: string;
    behavior: string;
    instructions: string;
    personality: string;
    teacher: number;
    public: boolean;
    profilePicture: StaticImageData;
    created?: Date;
    updated?: Date;
}