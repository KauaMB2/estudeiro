import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/app/page";
import { describe, it, expect } from "vitest";

describe("LoginPage", () => {
  it("renderiza o título da página", () => {
    render(<LoginPage />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("permite digitar e-mail e senha", async () => {
    render(<LoginPage />);
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText("E-mail");
    const passwordInput = screen.getByPlaceholderText("Senha");

    await user.type(emailInput, "teste@email.com");
    await user.type(passwordInput, "123456");

    expect(emailInput).toHaveValue("teste@email.com");
    expect(passwordInput).toHaveValue("123456");
  });

  it("mostra link para registro", () => {
    render(<LoginPage />);
    expect(screen.getByText("Registre-se")).toHaveAttribute("href", "/register");
  });
});
