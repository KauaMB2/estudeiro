// app/register/page.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "@/app/register/page";
import { describe, it, expect } from "vitest";

describe("RegisterPage", () => {
  it("renderiza o título da página", () => {
    render(<RegisterPage />);
    expect(screen.getByText("Criar Conta")).toBeInTheDocument();
  });

  it("renderiza inputs de e-mail, senha e confirmação de senha", () => {
    render(<RegisterPage />);
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirmar Senha")).toBeInTheDocument();
  });

  it("permite digitar e-mail, senha e confirmar senha", async () => {
    render(<RegisterPage />);
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText("E-mail");
    const passwordInput = screen.getByPlaceholderText("Senha");
    const confirmInput = screen.getByPlaceholderText("Confirmar Senha");

    await user.type(emailInput, "teste@email.com");
    await user.type(passwordInput, "123456");
    await user.type(confirmInput, "123456");

    expect(emailInput).toHaveValue("teste@email.com");
    expect(passwordInput).toHaveValue("123456");
    expect(confirmInput).toHaveValue("123456");
  });

  it("mostra erro se as senhas não coincidirem", async () => {
    const { container } = render(<RegisterPage />);
    const user = userEvent.setup();

    const passwordInput = screen.getByPlaceholderText("Senha");
    const confirmInput = screen.getByPlaceholderText("Confirmar Senha");

    await user.type(passwordInput, "123456");
    await user.type(confirmInput, "654321");

    const form = container.querySelector("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(await screen.findByText("As senhas não coincidem")).toBeInTheDocument();
  });

  it("não mostra erro quando as senhas são iguais", async () => {
    const { container } = render(<RegisterPage />);
    const user = userEvent.setup();

    const passwordInput = screen.getByPlaceholderText("Senha");
    const confirmInput = screen.getByPlaceholderText("Confirmar Senha");

    await user.type(passwordInput, "123456");
    await user.type(confirmInput, "123456");

    const form = container.querySelector("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(screen.queryByText("As senhas não coincidem")).not.toBeInTheDocument();
  });

  it("possui link para login", () => {
    render(<RegisterPage />);
    expect(screen.getByText("Faça login")).toHaveAttribute("href", "/");
  });

  it("possui link Registrar que leva para '/'", () => {
    render(<RegisterPage />);
    expect(screen.getByText("Registrar")).toHaveAttribute("href", "/");
  });
});
