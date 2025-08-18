'use client';
import Image from "next/image";
import Link from "next/link";
import { AIAgent } from "@/src/utils/models/ai_agent";

interface AgentProps {
  id: number;
  aiAgent: AIAgent;
  skills: string[];
  profilePicture: string;
}

const Agent = ({ id, aiAgent, skills, profilePicture }: AgentProps) => {
  console.log({ id, aiAgent, skills });
  return (
    <Link
      href={`/dashboard/chat/${id}`}
      style={{
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))',
      }}
      className="flex items-center rounded-lg w-full p-4 bg-gray-800 text-white hover:text-black hover:bg-gray-300 hover:cursor-pointer transition-all duration-300 ease-in-out"
    >
      <div className="mr-4 w-1/5">
        <Image
          src={profilePicture}
          alt="Agent Picture"
          width={128}
          height={128}
          className="rounded-full border-4 border-gray-300"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-xl font-semibold mb-2">{aiAgent.name}</h2>
        <p className="text-sm text-gray-500 mb-4">
          {aiAgent.description}
        </p>
        <div className="w-full">
          <h3 className="font-semibold text-md mb-2">Matérias:</h3>
          <ul className="space-y-1">
            {skills.map((skill, index) => (
              <li key={index} className="text-sm">• {skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Agent;