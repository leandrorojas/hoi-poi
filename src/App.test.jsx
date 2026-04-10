import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  it("renders Hoi-Poi text", () => {
    render(<App />);
    expect(screen.getByText("Hoi-Poi")).toBeInTheDocument();
  });
});
