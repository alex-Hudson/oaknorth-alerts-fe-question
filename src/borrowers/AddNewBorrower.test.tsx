import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AddNewBorrower } from "./AddNewBorrower"; // Adjust the import path accordingly

beforeEach(() => {
  global.fetch = jest.fn((): any => {
    return Promise.resolve({
      json: () => Promise.resolve(),
    });
  });
});

test("renders AddNewBorrower component", () => {
  render(<AddNewBorrower />);

  expect(screen.getByText("Add new borrower")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("total_revenue")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("ebitda")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("dscr")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("debt_to_ebitda")).toBeInTheDocument();
  expect(screen.getByText("Submit")).toBeInTheDocument();
});

test("updates input values correctly", () => {
  render(<AddNewBorrower />);

  const nameInput = screen.getByPlaceholderText("name");
  fireEvent.change(nameInput, { target: { value: "New Borrower" } });
  expect(nameInput.value).toBe("New Borrower");

  const totalRevenueInput = screen.getByPlaceholderText("total_revenue");
  fireEvent.change(totalRevenueInput, { target: { value: "1000" } });
  expect(totalRevenueInput.value).toBe("1000");

  const ebitdaInput = screen.getByPlaceholderText("ebitda");
  fireEvent.change(ebitdaInput, { target: { value: "500" } });
  expect(ebitdaInput.value).toBe("500");
});

test("submits the form with correct data", async () => {
  render(<AddNewBorrower />);

  const nameInput = screen.getByPlaceholderText("name");
  fireEvent.change(nameInput, { target: { value: "New Borrower" } });

  const totalRevenueInput = screen.getByPlaceholderText("total_revenue");
  fireEvent.change(totalRevenueInput, { target: { value: "1000" } });

  const ebitdaInput = screen.getByPlaceholderText("ebitda");
  fireEvent.change(ebitdaInput, { target: { value: "500" } });

  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/borrowers",
      expect.objectContaining({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "New Borrower",
          total_revenue: 1000,
          ebitda: 500,
          dscr: 0,
          debt_to_ebitda: 0,
        }),
      })
    );
  });
});
