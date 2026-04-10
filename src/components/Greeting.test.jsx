import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Greeting from "./Greeting";

describe("Greeting", () => {
  it("renders default greeting", () => {
    render(<Greeting />);
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });

  it("renders greeting with custom name", () => {
    render(<Greeting name="Hoi-Poi" />);
    expect(screen.getByText("Hello, Hoi-Poi!")).toBeInTheDocument();
  });
});
