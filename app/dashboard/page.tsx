'use client';

import { useState } from "react";
import Sidebar from "../_components/dashboard/SideBar"

const InitialPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('agents');
  return (
    <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
  )
}

export default InitialPage