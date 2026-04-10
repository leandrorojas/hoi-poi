import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  it("renders shell app heading", () => {
    render(<App />);
    expect(screen.getByText("Shell App")).toBeInTheDocument();
  });
});
