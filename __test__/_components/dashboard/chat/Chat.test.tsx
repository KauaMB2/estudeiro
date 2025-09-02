import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Chat from "@/app/_components/dashboard/chat/Chat";

vi.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe("Chat component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza mensagens iniciais para id=1", () => {
    render(<Chat id="1" />);

    expect(screen.getByText(/Professora Adaiana: Olá!/i)).toBeInTheDocument();
    expect(screen.getByText(/Estudante: Acho que tenho mais dificuldade/i)).toBeInTheDocument();
    expect(screen.getAllByAltText("Teacher").length).toBeGreaterThan(0);
  });

  it("permite enviar uma mensagem do usuário e exibe resposta da AI", async () => {
    render(<Chat id="1" />);

    const input = screen.getByPlaceholderText("Digite sua mensagem...");
    const button = screen.getByText("Enviar");

    fireEvent.change(input, { target: { value: "Olá, professora!" } });
    fireEvent.click(button);

    expect(screen.getByText("Olá, professora!")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/I received for chat 1: "Olá, professora!"/)).toBeInTheDocument();
    });
  });

  it("abre e fecha o diálogo de configurações", () => {
    render(<Chat id="1" />);

    const configButton = screen.getByText("Configurações");
    fireEvent.click(configButton);

    expect(screen.getByText("Modificar Comportamento do Agente")).toBeInTheDocument();

    const cancelarButton = screen.getByText("Cancelar");
    fireEvent.click(cancelarButton);

    expect(screen.queryByText("Modificar Comportamento do Agente")).not.toBeInTheDocument();
  });

  it("salva alterações do agente e fecha o diálogo", () => {
    render(<Chat id="1" />);

    const configButton = screen.getByText("Configurações");
    fireEvent.click(configButton);

    const behaviorInput = screen.getByLabelText("Comportamento") as HTMLTextAreaElement;
    fireEvent.change(behaviorInput, { target: { value: "Novo comportamento" } });

    const salvarButton = screen.getByText("Salvar Alterações");
    fireEvent.click(salvarButton);

    expect(screen.queryByText("Modificar Comportamento do Agente")).not.toBeInTheDocument();
  });
});
