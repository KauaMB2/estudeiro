'use client';
import Agent from './Agent';
import { useState } from 'react';
import { AIAgentDialog } from './Dialog';
import { AIAgent } from '@/src/utils/models/ai_agent';
import AdaianaPicture from "@/src/assets/adaianateacher.png";
import AnaClaudiaPicture from "@/src/assets/anaclaudiateacher.png";
import RenanPicture from "@/src/assets/renanteacher.png";
interface AgentType {
  aiAgent: AIAgent;
  skills: string[];
}

const Agents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [agents] = useState<AgentType[]>([
    {
      aiAgent: { id: 1, name: "Adaiana Orcheski", description: "Professor da filosofia", profilePicture: AdaianaPicture },
      skills: ['Filosofia', 'Lógica'],
    },
    {
      aiAgent: { id: 2, name: "Renan Sthel", description: "Professor de probabilidade", profilePicture: RenanPicture },
      skills: ['Probabilidade', 'Processos estocásticos', 'Cálculo']
    },
    {
      aiAgent: { id: 3, name: "Ana Cláudia", description: "Professor de probabilidade", profilePicture: AnaClaudiaPicture },
      skills: ['Biologia']
    },
  ]);
  const filteredAgents = agents.filter(agent =>
    agent.aiAgent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.aiAgent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.skills.some(skill => 
      skill.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  return (
    <div className='flex flex-col'>
      <div className="bg-white px-6 pt-4 rounded-lg flex justify-between">
        <div className="w-[20%] py-0.5">
          <input 
            type="text" 
            id="searchInput"
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            placeholder="Pesquisar" 
            className="border border-gray-300 rounded-lg p-2 flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <AIAgentDialog allTeachers={[]} create={true} aiAgent={null} />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6 p-6 w-full'>
        {filteredAgents.map(agent => (
          <Agent
            key={agent.aiAgent.id}
            id={agent.aiAgent.id}
            aiAgent={agent.aiAgent}
            skills={agent.skills}
            profilePicture={agent.aiAgent.profilePicture}
          />
        ))}
      </div>
    </div>
  )
}

export default Agents;