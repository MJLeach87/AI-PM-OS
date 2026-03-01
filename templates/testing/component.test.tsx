/**
 * Component Test Pattern
 *
 * Tests an interactive component that:
 * 1. Renders with props
 * 2. Responds to user events
 * 3. Calls callbacks / Server Actions
 * 4. Shows loading/error/success states
 *
 * Replace [Feature] with your actual component name.
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

// import { [Feature]Form } from "@/components/[feature]/[feature]-form";

// Mock Server Action
// vi.mock("@/actions/[feature]", () => ({
//   create[Feature]: vi.fn().mockResolvedValue({ success: true, id: "new-123" }),
// }));

describe("[Feature]Form", () => {
  const user = userEvent.setup();

  it("renders the form with all required fields", () => {
    // render(<[Feature]Form />);
    // expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("submits valid form data", async () => {
    // render(<[Feature]Form />);

    // await user.type(screen.getByLabelText(/name/i), "Test Item");
    // await user.type(screen.getByLabelText(/description/i), "A description");
    // await user.click(screen.getByRole("button", { name: /save/i }));

    // const { create[Feature] } = await import("@/actions/[feature]");
    // expect(create[Feature]).toHaveBeenCalledWith({
    //   name: "Test Item",
    //   description: "A description",
    // });
  });

  it("shows validation error for empty required field", async () => {
    // render(<[Feature]Form />);

    // await user.click(screen.getByRole("button", { name: /save/i }));
    // expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });

  it("disables submit button while loading", async () => {
    // render(<[Feature]Form />);

    // await user.type(screen.getByLabelText(/name/i), "Test Item");
    // await user.click(screen.getByRole("button", { name: /save/i }));

    // expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
  });

  it("shows success feedback after submission", async () => {
    // render(<[Feature]Form onSuccess={vi.fn()} />);

    // await user.type(screen.getByLabelText(/name/i), "Test Item");
    // await user.click(screen.getByRole("button", { name: /save/i }));

    // expect(await screen.findByText(/created successfully/i)).toBeInTheDocument();
  });

  it("is keyboard navigable", async () => {
    // render(<[Feature]Form />);

    // await user.tab(); // Focus first field
    // expect(screen.getByLabelText(/name/i)).toHaveFocus();

    // await user.tab(); // Focus next field
    // expect(screen.getByLabelText(/description/i)).toHaveFocus();

    // await user.tab(); // Focus submit button
    // expect(screen.getByRole("button", { name: /save/i })).toHaveFocus();
  });
});
