import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("hoiPoi/components", () => ({
  Greeting: ({ name }) => <span>Hello, {name}!</span>,
}));

describe("App", () => {
  it("renders shell app heading", () => {
    render(<App />);
    expect(screen.getByText("Shell App")).toBeInTheDocument();
  });

  it("renders remote greeting component", async () => {
    render(<App />);
    expect(await screen.findByText("Hello, Hoi-Poi!")).toBeInTheDocument();
  });
});
