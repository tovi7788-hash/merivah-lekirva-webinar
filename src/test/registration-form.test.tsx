import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { insert, navigate } = vi.hoisted(() => ({ insert: vi.fn(), navigate: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from: () => ({ insert }) } }));

import { RegistrationForm } from "@/components/landing/RegistrationForm";

function submitRegistration(source?: string | null) {
  render(<RegistrationForm source={source ?? null} />);
  fireEvent.change(screen.getByLabelText("שם מלא *"), { target: { value: "בדיקת הרשמה" } });
  fireEvent.change(screen.getByLabelText("טלפון נייד *"), { target: { value: "0500000000" } });
  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(screen.getByRole("button"));
}

describe("Registration success navigation", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(cleanup);

  it("saves the same registration fields before navigating to /thank-you", async () => {
    insert.mockResolvedValue({ error: null });
    submitRegistration();
    await waitFor(() => expect(navigate).toHaveBeenCalledWith({ to: "/thank-you" }));
    expect(insert).toHaveBeenCalledWith({ full_name: "בדיקת הרשמה", phone: "0500000000", email: null, consent: true, source: null });
    const saveOrder = insert.mock.invocationCallOrder[0];
    const navigationOrder = navigate.mock.invocationCallOrder[0];
    if (saveOrder === undefined || navigationOrder === undefined) throw new Error("Missing save or navigation call");
    expect(saveOrder).toBeLessThan(navigationOrder);
  });

  it("includes the URL ref source when saving a registration", async () => {
    insert.mockResolvedValue({ error: null });
    submitRegistration("newsletter-test");
    await waitFor(() => expect(navigate).toHaveBeenCalledWith({ to: "/thank-you" }));
    expect(insert).toHaveBeenCalledWith({ full_name: "בדיקת הרשמה", phone: "0500000000", email: null, consent: true, source: "newsletter-test" });
  });

  it("does not navigate when saving fails", async () => {
    insert.mockResolvedValue({ error: { message: "Save failed" } });
    submitRegistration();
    await waitFor(() => expect(screen.getByRole("button")).toBeEnabled());
    expect(insert).toHaveBeenCalledTimes(1);
    expect(navigate).not.toHaveBeenCalled();
  });

  it("saves quiz registrations with the fixed quiz source and optional email", async () => {
    insert.mockResolvedValue({ error: null });
    submitRegistration("quiz");
    await waitFor(() => expect(navigate).toHaveBeenCalledWith({ to: "/thank-you" }));
    expect(insert).toHaveBeenCalledWith({ full_name: "בדיקת הרשמה", phone: "0500000000", email: null, consent: true, source: "quiz" });
  });
});