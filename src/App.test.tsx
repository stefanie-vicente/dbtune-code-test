import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders refetch button", () => {
  render(<App />);
  const refetchButton = screen.getByRole("button", { name: /refetch data/i });
  expect(refetchButton).toBeInTheDocument();
});
