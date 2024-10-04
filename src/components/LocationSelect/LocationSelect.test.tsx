import {
  act,
  fireEvent,
  render,
  waitFor,
  screen,
} from "@testing-library/react";
import LocationSelect from ".";
import { vitest } from "vitest";

describe("LocationSelect", () => {
  it("should fetch and display city options based on input", async () => {
    const handleChange = vitest.fn();

    render(<LocationSelect onChange={handleChange} />);

    const input = screen.getByRole("combobox");

    // Simulate typing 'Paris' in the input
    act(() => {
      fireEvent.change(input, { target: { value: "Paris" } });
    });

    // Wait for the options to appear
    await waitFor(() => {
      expect(screen.getByText("Paris")).toBeInTheDocument();
    });

    // Simulate selecting 'Paris'
    fireEvent.click(screen.getByText("Paris"));

    // Ensure that onChange was called with the correct value
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          label: "Paris",
          value: JSON.stringify({
            latitude: 48.8566,
            longitude: 2.3522,
          }),
        }),
      );
    });
  });

  it("should not display any cities if input does not match", async () => {
    render(<LocationSelect onChange={vitest.fn()} />);

    const input = screen.getByRole("combobox");

    // Simulate typing a non-matching city in the input
    act(() => {
      fireEvent.change(input, { target: { value: "NonExistentCity" } });
    });

    // Wait for the result
    await waitFor(() => {
      expect(screen.queryByText("Paris")).not.toBeInTheDocument();
      expect(screen.queryByText("New York")).not.toBeInTheDocument();
    });
  });
});
