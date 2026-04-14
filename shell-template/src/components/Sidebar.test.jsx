import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("renders a navigation landmark", () => {
    render(<Sidebar />);
    expect(screen.getByRole("navigation", { name: /back office navigation/i })).toBeInTheDocument();
  });

  it("renders inside an aside element", () => {
    const { container } = render(<Sidebar />);
    expect(container.querySelector("aside.bo-sidebar")).toBeInTheDocument();
  });

  it("renders an empty nav list", () => {
    const { container } = render(<Sidebar />);
    const list = container.querySelector(".bo-nav-list");
    expect(list).toBeInTheDocument();
    expect(list).toBeEmptyDOMElement();
  });
});
