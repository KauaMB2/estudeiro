import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Agents from "@/app/_components/dashboard/Agents";

vi.mock("@/app/_components/dashboard/Dialog", () => ({
  AIAgentDialog: () => <div>Mocked AIAgentDialog</div>,
}));

vi.mock("@/app/_components/dashboard/Agent", () => ({
  default: () => <div>Mocked AIAgent</div>,
}));

describe("Agentes", () => {
  it("Exibe agentes", () => {
    render(<Agents />);

    expect(screen.getByPlaceholderText("Pesquisar")).toBeInTheDocument();
  });
});
