import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders username and password fields with labels", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("shows error when username is empty", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows error when password is empty", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "testuser" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows error when password is too short", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "abc" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows both errors when both fields are empty", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with trimmed username and password on valid submission", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "  testuser  " } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(mockOnSubmit).toHaveBeenCalledWith({ username: "testuser", password: "password123" });
  });

  it("clears errors on successful resubmission", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(screen.getByText("Username is required")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(screen.queryByText("Username is required")).not.toBeInTheDocument();
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
