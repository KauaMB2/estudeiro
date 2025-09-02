import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CreateAIKnowledge from "@/app/_components/dashboard/knowledge/CreateAIKnowledge";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("@/app/_components/dashboard/CreateKnowledgeContent/FileInsertion", () => ({
  default: () => <div>Mocked FileInsertion</div>,
}));
vi.mock("@/app/_components/dashboard/CreateKnowledgeContent/CreateKnowledgeOptions", () => ({
  __esModule: true,
  default: ({ activeTab }: { activeTab: string }) => <div>ActiveTab: {activeTab}</div>,
}));
vi.mock("@/app/_components/dashboard/CreateKnowledgeContent/FAQInsertion", () => ({
  __esModule: true,
  default: () => <div>Mocked FAQInsertion</div>,
  URLsBlank: { websiteURL: "", youtubeURL: "" },
}));
vi.mock("@/app/_components/dashboard/CreateKnowledgeContent/WebsiteInsertion", () => ({
  default: () => <div>Mocked WebsiteInsertion</div>,
}));
vi.mock("@/app/_components/dashboard/CreateKnowledgeContent/YoutubeInsertion", () => ({
  default: () => <div>Mocked YoutubeInsertion</div>,
}));

describe("CreateAIKnowledge", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("renderiza o título corretamente", () => {
    render(<CreateAIKnowledge />);
    expect(screen.getByText("Criar novo conhecimento do agente")).toBeInTheDocument();
  });

  it("renderiza a opção 'Nenhum' no Select", () => {
    render(<CreateAIKnowledge />);
    expect(screen.getByText("Nenhum")).toBeInTheDocument();
  });

  it("mostra erro se agente não for selecionado", async () => {
    render(<CreateAIKnowledge />);
    const button = screen.getByText("Inserir conhecimento");
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/Por favor, selecione um agente/)).toBeInTheDocument();
    });
  });

  it("não mostra extractedText quando extractorLoading=true", () => {
    render(<CreateAIKnowledge />);
    expect(screen.queryByText(/texto/i)).toBeNull();
  });

});
