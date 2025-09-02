import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Sidebar from "@/app/_components/dashboard/SideBar";

vi.mock("./../../../app/_components/dashboard/Agents", () => ({ default: () => <div>Mocked Agents</div> }));
vi.mock("./../../../app/_components/dashboard/knowledge/CreateAIKnowledge", () => ({ default: () => <div>Mocked Knowledge</div> }));

vi.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @next/next/no-img-element
  default: (props: any) => <img {...props} alt={props.alt} />,
}));

describe("Sidebar", () => {
  it("quando contraído (isExpanded=false) mostra apenas os ícones e botão dispara setIsExpanded", () => {
    const setCurrentSection = vi.fn();
    const setIsExpanded = vi.fn();

    render(
      <Sidebar
        currentSection="agents"
        setCurrentSection={setCurrentSection}
        isExpanded={false}
        setIsExpanded={setIsExpanded}
      />
    );

    expect(screen.getByAltText("Camera Icon")).toBeInTheDocument();
    expect(screen.getByAltText("Folder Icon")).toBeInTheDocument();

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(setIsExpanded).toHaveBeenCalled();
  });

  it("quando expandido (isExpanded=true) os rótulos aparecem e clicar nos links chama setCurrentSection", () => {
    const setCurrentSection = vi.fn();
    const setIsExpanded = vi.fn();

    render(
      <Sidebar
        currentSection="agents"
        setCurrentSection={setCurrentSection}
        isExpanded={true}
        setIsExpanded={setIsExpanded}
      />
    );

    const knowledgeLink = screen.getByText("Conhecimento");
    fireEvent.click(knowledgeLink);
    expect(setCurrentSection).toHaveBeenCalledWith("knowledge");

    const agentsLink = screen.getByText("Agentes de I.A");
    fireEvent.click(agentsLink);
    expect(setCurrentSection).toHaveBeenCalledWith("agents");
  });

  it("renderiza o componente correto de acordo com currentSection (Agents / Knowledge)", () => {
    const setCurrentSection = vi.fn();
    const setIsExpanded = vi.fn();

    const { rerender } = render(
      <Sidebar
        currentSection="agents"
        setCurrentSection={setCurrentSection}
        isExpanded={true}
        setIsExpanded={setIsExpanded}
      />
    );

    expect(screen.getByText("Mocked Agents")).toBeInTheDocument();

    rerender(
      <Sidebar
        currentSection="knowledge"
        setCurrentSection={setCurrentSection}
        isExpanded={true}
        setIsExpanded={setIsExpanded}
      />
    );

    expect(screen.getByText("Mocked Knowledge")).toBeInTheDocument();
  });
});
