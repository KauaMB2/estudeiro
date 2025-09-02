'use client';

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import KnowledgeIcon from "./../../../src/assets/brain-pictogram-5-svgrepo-com.svg";
import BrainIcon from "./../../../src/assets/ai-svgrepo-com.svg";
import Agents from "./Agents";
import { Button } from "../ui/button";
import CreateAIKnowledge from "./knowledge/CreateAIKnowledge";

interface SidebarProps{
  currentSection: string;
  setCurrentSection: Dispatch<SetStateAction<string>>;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({currentSection,
  setCurrentSection,
  isExpanded,
  setIsExpanded}: SidebarProps) => {
  return (
    <div className="flex h-screen">
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 p-4 transition-all duration-300 ease-in-out 
        ${isExpanded ? 'w-64' : 'w-16'} `}
      >
        <Button
          onClick={()=>{setIsExpanded((prev)=> { return !prev})}}
          className="text-gray-500 mb-4 hover:bg-gray-100 rounded-lg p-1 transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </Button>
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              onClick={() => setCurrentSection('agents')}
              className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <Image width={24} height={24} src={BrainIcon} className="w-5" alt="Camera Icon" />
              {isExpanded && <span className="ms-3">Agentes de I.A</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => setCurrentSection('knowledge')}
              className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <Image width={24} height={24} src={KnowledgeIcon} className="w-5" alt="Folder Icon" />
              {isExpanded && <span className="ms-3">Conhecimento</span>}
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`flex-1 bg-white transition-all duration-300 ease-in-out`}
        style={{
          marginLeft: isExpanded ? '16rem' : '4rem',
        }}
      >
        {currentSection === 'agents' && <Agents />}
        {currentSection === 'knowledge' && <CreateAIKnowledge  />}
      </div>
    </div>
  );
};

export default Sidebar;