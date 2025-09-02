import { render, screen } from "@testing-library/react";
import InitialPage from "@/app/dashboard/page";
import { describe, expect, it } from "vitest";

vi.mock("@/app/_components/dashboard/SideBar", () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ currentSection, isExpanded }: any) => (
      <div data-testid="sidebar">
        <p>Section: {currentSection}</p>
        <p>isExpanded: {isExpanded ? "yes" : "no"}</p>
      </div>
    ),
  };
});

describe("Dashboard Page", () => {
  it("deve renderizar o SideBar com os props corretos", () => {
    render(<InitialPage />);

    expect(
      screen.getByText(/Section: agents/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/isExpanded: no/i)
    ).toBeInTheDocument();
  });
});
